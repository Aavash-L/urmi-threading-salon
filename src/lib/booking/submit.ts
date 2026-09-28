import { getBookableItem } from "@/lib/catalog";
import { requestSchema } from "@/lib/booking/schema";
import { BOOKING_RULES, checkRequestedSlot, durationOf, toMinutes, type SlotCheck } from "@/lib/booking/scheduling";
import { getStore, type StoredRequest } from "@/lib/booking/store";
import { acknowledgeClient, notifyStaff } from "@/lib/booking/delivery";

// Handles one appointment request end to end. Success is reported only when the
// request is stored AND at least one staff channel accepted the notification.

export const MESSAGES = {
  failure: "We couldn't send your request. Please try again or call (973) 653-9322.",
  unavailable: "That time is no longer available for online requests. Please choose another time or call (973) 653-9322.",
  slot: {
    invalid: "Choose a valid date.",
    past: "That time has already passed. Please choose a later time.",
    "too-far": `Online requests can be made up to ${BOOKING_RULES.maxDaysAhead} days ahead. Please call for later dates.`,
    closed: "The salon is closed on that day. Please choose another date.",
    "invalid-time": "Choose a preferred time from the list.",
    "outside-hours": "That time is outside salon hours for this service. Please choose another time.",
  } as Record<Exclude<SlotCheck, "ok" | "unavailable">, string>,
};

export type SubmitResult =
  | { status: 200; body: { ok: true; requestStatus: "pending" } }
  | { status: 400 | 409 | 422 | 500 | 502; body: { ok: false; error: string; fieldErrors?: Record<string, string> } };

/** Requests overlapping `mine`, ordered by creation — the first `capacity` win. */
function losesRace(mine: StoredRequest, active: StoredRequest[]): boolean {
  const start = toMinutes(mine.time)!;
  const end = start + durationOf(mine.service);
  const overlapping = active
    .filter((r) => {
      const s = toMinutes(r.time);
      if (s == null) return false;
      return s < end && start < s + durationOf(r.service);
    })
    .sort((a, b) => (a.created_at === b.created_at ? a.id.localeCompare(b.id) : a.created_at.localeCompare(b.created_at)));
  const rank = overlapping.findIndex((r) => r.id === mine.id);
  return rank >= BOOKING_RULES.capacity;
}

export async function submitRequest(raw: unknown, now: Date = new Date()): Promise<SubmitResult> {
  const parsed = requestSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { status: 400, body: { ok: false, error: "Please check the highlighted fields.", fieldErrors } };
  }
  const data = parsed.data;

  // Bots fill the hidden field; pretend success without storing or notifying anyone.
  if (data.company) return { status: 200, body: { ok: true, requestStatus: "pending" } };

  const item = getBookableItem(data.serviceId)!;
  const store = getStore();

  let active: StoredRequest[];
  try {
    active = await store.listActive(data.date);
  } catch (err) {
    console.error("[book] could not read existing requests", err);
    return { status: 500, body: { ok: false, error: MESSAGES.failure } };
  }

  const check = checkRequestedSlot(data.date, data.time, item.duration, active, now);
  if (check === "unavailable") return { status: 409, body: { ok: false, error: MESSAGES.unavailable } };
  if (check !== "ok") {
    const field = check === "past" || check === "outside-hours" || check === "invalid-time" ? "time" : "date";
    return { status: 422, body: { ok: false, error: MESSAGES.slot[check], fieldErrors: { [field]: MESSAGES.slot[check] } } };
  }

  let saved: StoredRequest;
  try {
    saved = await store.insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: item.name,
      date: data.date,
      time: data.time,
      notes: data.notes || null,
      status: "pending",
    });
  } catch (err) {
    console.error("[book] could not store request", err);
    return { status: 500, body: { ok: false, error: MESSAGES.failure } };
  }

  // Two visitors can pass the check above at the same moment. Re-read after
  // inserting; if this request is beyond capacity for its time, withdraw it.
  try {
    const after = await store.listActive(data.date);
    if (losesRace(saved, after)) {
      await store.setStatus(saved.id, "cancelled");
      return { status: 409, body: { ok: false, error: MESSAGES.unavailable } };
    }
  } catch (err) {
    console.error("[book] post-insert capacity check failed", err);
  }

  const results = await notifyStaff(saved);
  if (!results.some((r) => r.ok)) {
    console.error("[book] no staff channel delivered", results);
    // Withdraw so the visitor is not told "received" for a request nobody was told about.
    await store.setStatus(saved.id, "cancelled").catch(() => {});
    return { status: 502, body: { ok: false, error: MESSAGES.failure } };
  }
  const failed = results.filter((r) => !r.ok);
  if (failed.length) console.warn("[book] some staff channels failed", failed);

  await acknowledgeClient(saved);
  return { status: 200, body: { ok: true, requestStatus: "pending" } };
}
