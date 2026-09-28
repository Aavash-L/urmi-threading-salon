import { BUSINESS, WEEKLY_HOURS, type Weekday } from "@/lib/constants";
import { CATALOG } from "@/lib/catalog";

// Preferred-time request scheduling. Online requests are not reservations: the
// salon confirms each one. These rules only decide which preferred times the form
// offers and the server accepts.
//
// All dates/times are wall-clock values in the salon's timezone (America/New_York).
// Dates are "YYYY-MM-DD", times are "HH:MM" (24h). Nothing here depends on the
// server's or the visitor's local timezone.

export const BOOKING_RULES = {
  /** Minutes between offered start times. */
  slotStep: 15,
  /**
   * How many online requests may overlap at the same moment. The owner has not
   * confirmed staffing; the previous site allowed any overlap except identical
   * start times. 2 is a conservative placeholder — see docs/local-search-handoff.md.
   */
  capacity: 2,
  /** Earliest start offered today, in minutes from now. */
  leadMinutes: 30,
  /** How far ahead requests are accepted. */
  maxDaysAhead: 60,
  /** Duration assumed for stored requests whose service is no longer in the catalog. */
  fallbackDuration: 30,
} as const;

export interface ExistingRequest {
  /** "HH:MM" or legacy "h:mm AM/PM". */
  time: string;
  /** Catalog id, or a legacy service name. */
  service: string;
}

export interface Slot {
  time: string; // "HH:MM"
  label: string; // "10:15 AM"
  available: boolean;
}

const tzFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: BUSINESS.timezone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Salon-local calendar date and minutes-past-midnight for an instant. */
export function salonNow(instant: Date = new Date()): { date: string; minutes: number } {
  const parts = Object.fromEntries(tzFormatter.formatToParts(instant).map((p) => [p.type, p.value]));
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

export function isValidDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

/** Day of week for a calendar date (independent of any timezone). */
export function weekdayOf(date: string): Weekday {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() as Weekday;
}

export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export function toMinutes(time: string): number | null {
  const h24 = /^(\d{2}):(\d{2})$/.exec(time);
  if (h24) {
    const h = Number(h24[1]);
    const m = Number(h24[2]);
    return h < 24 && m < 60 ? h * 60 + m : null;
  }
  // Legacy rows stored "10:15 AM".
  const h12 = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim());
  if (h12) {
    let h = Number(h12[1]) % 12;
    if (h12[3].toUpperCase() === "PM") h += 12;
    return h * 60 + Number(h12[2]);
  }
  return null;
}

export function fromMinutes(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function labelFor(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export function hoursFor(date: string): { open: number; close: number } | null {
  const block = WEEKLY_HOURS.find((h) => h.days.includes(weekdayOf(date)));
  if (!block) return null;
  return { open: toMinutes(block.open)!, close: toMinutes(block.close)! };
}

export function durationOf(service: string): number {
  const item = CATALOG.find((s) => s.id === service || s.name === service);
  return item && item.duration > 0 ? item.duration : BOOKING_RULES.fallbackDuration;
}

/** Number of existing requests overlapping [start, start + duration). */
export function overlapCount(start: number, duration: number, existing: ExistingRequest[]): number {
  const end = start + duration;
  let n = 0;
  for (const r of existing) {
    const s = toMinutes(r.time);
    if (s == null) continue;
    const e = s + durationOf(r.service);
    if (s < end && start < e) n++;
  }
  return n;
}

export type DateStatus = "ok" | "invalid" | "past" | "too-far" | "closed";

export function dateStatus(date: string, now: Date = new Date()): DateStatus {
  if (!isValidDate(date)) return "invalid";
  const today = salonNow(now).date;
  if (date < today) return "past";
  if (date > addDays(today, BOOKING_RULES.maxDaysAhead)) return "too-far";
  if (!hoursFor(date)) return "closed";
  return "ok";
}

/**
 * Preferred start times for a service on a date. Past times (and times inside the
 * lead window today) are omitted entirely; times that would exceed online capacity
 * are returned with available=false.
 */
export function generateSlots(
  date: string,
  duration: number,
  existing: ExistingRequest[] = [],
  now: Date = new Date()
): Slot[] {
  if (dateStatus(date, now) !== "ok") return [];
  const hours = hoursFor(date)!;
  const current = salonNow(now);
  const earliest = date === current.date ? current.minutes + BOOKING_RULES.leadMinutes : -1;

  const slots: Slot[] = [];
  for (let start = hours.open; start + duration <= hours.close; start += BOOKING_RULES.slotStep) {
    if (start < earliest) continue;
    slots.push({
      time: fromMinutes(start),
      label: labelFor(start),
      available: overlapCount(start, duration, existing) < BOOKING_RULES.capacity,
    });
  }
  return slots;
}

export type SlotCheck = "ok" | "invalid-time" | "past" | "outside-hours" | "unavailable" | DateStatus;

/** Server-side revalidation of a submitted request. */
export function checkRequestedSlot(
  date: string,
  time: string,
  duration: number,
  existing: ExistingRequest[],
  now: Date = new Date()
): SlotCheck {
  const ds = dateStatus(date, now);
  if (ds !== "ok") return ds;
  const start = /^\d{2}:\d{2}$/.test(time) ? toMinutes(time) : null;
  if (start == null) return "invalid-time";
  const hours = hoursFor(date)!;
  if (start < hours.open || start + duration > hours.close || (start - hours.open) % BOOKING_RULES.slotStep !== 0) {
    return "outside-hours";
  }
  const current = salonNow(now);
  if (date === current.date && start < current.minutes + BOOKING_RULES.leadMinutes) return "past";
  if (overlapCount(start, duration, existing) >= BOOKING_RULES.capacity) return "unavailable";
  return "ok";
}
