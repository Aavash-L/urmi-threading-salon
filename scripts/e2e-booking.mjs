// End-to-end appointment-request checks in Chrome. Run against a server started
// with BOOKING_TEST_SINK=<file> so requests go to the test sink, never Supabase,
// email, Telegram or push:
//
//   BOOKING_TEST_SINK=/tmp/urmi-sink.json RESEND_API_KEY=unused next start -p 3218
//   node scripts/e2e-booking.mjs http://localhost:3218 /tmp/urmi-sink.json
import { chromium } from "playwright-core";
import fs from "node:fs";
import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:3218";
const sinkFile = process.argv[3];
if (!sinkFile) throw new Error("pass the BOOKING_TEST_SINK file path as the second argument");

const readSink = () => JSON.parse(fs.readFileSync(sinkFile, "utf8"));
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const results = [];
async function check(name, fn) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  try {
    await fn(page);
    results.push(`✓ ${name}`);
  } catch (err) {
    results.push(`✗ ${name}\n    ${err.message.split("\n")[0]}`);
  } finally {
    await context.close();
  }
}

// A date 3 days ahead that is always open.
const future = new Date(Date.now() + 3 * 86400000).toLocaleDateString("en-CA", { timeZone: "America/New_York" });

async function pickFirstTime(page) {
  await page.waitForFunction(() => document.querySelectorAll("#time option").length > 1, null, { timeout: 10000 });
  const value = await page.$eval("#time option:nth-child(2)", (o) => o.value);
  await page.selectOption("#time", value);
  return value;
}

await check("service page link preselects the exact service", async (page) => {
  await page.goto(`${base}/services/eyebrow-threading`);
  await page.click('main a[href="/book?service=eyebrow-threading"]');
  await page.waitForURL(/\/book\?service=eyebrow-threading/);
  await page.waitForFunction(() => document.querySelector("#serviceId").value === "eyebrow-threading");
});

await check("category pages list that category first without choosing a service", async (page) => {
  await page.goto(`${base}/book?category=facials`);
  await page.waitForFunction(() => document.querySelector("#serviceId optgroup")?.label === "Facials");
  assert.equal(await page.$eval("#serviceId", (s) => s.value), "");
});

await check("invalid service ids are ignored safely", async (page) => {
  await page.goto(`${base}/book?service=gift-card-50`);
  await page.waitForTimeout(500);
  assert.equal(await page.$eval("#serviceId", (s) => s.value), "");
});

await check("service choice survives navigating away and back", async (page) => {
  await page.goto(`${base}/book?service=brazilian-wax`);
  await page.waitForFunction(() => document.querySelector("#serviceId").value === "brazilian-wax");
  await page.goto(`${base}/pricing`);
  await page.goto(`${base}/book`);
  await page.waitForFunction(() => document.querySelector("#serviceId").value === "brazilian-wax");
});

await check("failed availability shows an error, not open times", async (page) => {
  await page.route("**/api/availability**", (r) => r.fulfill({ status: 503, body: "{}" }));
  await page.goto(`${base}/book?service=eyebrow-threading`);
  await page.fill("#date", future);
  await page.getByText("We couldn't check available times").waitFor();
  assert.equal(await page.$$eval("#time option", (o) => o.length), 1);
  assert.equal(await page.$eval("#time", (s) => s.disabled), true);
});

await check("client-side validation announces errors on the fields", async (page) => {
  await page.goto(`${base}/book`);
  await page.click('button[type="submit"]');
  await page.waitForSelector("#name-error");
  assert.equal(await page.getAttribute("#name", "aria-invalid"), "true");
  assert.match(await page.getAttribute("#name", "aria-describedby"), /name-error/);
  assert.equal(await page.evaluate(() => document.activeElement?.id), "name");
});

await check("a failed submission never shows success", async (page) => {
  await page.route("**/api/book", (r) => r.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ ok: false, error: "We couldn't send your request. Please try again or call (973) 653-9322." }) }));
  await page.goto(`${base}/book?service=eyebrow-threading`);
  await page.fill("#name", "E2E Failure");
  await page.fill("#phone", "2015550123");
  await page.fill("#date", future);
  await pickFirstTime(page);
  await page.click('button[type="submit"]');
  await page.getByRole("alert").filter({ hasText: "couldn't send your request" }).waitFor();
  assert.equal(await page.getByText("Appointment Request Received").count(), 0);
  // Entered values are kept for another try.
  assert.equal(await page.inputValue("#name"), "E2E Failure");
  assert.equal(await page.$eval("#serviceId", (s) => s.value), "eyebrow-threading");
});

await check("a successful request is stored as pending in the test sink and shows request status", async (page) => {
  const before = readSink().requests.length;
  await page.goto(`${base}/book?service=eyebrow-threading`);
  await page.fill("#name", "E2E Success");
  await page.fill("#phone", "2015550123");
  await page.fill("#date", future);
  const time = await pickFirstTime(page);
  await page.click('button[type="submit"]');
  await page.getByText("Appointment Request Received").waitFor();
  await page.getByText("not confirmed yet").waitFor();
  const sink = readSink();
  assert.equal(sink.requests.length, before + 1);
  assert.deepEqual(
    (({ name, date, time, status, service }) => ({ name, date, time, status, service }))(sink.requests.at(-1)),
    { name: "E2E Success", date: future, time, status: "pending", service: "Eyebrow Threading" }
  );
});

await browser.close();
console.log(results.join("\n"));
process.exit(results.some((r) => r.startsWith("✗")) ? 1 : 0);
