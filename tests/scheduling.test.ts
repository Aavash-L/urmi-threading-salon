import { describe, expect, it } from "vitest";
import {
  BOOKING_RULES,
  checkRequestedSlot,
  generateSlots,
  salonNow,
  weekdayOf,
  type ExistingRequest,
} from "@/lib/booking/scheduling";

// Fixed "now": Monday 2026-10-05 08:00 America/New_York (EDT, UTC-4).
const MONDAY_8AM = new Date("2026-10-05T12:00:00Z");
const WED = "2026-10-07";
const THU = "2026-10-08";
const SAT = "2026-10-10";
const SUN = "2026-10-11";

const times = (date: string, duration: number, existing: ExistingRequest[] = [], now = MONDAY_8AM) =>
  generateSlots(date, duration, existing, now).map((s) => s.time);

describe("calendar", () => {
  it("knows the weekday of fixture dates", () => {
    expect([WED, THU, SAT, SUN].map(weekdayOf)).toEqual([3, 4, 6, 0]);
  });
});

describe("salon hours", () => {
  it("Monday–Wednesday close at 18:30 — a 15-minute Wednesday service can end at 18:30", () => {
    const t = times(WED, 15);
    expect(t[0]).toBe("10:00");
    expect(t.at(-1)).toBe("18:15");
    expect(t).not.toContain("18:30");
    expect(checkRequestedSlot(WED, "18:15", 15, [], MONDAY_8AM)).toBe("ok");
    expect(checkRequestedSlot(WED, "18:30", 15, [], MONDAY_8AM)).toBe("outside-hours");
  });

  it("Thursday and Friday close at 19:00", () => {
    expect(times(THU, 15).at(-1)).toBe("18:45");
    expect(times("2026-10-09", 15).at(-1)).toBe("18:45");
  });

  it("Saturday closes at 18:00 and Sunday runs 11:00–17:00", () => {
    expect(times(SAT, 15)[0]).toBe("10:00");
    expect(times(SAT, 15).at(-1)).toBe("17:45");
    expect(times(SUN, 15)[0]).toBe("11:00");
    expect(times(SUN, 15).at(-1)).toBe("16:45");
  });

  it("service duration moves the last start time", () => {
    expect(times(WED, 30).at(-1)).toBe("18:00");
    expect(times(WED, 120).at(-1)).toBe("16:30");
    expect(checkRequestedSlot(WED, "16:45", 120, [], MONDAY_8AM)).toBe("outside-hours");
  });

  it("rejects times before opening and off the 15-minute grid", () => {
    expect(checkRequestedSlot(SUN, "10:45", 15, [], MONDAY_8AM)).toBe("outside-hours");
    expect(checkRequestedSlot(WED, "10:10", 15, [], MONDAY_8AM)).toBe("outside-hours");
  });
});

describe("past times", () => {
  // Wednesday 2026-10-07 14:07 in New York.
  const WED_2PM = new Date("2026-10-07T18:07:00Z");

  it("drops past times (plus the lead window) from today's list", () => {
    const t = times(WED, 15, [], WED_2PM);
    expect(t[0]).toBe("14:45"); // 14:07 + 30 min lead → first grid slot 14:45
    expect(t.every((x) => x >= "14:45")).toBe(true);
  });

  it("rejects past times and past dates on the server check", () => {
    expect(checkRequestedSlot(WED, "14:00", 15, [], WED_2PM)).toBe("past");
    expect(checkRequestedSlot("2026-10-06", "12:00", 15, [], WED_2PM)).toBe("past");
    expect(generateSlots("2026-10-06", 15, [], WED_2PM)).toEqual([]);
  });

  it(`rejects dates more than ${BOOKING_RULES.maxDaysAhead} days ahead`, () => {
    expect(checkRequestedSlot("2027-01-15", "12:00", 15, [], MONDAY_8AM)).toBe("too-far");
  });
});

describe("America/New_York handling", () => {
  it("uses the salon date around midnight, not UTC", () => {
    // 03:30 UTC on Oct 8 is still 23:30 on Oct 7 in New York.
    const lateWed = new Date("2026-10-08T03:30:00Z");
    expect(salonNow(lateWed)).toEqual({ date: "2026-10-07", minutes: 23 * 60 + 30 });
    expect(generateSlots(WED, 15, [], lateWed)).toEqual([]);
    expect(times(THU, 15, [], lateWed)[0]).toBe("10:00");
    expect(checkRequestedSlot(THU, "10:00", 15, [], lateWed)).toBe("ok");
  });

  it("handles the spring-forward transition (2026-03-08)", () => {
    expect(salonNow(new Date("2026-03-08T06:59:00Z"))).toEqual({ date: "2026-03-08", minutes: 1 * 60 + 59 }); // EST
    expect(salonNow(new Date("2026-03-08T07:30:00Z"))).toEqual({ date: "2026-03-08", minutes: 3 * 60 + 30 }); // EDT
    // Sunday hours are unchanged on the transition day.
    expect(times("2026-03-08", 15, [], new Date("2026-03-01T15:00:00Z"))).toHaveLength(24);
  });

  it("handles the fall-back transition (2026-11-01)", () => {
    expect(salonNow(new Date("2026-11-01T05:30:00Z"))).toEqual({ date: "2026-11-01", minutes: 90 }); // 01:30 EDT
    expect(salonNow(new Date("2026-11-01T06:30:00Z"))).toEqual({ date: "2026-11-01", minutes: 90 }); // 01:30 EST
    // 16:20 UTC is 11:20 EST (it would be 12:20 if EDT were wrongly assumed).
    const t = times("2026-11-01", 15, [], new Date("2026-11-01T16:20:00Z"));
    expect(t[0]).toBe("12:00");
  });
});

describe("capacity and overlap", () => {
  it("marks a time unavailable once overlapping requests reach capacity", () => {
    const existing: ExistingRequest[] = [
      { time: "10:00", service: "full-body-wax" }, // 10:00–12:00
      { time: "10:30 AM", service: "Brazilian Wax" }, // legacy row format, 10:30–11:00
    ];
    const slots = generateSlots(WED, 15, existing, MONDAY_8AM);
    const at = (t: string) => slots.find((s) => s.time === t)!;
    expect(at("10:00").available).toBe(true); // only the full body wax overlaps
    expect(at("10:30").available).toBe(false); // both overlap
    expect(at("10:45").available).toBe(false);
    expect(at("11:00").available).toBe(true);
    expect(checkRequestedSlot(WED, "10:30", 15, existing, MONDAY_8AM)).toBe("unavailable");
  });

  it("uses each service's duration when checking overlap", () => {
    const existing: ExistingRequest[] = [
      { time: "13:00", service: "eyebrow-threading" }, // 13:00–13:15
      { time: "13:00", service: "full-face-threading" }, // 13:00–13:30
    ];
    expect(checkRequestedSlot(WED, "13:15", 15, existing, MONDAY_8AM)).toBe("ok");
    expect(checkRequestedSlot(WED, "12:45", 30, existing, MONDAY_8AM)).toBe("unavailable");
  });
});
