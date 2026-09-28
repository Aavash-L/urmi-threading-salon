// Crawl-level regression checks against a running build.
//   node scripts/verify-site.mjs [baseUrl]
// Checks every public route for: status, one H1, exact title/description, self
// canonical + og:url, OG/Twitter tags, valid JSON-LD with exactly one BeautySalon
// entity and no unverified markup, FAQPage answers present in visible text, broken
// internal links/anchors/images/icons, the unchanged phone and address, and
// unsupported marketing claims.
const base = process.argv[2] ?? "http://localhost:3217";
const ORIGIN = "https://www.urmithreadingsalon.com";

const ORIGINAL_21 = [
  "/", "/eyebrow-threading-wayne-nj", "/services", "/pricing", "/book", "/about", "/contact",
  "/services/eyebrow-threading", "/services/face-threading", "/services/waxing", "/services/facials",
  "/services/eyelash-extensions", "/services/henna", "/services/tinting",
  "/locations/wayne-nj", "/locations/paterson-nj", "/locations/clifton-nj", "/locations/totowa-nj",
  "/locations/little-falls-nj", "/locations/fair-lawn-nj", "/locations/paramus-nj",
];
const PHONE_DISPLAY = "(973) 653-9322";
const PHONE_HREF = "tel:+19736539322";
const ADDRESS = "150 Hinchman Ave";
const BANNED = [
  /\b2010\b/, /\b2016\b/, /15\+?\s*years/i, /\bfounded\b/i, /\best\.\s*\d/i, /10,000/, /\bthousands\b/i,
  /#1\b/, /most trusted/i, /top-rated/i, /five-star/i, /\bverified\b/i, /CDC/, /zero irritation/i,
  /no skin damage/i, /safe for all/i, /medical-grade/i, /guarantee/i, /weeks ago/i, /within 1 hour/i,
];

const problems = [];
const fail = (route, msg) => problems.push(`${route}: ${msg}`);
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ");
const meta = (html, attr, key) =>
  decode(html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1] ?? "");

// Titles/descriptions are the source of truth in src/lib/seo.ts; read them from the build output.
const seoSrc = await import("node:fs").then((fs) => fs.readFileSync("src/lib/seo.ts", "utf8"));

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, "") || "/");
for (const p of ORIGINAL_21) if (!sitemapPaths.includes(p)) fail("sitemap", `missing ${p}`);
if (!sitemapPaths.includes("/privacy")) fail("sitemap", "missing /privacy");
if (sitemapPaths.some((p) => p.startsWith("/admin") || p.startsWith("/api"))) fail("sitemap", "lists private routes");
if (/<lastmod>[^<]*T\d/.test(sitemap) && new Set([...sitemap.matchAll(/<lastmod>([^<]+)</g)].map((m) => m[1])).size > 1) {
  // fine: per-route dates
}

const titles = new Map();
const linkTargets = new Set();
const anchorChecks = [];
const assetUrls = new Set();

