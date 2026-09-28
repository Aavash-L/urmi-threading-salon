// Browser checks against a running build (default http://localhost:3217) using the
// locally installed Google Chrome through playwright-core. Nothing is submitted.
//
//   node scripts/check-ui.mjs [baseUrl] [--axe] [--shots=dir]
//
// For every public route and width it verifies:
//  - no horizontal page scroll (documentElement.scrollWidth <= innerWidth)
//  - a visible tel:+19736539322 control inside the first viewport, without opening the menu
//  - a visible appointment-request control (except on /book, where the form itself is shown)
// With --axe it also runs axe-core and reports serious/critical violations.
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("http")) ?? "http://localhost:3217";
const runAxe = args.includes("--axe");
const shotsDir = args.find((a) => a.startsWith("--shots="))?.slice(8);
const widths = (args.find((a) => a.startsWith("--widths="))?.slice(9) ?? "320,360,390,768,1024,1440").split(",").map(Number);
const onlyRoutes = args.find((a) => a.startsWith("--routes="))?.slice(9)?.split(",");

const ROUTES = onlyRoutes ?? [
  "/", "/eyebrow-threading-wayne-nj", "/services", "/pricing", "/book", "/about", "/contact",
  "/services/eyebrow-threading", "/services/face-threading", "/services/waxing", "/services/facials",
  "/services/eyelash-extensions", "/services/henna", "/services/tinting",
  "/locations/wayne-nj", "/locations/paterson-nj", "/locations/clifton-nj", "/locations/totowa-nj",
  "/locations/little-falls-nj", "/locations/fair-lawn-nj", "/locations/paramus-nj", "/privacy",
];

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const axeSource = runAxe ? fs.readFileSync(path.resolve("node_modules/axe-core/axe.min.js"), "utf8") : "";
if (shotsDir) fs.mkdirSync(shotsDir, { recursive: true });

let failures = 0;
const axeSummary = new Map();

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 800 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const route of ROUTES) {
    const res = await page.goto(base + route, { waitUntil: "networkidle" });
    const problems = [];
    if (res?.status() !== 200) problems.push(`status ${res?.status()}`);

    const r = await page.evaluate(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const inView = (el) => {
        const b = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return b.width > 0 && b.height > 0 && b.top >= 0 && b.bottom <= vh && cs.visibility !== "hidden" && cs.display !== "none";
      };
      const offenders = [];
      if (document.documentElement.scrollWidth > vw) {
        for (const el of document.querySelectorAll("body *")) {
          const b = el.getBoundingClientRect();
          if (b.right > vw + 1 && b.width > 0) {
            offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(b.right)}`);
            if (offenders.length > 4) break;
          }
        }
      }
      const tel = [...document.querySelectorAll('a[href="tel:+19736539322"]')].filter(inView);
      const request = [...document.querySelectorAll('a[href^="/book"], a[href="#request-form"]')].filter(inView);
      // On /book the request form itself is the request control.
      const form = document.getElementById("request-form");
      if (form && form.getBoundingClientRect().top < vh) request.push(form);
      const readableNumber = tel.some((a) => a.textContent.includes("(973) 653-9322"));
      const smallTargets = [...document.querySelectorAll("a[href], button")]
        .filter(inView)
        .filter((el) => {
          const b = el.getBoundingClientRect();
          const inline = getComputedStyle(el).display === "inline" && el.closest("p, li, address, td");
          return !inline && (b.height < 24 || b.width < 24);
        })
        .map((el) => `${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
      return {
        scrollWidth: document.documentElement.scrollWidth,
        vw,
        offenders,
        telVisible: tel.length,
        readableNumber,
        requestVisible: request.length,
        smallTargets: smallTargets.slice(0, 5),
      };
    });

    if (r.scrollWidth > r.vw) problems.push(`overflow scrollWidth=${r.scrollWidth} (${r.offenders.join("; ")})`);
    if (!r.telVisible) problems.push("no visible call control in first viewport");
    else if (!r.readableNumber) problems.push("call control visible but number not readable");
    if (!r.requestVisible) problems.push("no visible request control in first viewport");
    if (r.smallTargets.length) problems.push(`targets <24px: ${r.smallTargets.join(", ")}`);

    if (runAxe && (width === 390 || width === 1440)) {
      await page.addScriptTag({ content: axeSource });
      const violations = await page.evaluate(async () => {
        const out = await axe.run(document, { resultTypes: ["violations"] });
        return out.violations
          .filter((v) => v.impact === "serious" || v.impact === "critical")
          .map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")) }));
      });
      for (const v of violations) {
        problems.push(`axe ${v.impact} ${v.id}: ${v.nodes.join(" | ")}`);
        axeSummary.set(v.id, (axeSummary.get(v.id) ?? 0) + 1);
      }
    }

    if (shotsDir) {
      await page.screenshot({ path: `${shotsDir}/${width}${route.replace(/\//g, "_") || "_home"}.png`, fullPage: false });
    }

    if (problems.length) {
      failures++;
      console.log(`✗ ${width}px ${route}\n    ${problems.join("\n    ")}`);
    }
  }
  await context.close();
}

await browser.close();
if (runAxe) console.log("axe serious/critical by rule:", Object.fromEntries(axeSummary));
console.log(failures ? `\n${failures} route/width combinations with problems` : "\nAll route/width checks passed");
process.exit(failures ? 1 : 0);
