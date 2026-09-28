import { beforeEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { submitRequest } from "@/lib/booking/submit";
import { testSink } from "@/lib/booking/store";
import { addDays, salonNow } from "@/lib/booking/scheduling";
import { buildEvent } from "@/lib/analytics";
import { GET as availabilityGET } from "@/app/api/availability/route";

// Monday 2026-10-05 08:00 New York.
const NOW = new Date("2026-10-05T12:00:00Z");
const WED = "2026-10-07";

const valid = {
  name: "Test Client",
  phone: "(201) 555-0123",
  email: "",
  serviceId: "eyebrow-threading",
  date: WED,
  time: "11:00",
  notes: "",
};

beforeEach(() => testSink.reset());

describe("appointment request submission", () => {
  it("stores a valid request as pending and notifies staff through the test sink", async () => {
    const res = await submitRequest(valid, NOW);
    expect(res).toEqual({ status: 200, body: { ok: true, requestStatus: "pending" } });
    expect(testSink.state.requests).toHaveLength(1);
    expect(testSink.state.requests[0]).toMatchObject({
      service: "Eyebrow Threading",
      date: WED,
      time: "11:00",
      status: "pending",
      email: "",
    });
    const staff = testSink.state.messages.filter((m) => m.channel === "staff");
    expect(staff).toHaveLength(1);
    expect(staff[0].body).toContain("not yet confirmed");
    // No email given → no client message.
    expect(testSink.state.messages.some((m) => m.channel === "client")).toBe(false);
  });

  it("sends the client an acknowledgement that does not claim confirmation", async () => {
    await submitRequest({ ...valid, email: "client@example.com" }, NOW);
    const client = testSink.state.messages.find((m) => m.channel === "client")!;
    expect(client.subject).toBe("We received your appointment request");
    expect(client.body).toContain("not confirmed yet");
    expect(client.body).not.toMatch(/is confirmed/i);
  });

  it("treats email as optional but validates it when given", async () => {
    const { email: _omit, ...noEmail } = valid;
    expect((await submitRequest(noEmail, NOW)).status).toBe(200);
    const bad = await submitRequest({ ...valid, time: "11:15", email: "not-an-email" }, NOW);
    expect(bad.status).toBe(400);
    expect(bad.body.ok ? null : bad.body.fieldErrors?.email).toMatch(/valid email/);
  });

  it("rejects invalid, non-bookable and ambiguous service ids", async () => {
    for (const serviceId of ["nope", "gift-card-50", "Eyelash Exchange", ""]) {
      const res = await submitRequest({ ...valid, serviceId }, NOW);
      expect(res.status).toBe(400);
      expect(res.body.ok ? null : res.body.fieldErrors?.serviceId).toBeTruthy();
    }
    expect(testSink.state.requests).toHaveLength(0);
  });

  it("rejects past and out-of-hours times on the server", async () => {
    const wed2pm = new Date("2026-10-07T18:07:00Z");
    const past = await submitRequest({ ...valid, time: "13:00" }, wed2pm);
    expect(past.status).toBe(422);
    expect(past.body.ok ? null : past.body.fieldErrors?.time).toMatch(/passed/);

    const late = await submitRequest({ ...valid, time: "18:30" }, NOW); // Wednesday closes 18:30
    expect(late.status).toBe(422);
    const lastOk = await submitRequest({ ...valid, time: "18:15" }, NOW);
    expect(lastOk.status).toBe(200);
    expect(testSink.state.requests).toHaveLength(1);
  });

  it("does not report success when the request cannot be stored", async () => {
    testSink.state.failures.store = true;
    const res = await submitRequest(valid, NOW);
    expect(res.status).toBe(500);
    expect(res.body.ok).toBe(false);
    expect(testSink.state.messages).toHaveLength(0);
  });

  it("does not report success when the insert itself fails", async () => {
    testSink.state.failures.insert = true;
    const res = await submitRequest(valid, NOW);
    expect(res.status).toBe(500);
    expect(res.body.ok).toBe(false);
    expect(testSink.state.requests).toHaveLength(0);
    expect(testSink.state.messages).toHaveLength(0);
  });

  it("does not report success when no staff channel receives the request", async () => {
    testSink.state.failures.staff = true;
    const res = await submitRequest({ ...valid, email: "client@example.com" }, NOW);
    expect(res.status).toBe(502);
    expect(res.body.ok).toBe(false);
    // The stored row is withdrawn and the client is not told it was received.
    expect(testSink.state.requests[0].status).toBe("cancelled");
    expect(testSink.state.messages.some((m) => m.channel === "client")).toBe(false);
  });

  it("lets only `capacity` of several simultaneous requests for one time succeed", async () => {
    const results = await Promise.all(
      ["A", "B", "C"].map((n) => submitRequest({ ...valid, name: `Client ${n}`, time: "15:00" }, NOW))
    );
    const statuses = results.map((r) => r.status).sort();
    expect(statuses).toEqual([200, 200, 409]);
    const active = testSink.state.requests.filter((r) => r.status !== "cancelled");
    expect(active).toHaveLength(2);
  });

  it("rejects a request that overlaps full capacity", async () => {
    await submitRequest({ ...valid, serviceId: "full-body-wax", time: "10:00" }, NOW);
    await submitRequest({ ...valid, serviceId: "brazilian-wax", time: "10:30" }, NOW);
    const res = await submitRequest({ ...valid, time: "10:45" }, NOW);
    expect(res.status).toBe(409);
  });

  it("escapes client-supplied text in staff notifications", async () => {
    await submitRequest({ ...valid, name: "<img src=x onerror=alert(1)>", notes: "<b>hi</b>" }, NOW);
    const body = testSink.state.messages[0].body;
    expect(body).not.toContain("<img");
    expect(body).toContain("&lt;img");
    expect(body).toContain("&lt;b&gt;hi");
  });

  it("silently drops honeypot submissions", async () => {
    const res = await submitRequest({ ...valid, company: "Spam Inc" }, NOW);
    expect(res.status).toBe(200);
    expect(testSink.state.requests).toHaveLength(0);
    expect(testSink.state.messages).toHaveLength(0);
  });
});

describe("availability API", () => {
  const futureDate = addDays(salonNow().date, 3);
  const call = (qs: string) => availabilityGET(new NextRequest(`http://localhost/api/availability?${qs}`));

  it("returns preferred times for a valid service", async () => {
    const res = await call(`date=${futureDate}&service=eyebrow-threading`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("ok");
    expect(body.slots.length).toBeGreaterThan(0);
  });

  it("rejects unknown service ids", async () => {
    expect((await call(`date=${futureDate}&service=nope`)).status).toBe(400);
  });

  it("reports failure explicitly instead of returning an empty (all-free) answer", async () => {
    testSink.state.failures.store = true;
    const res = await call(`date=${futureDate}&service=eyebrow-threading`);
    expect(res.status).toBe(503);
    expect(await res.json()).not.toHaveProperty("slots");
  });

  it("returns no slots for past dates", async () => {
    const body = await (await call(`date=2020-01-01&service=eyebrow-threading`)).json();
    expect(body).toMatchObject({ status: "past", slots: [] });
  });
});

describe("analytics payloads", () => {
  it("keeps only non-personal dimensions", () => {
    const payload = buildEvent(
      "booking_request_success",
      { placement: "book_page", service_id: "eyebrow-threading", name: "Jane", phone: "555", email: "a@b.c" } as never,
      "/book"
    );
    expect(payload).toEqual({
      event: "booking_request_success",
      page_path: "/book",
      placement: "book_page",
      service_id: "eyebrow-threading",
    });
  });
});
