// Keyboard and sticky-bar checks in Chrome against a running build.
//   node scripts/check-a11y-flows.mjs [baseUrl]
import { chromium } from "playwright-core";
import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:3217";
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const results = [];
async function check(name, viewport, fn) {
  const ctx = await browser.newContext({ viewport, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  try {
    await fn(page);
    results.push(`✓ ${name}`);
  } catch (e) {
    results.push(`✗ ${name}\n    ${e.message.split("\n")[0]}`);
  }
  await ctx.close();
}
const active = (page) => page.evaluate(() => {
  const el = document.activeElement;
  return { tag: el?.tagName, text: el?.textContent?.trim().slice(0, 40), label: el?.getAttribute("aria-label"), id: el?.id };
});

await check("skip link is the first tab stop and moves focus to main", { width: 1440, height: 900 }, async (page) => {
  await page.goto(base + "/");
  await page.keyboard.press("Tab");
  assert.match((await active(page)).text, /Skip to main content/);
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  assert.notEqual(outline, "none");
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => location.hash), "#main-content");
});

await check("desktop Services menu opens with Enter and closes with Escape", { width: 1440, height: 900 }, async (page) => {
  await page.goto(base + "/");
  const btn = page.locator('button[aria-controls="services-menu"]');
  await btn.focus();
  await page.keyboard.press("Enter");
  assert.equal(await btn.getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Tab");
  assert.equal((await active(page)).text, "All Services");
  await page.keyboard.press("Escape");
  assert.equal(await btn.getAttribute("aria-expanded"), "false");
  assert.equal(await page.locator("#services-menu").isHidden(), true);
});

await check("mobile menu: 44px button, focus moves in, Escape closes and returns focus", { width: 390, height: 844 }, async (page) => {
  await page.goto(base + "/");
  const btn = page.getByRole("button", { name: "Open menu" });
  const box = await btn.boundingBox();
  assert.ok(box.width >= 44 && box.height >= 44, `menu button ${box.width}x${box.height}`);
  await btn.click();
  assert.equal((await active(page)).text, "Home");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(100);
  const a = await active(page);
  assert.equal(a.label, "Open menu");
  assert.equal(await page.locator("#mobile-menu").count(), 0);
});

for (const width of [360, 768]) {
  await check(`sticky bar never covers the submit button or footer (${width}px)`, { width, height: 740 }, async (page) => {
    await page.goto(base + "/book");
    const submit = page.locator('button[type="submit"]');
    await submit.focus(); // browsers scroll focused elements into view, honoring scroll-padding
    const [s, bar] = await Promise.all([submit.boundingBox(), page.locator("div.fixed.bottom-0").boundingBox()]);
    assert.ok(s.y + s.height <= bar.y, `submit bottom ${s.y + s.height} vs bar top ${bar.y}`);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const lastFooterLine = await page.locator("footer p").last().boundingBox();
    const bar2 = await page.locator("div.fixed.bottom-0").boundingBox();
    assert.ok(lastFooterLine.y + lastFooterLine.height <= bar2.y, "footer text hidden behind sticky bar");
  });
}

await check("validation errors are announced on the fields (keyboard submit)", { width: 390, height: 844 }, async (page) => {
  await page.goto(base + "/book");
  await page.locator("#name").focus();
  await page.keyboard.press("Enter");
  await page.waitForSelector("#name-error");
  assert.equal((await active(page)).id, "name");
  assert.equal(await page.getAttribute("#phone", "aria-invalid"), "true");
});

await check("hero content is visible without waiting for animation", { width: 390, height: 844 }, async (page) => {
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  const opacity = await page.locator("h1").evaluate((el) => getComputedStyle(el).opacity);
  assert.equal(opacity, "1");
});

await browser.close();
console.log(results.join("\n"));
process.exit(results.some((r) => r.startsWith("✗")) ? 1 : 0);
