import fs from "node:fs";
import { getSupabase } from "@/lib/supabase";

// Persistence for appointment requests. Production uses the Supabase `bookings`
// table. When BOOKING_TEST_SINK is set (tests / local end-to-end runs) requests go
// to an in-memory list mirrored to that JSON file instead — never to Supabase.

export type RequestStatus = "pending" | "confirmed" | "cancelled";

export interface NewRequest {
  name: string;
  phone: string;
  /** "" when the client chose not to give an email (column kept non-null). */
  email: string;
  /** Display name of the service (what the admin dashboard shows). */
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  notes: string | null;
  status: RequestStatus;
}

export interface StoredRequest extends NewRequest {
  id: string;
  created_at: string;
}

export interface RequestStore {
  /** Non-cancelled requests on a date. */
  listActive(date: string): Promise<StoredRequest[]>;
  insert(row: NewRequest): Promise<StoredRequest>;
  setStatus(id: string, status: RequestStatus): Promise<void>;
}

export function testSinkPath(): string | null {
  const p = process.env.BOOKING_TEST_SINK;
  if (!p) return null;
  if (process.env.VERCEL_ENV === "production") {
    throw new Error("BOOKING_TEST_SINK must not be set in production");
  }
  return p;
}

// ---- Supabase ----------------------------------------------------------------

const supabaseStore: RequestStore = {
  async listActive(date) {
    const { data, error } = await getSupabase()
      .from("bookings")
      .select("*")
      .eq("date", date)
      .neq("status", "cancelled");
    if (error) throw new Error(`listActive failed: ${error.message}`);
    return (data ?? []) as StoredRequest[];
  },
  async insert(row) {
    const { data, error } = await getSupabase().from("bookings").insert(row).select("*").single();
    if (error || !data) throw new Error(`insert failed: ${error?.message ?? "no row returned"}`);
    return data as StoredRequest;
  },
  async setStatus(id, status) {
    const { error } = await getSupabase().from("bookings").update({ status }).eq("id", id);
    if (error) throw new Error(`setStatus failed: ${error.message}`);
  },
};

// ---- Test sink -----------------------------------------------------------------

interface SinkState {
  requests: StoredRequest[];
  messages: { channel: string; to: string; subject: string; body: string }[];
  failures: { store?: boolean; insert?: boolean; staff?: boolean };
}

const memory: SinkState = { requests: [], messages: [], failures: {} };
let seq = 0;

function persistSink() {
  const p = testSinkPath();
  if (p) fs.writeFileSync(p, JSON.stringify(memory, null, 2));
}

export const testSink = {
  state: memory,
  reset() {
    memory.requests = [];
    memory.messages = [];
    memory.failures = {};
    seq = 0;
    persistSink();
  },
  persist: persistSink,
};

const memoryStore: RequestStore = {
  async listActive(date) {
    if (memory.failures.store) throw new Error("simulated store failure");
    return memory.requests.filter((r) => r.date === date && r.status !== "cancelled");
  },
  async insert(row) {
    if (memory.failures.store || memory.failures.insert) throw new Error("simulated store failure");
    seq += 1;
    const stored: StoredRequest = {
      ...row,
      id: `test-${seq}`,
      created_at: new Date(Date.UTC(2000, 0, 1, 0, 0, seq)).toISOString(),
    };
    memory.requests.push(stored);
    persistSink();
    return stored;
  },
  async setStatus(id, status) {
    const r = memory.requests.find((x) => x.id === id);
    if (r) r.status = status;
    persistSink();
  },
};

export function getStore(): RequestStore {
  return testSinkPath() ? memoryStore : supabaseStore;
}