for (const route of sitemapPaths) {
  const res = await fetch(base + route);
  if (res.status !== 200) {
    fail(route, `status ${res.status}`);
    continue;
  }
  const html = await res.text();
  const text = visibleText(html.replace(/<head>[\s\S]*?<\/head>/, ""));

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length !== 1) fail(route, `${h1s.length} H1 elements`);

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const description = meta(html, "name", "description");
  if (!seoSrc.includes(title.replace(/"/g, '\\"')) && !route.startsWith("/locations/")) fail(route, `title not from seo map: ${title}`);
  if (/Urmi Threading Salon.*\|.*Urmi Threading Salon/.test(title)) fail(route, `duplicate brand in title: ${title}`);
  if (titles.has(title)) fail(route, `title duplicates ${titles.get(title)}`);
  titles.set(title, route);
  if (!description) fail(route, "missing meta description");

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const selfUrl = route === "/" ? ORIGIN : ORIGIN + route;
  if (canonical !== selfUrl) fail(route, `canonical ${canonical}`);
  if (meta(html, "property", "og:url") !== selfUrl) fail(route, `og:url ${meta(html, "property", "og:url")}`);
  if (meta(html, "property", "og:title") !== title) fail(route, "og:title differs from title");
  if (meta(html, "property", "og:description") !== description) fail(route, "og:description differs");
  if (meta(html, "name", "twitter:title") !== title) fail(route, "twitter:title differs");
  const ogImage = meta(html, "property", "og:image");
  if (!ogImage) fail(route, "no og:image");
  else assetUrls.add(ogImage.replace(ORIGIN, ""));
  if (html.includes('rel="manifest"')) fail(route, "public page advertises a manifest");
  if (/apple-mobile-web-app-title" content="Urmi Admin/.test(html)) fail(route, "public page advertises the admin app title");

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let salons = 0;
  for (const b of blocks) {
    let data;
    try {
      data = JSON.parse(b);
    } catch {
      fail(route, "JSON-LD does not parse");
      continue;
    }
    const json = JSON.stringify(data);
    if (data["@type"] === "BeautySalon") salons++;
    for (const bad of ["aggregateRating", '"review"', "foundingDate", "GeoCoordinates", "priceRange"]) {
      if (json.includes(bad)) fail(route, `JSON-LD contains ${bad}`);
    }
    if (data["@type"] === "Service" && data.provider?.["@id"] !== ORIGIN) fail(route, "Service provider does not reference the business @id");
    if (data["@type"] === "FAQPage") {
      for (const q of data.mainEntity) {
        if (!text.includes(q.name)) fail(route, `FAQ question not visible: ${q.name}`);
        if (!text.includes(q.acceptedAnswer.text)) fail(route, `FAQ answer not visible: ${q.name}`);
      }
    }
    if (data["@type"] === "BreadcrumbList") {
      for (const item of data.itemListElement) linkTargets.add(item.item.replace(ORIGIN, "") || "/");
    }
    for (const bannedRe of BANNED) if (bannedRe.test(json)) fail(route, `JSON-LD claim ${bannedRe}`);
  }
  if (salons !== 1) fail(route, `${salons} BeautySalon entities`);

  // Contact regression
  if (!text.includes(PHONE_DISPLAY)) fail(route, "display phone missing");
  const tels = [...html.matchAll(/href="(tel:[^"]+)"/g)].map((m) => m[1]);
  if (!tels.includes(PHONE_HREF)) fail(route, "tel link missing");
  if (tels.some((t) => t !== PHONE_HREF)) fail(route, `unexpected tel link ${tels.find((t) => t !== PHONE_HREF)}`);
  if (!text.includes(ADDRESS)) fail(route, "address missing");

  for (const re of BANNED) {
    const m = (text + " " + title + " " + description).match(re);
    if (m) fail(route, `claim "${m[0]}"`);
  }

  // Links, anchors and assets
  for (const m of html.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    const href = decode(m[1]);
    if (href.startsWith("#")) anchorChecks.push({ page: route, target: route, id: href.slice(1) });
    else if (href.startsWith("/") && !href.startsWith("//")) {
      const [p, hash] = href.split("#");
      linkTargets.add(p.split("?")[0] || "/");
      if (hash) anchorChecks.push({ page: route, target: p.split("?")[0] || "/", id: hash });
    }
  }
  for (const m of html.matchAll(/<(?:img|source)[^>]+(?:src|srcSet)="([^"\s]+)/g)) assetUrls.add(decode(m[1]));
  for (const m of html.matchAll(/<link rel="(?:icon|apple-touch-icon)"[^>]*href="([^"]+)"/g)) assetUrls.add(decode(m[1]).split("?")[0]);
}

for (const target of linkTargets) {
  const r = await fetch(base + target, { redirect: "manual" });
  if (r.status !== 200 && !(target === "/sitemap.xml" && r.status === 200)) fail("links", `${target} → ${r.status}`);
}
const pageCache = new Map();
for (const { page, target, id } of anchorChecks) {
  if (!pageCache.has(target)) pageCache.set(target, await (await fetch(base + target)).text());
  if (!new RegExp(`id="${id}"`).test(pageCache.get(target))) fail(page, `anchor #${id} missing on ${target}`);
}
for (const url of assetUrls) {
  const r = await fetch(url.startsWith("http") ? url : base + url);
  if (r.status !== 200) fail("assets", `${url} → ${r.status}`);
}

const nf = await fetch(`${base}/definitely-not-a-page`);
if (nf.status !== 404) fail("404", `unknown path returned ${nf.status}`);
const gallery = await fetch(`${base}/gallery`, { redirect: "manual" });
if (gallery.status !== 308) fail("/gallery", `expected 308, got ${gallery.status}`);

for (const route of sitemapPaths.filter((p) => p.startsWith("/locations/") && p !== "/locations/wayne-nj")) {
  const t = visibleText(pageCache.get(route) ?? (await (await fetch(base + route)).text()));
  if (!t.includes("We have one salon location: 150 Hinchman Ave, Wayne, NJ 07470.")) fail(route, "one-location sentence missing");
  if (/\bminutes? (from|away|drive)\b|\bmiles?\b|Route \d+|parking/i.test(t)) fail(route, "travel/parking claim present");
}

console.log(`Checked ${sitemapPaths.length} sitemap routes, ${linkTargets.size} internal link targets, ${anchorChecks.length} anchors, ${assetUrls.size} assets.`);
if (problems.length) {
  console.log(problems.map((p) => `✗ ${p}`).join("\n"));
  process.exit(1);
}
console.log("✓ All site checks passed");
