import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string | null;
  status: BookingStatus;
  created_at: string;
}
