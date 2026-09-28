# Urmi Threading Salon — Audit Implementation Record

Branch: `audit-repair` (local). Not deployed. Pushing `main` auto-deploys to Vercel
production, so this work is intentionally kept off `main`.

## Phase 0 — Repository discovery

### Stack (verified from the repo)

| Item | Finding |
|---|---|
| Framework | Next.js 16.2.6 (Turbopack build), React 19.2.4, TypeScript 5 (strict) |
| Routing | App Router under `src/app` (no `pages/`). Each service and location has its own static `page.tsx`; there are **no** `[slug]` dynamic routes. Shared rendering lives in `src/components/templates/*` and data in `src/lib/*`. |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`), tokens in `src/app/globals.css` |
| Animation | `framer-motion` 12 |
| Forms | `react-hook-form` + `zod` 4 + `@hookform/resolvers` |
| Persistence | Supabase (`bookings`, `push_subscriptions` tables) via `src/lib/supabase.ts` using the **anon** key |
| Notifications | Resend email (salon + client), Telegram bot message, Web Push (VAPID) to admin devices |
| Hosting | Vercel (GitHub deployments on `main` → Production) |
| Middleware | `src/proxy.ts` gates `/admin/*` with an `admin_auth` cookie compared to `ADMIN_PASSWORD` |
| Analytics | **None present.** No GA/GTM/Plausible/Vercel Analytics. No consent banner. |
| Tests | **None present.** No test runner or test script. |
| Lint | `eslint` (next core-web-vitals + typescript). Baseline: 5 errors, 7 warnings (all pre-existing). |
| Build | `next build` passes when `RESEND_API_KEY` is set (module-level `new Resend()` throws without it). |
| Project instructions | No AGENTS.md / CLAUDE.md / env documentation. README is empty. |

Environment variables referenced in code: `RESEND_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`,
`NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `ADMIN_PASSWORD`.

### Layout boundaries

- `src/app/layout.tsx` is the single root layout for public **and** admin pages. It
  advertises `/manifest.json` (the *admin* PWA manifest) and `appleWebApp.title = "Urmi Admin"`
  on every public page.
- `src/components/layout/SiteChrome.tsx` hides promo banner / navbar / footer / sticky bar
  when `pathname.startsWith("/admin")`.
- `src/app/admin/layout.tsx` is a pass-through.

### Booking flow (as found)

1. `src/components/sections/Booking.tsx` (client). Service options come from
   `bookingServices` in `src/lib/services.ts`. Time slots are generated client-side with a
   hardcoded 18:00 Mon–Wed/Sat close (published hours say 18:30 Mon–Wed), browser-local time,
   no past-time filtering.
2. `GET /api/availability?date=` returns `time` strings of non-cancelled bookings on that date.
   Failures are swallowed; the form then shows every slot as available.
3. `POST /api/book` — no server validation, no hours/past/overlap validation (only exact
   `date+time` string match), inserts with `status: "confirmed"`, ignores the insert error,
   then sends Telegram, web push, a salon email and a client email **titled "Your appointment
   is confirmed!"**. User input is interpolated into email HTML unescaped. A thrown Resend
   error returns 500 after the record was already stored.
4. `/admin` lists bookings and can only cancel (cancel emails the client).

### Data sources

| Data | Source |
|---|---|
| Phone, address, hours, social, rating/review count | `BUSINESS` in `src/lib/constants.ts` |
| Booking services (name/duration/price/category) | `bookingServices` in `src/lib/services.ts` |
| Pricing page menu | literal `menu` array in `src/app/pricing/page.tsx` (**separate copy**; differs from booking list) |
| Service detail content | `SERVICES` in `src/lib/services.ts` + `extraContent` in `ServicePageTemplate.tsx` |
| Location content | `LOCATIONS` in `src/lib/locations.ts` |
| Testimonials | `src/lib/testimonials.ts` (no source/provenance recorded) |
| Offers | `WAX_OFFERS` in `constants.ts`, `PromoBanner.tsx` messages, loyalty `programs` in `LoyaltyCard.tsx` |
| Images | `src/lib/images.ts` (Unsplash stock with alt text claiming Urmi premises/staff) + `public/urmimainfront.png`, `public/og/storefront.jpg` |

### Shared component locations

| Proposed name | Actual file |
|---|---|
| Header | `src/components/layout/Navbar.tsx` (inside `SiteChrome.tsx`) |
| Footer | `src/components/layout/Footer.tsx` |
| MobileCTA | `src/components/layout/FloatingCallButton.tsx` |
| BookingForm | `src/components/sections/Booking.tsx` |
| Reviews | `src/components/sections/Testimonials.tsx`, `src/lib/testimonials.ts` |
| Loyalty | `src/components/sections/LoyaltyCard.tsx` |
| Offers | `src/components/sections/WaxOffers.tsx`, `src/components/layout/PromoBanner.tsx` |
| Map | inline `<iframe>` in `src/components/sections/Contact.tsx` and `LocationPageTemplate.tsx` |
| Business data | `src/lib/constants.ts` |
| Service data | `src/lib/services.ts` |
| JSON-LD | `src/components/seo/{LocalBusinessSchema,ServiceSchema,BreadcrumbSchema,FAQSchema}.tsx` |

### 1. URL → source file map

| URL | Source file(s) |
|---|---|
| `/` | `src/app/page.tsx` → sections `Hero`, `TrustBar`, `WaxOffers`, `Services`, `About`, `ThreadingDifference`, `Testimonials`, `LoyaltyCard`, `Booking`, `Contact`, `FAQ` |
| `/eyebrow-threading-wayne-nj` | `src/app/eyebrow-threading-wayne-nj/page.tsx` (self-contained, 660 lines) |
| `/services` | `src/app/services/page.tsx` |
| `/pricing` | `src/app/pricing/page.tsx` (client) + `src/app/pricing/layout.tsx` (metadata) |
| `/book` | `src/app/book/page.tsx` → `Booking` |
| `/about` | `src/app/about/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` → `Contact` |
| `/services/eyebrow-threading` | `src/app/services/eyebrow-threading/page.tsx` → `ServicePageTemplate` + `SERVICES[id=eyebrow-threading]` |
| `/services/face-threading` | `src/app/services/face-threading/page.tsx` → same template |
| `/services/waxing` | `src/app/services/waxing/page.tsx` → same template (+ `WaxOffers`) |
| `/services/facials` | `src/app/services/facials/page.tsx` → same template |
| `/services/eyelash-extensions` | `src/app/services/eyelash-extensions/page.tsx` → same template |
| `/services/henna` | `src/app/services/henna/page.tsx` → same template |
| `/services/tinting` | `src/app/services/tinting/page.tsx` → same template |
| `/locations/wayne-nj` | `src/app/locations/wayne-nj/page.tsx` → `LocationPageTemplate` + `LOCATIONS[slug]` |
| `/locations/paterson-nj` | `src/app/locations/paterson-nj/page.tsx` → same |
| `/locations/clifton-nj` | `src/app/locations/clifton-nj/page.tsx` → same |
| `/locations/totowa-nj` | `src/app/locations/totowa-nj/page.tsx` → same |
| `/locations/little-falls-nj` | `src/app/locations/little-falls-nj/page.tsx` → same |
| `/locations/fair-lawn-nj` | `src/app/locations/fair-lawn-nj/page.tsx` → same |
| `/locations/paramus-nj` | `src/app/locations/paramus-nj/page.tsx` → same |
| `/privacy` | **missing (404)** — linked from the footer. Repair target: `src/app/privacy/page.tsx` |
| `/admin`, `/admin/login` | `src/app/admin/*` (not public, not in sitemap) |
| `/api/book`, `/api/availability` | `src/app/api/book/route.ts`, `src/app/api/availability/route.ts` |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` |
| `/favicon.ico` | `src/app/favicon.ico` |
| `/manifest.json` | `public/manifest.json` (admin manifest) |
| `/gallery` | `next.config.ts` redirect → `/` (308, permanent) |

The sitemap emits exactly the 21 public URLs above (7 static + 7 services + 7 locations).

### 2. Baseline inventory (production build, `next start`, 2026-09-28)

| Route | Status | Title | H1s | H1 | Canonical | og:url |
|---|---|---|---|---|---|---|
| / | 200 | Eyebrow Threading Salon in Wayne, NJ | 1 | Flawless Brows, Handcrafted to Perfection | / | (root default) |
| /eyebrow-threading-wayne-nj | 200 | Eyebrow Threading in Wayne, NJ \| Urmi Threading Salon \| Urmi Threading Salon | 1 | Eyebrow Threading in Wayne, NJ | ✓ | ✓ |
| /services | 200 | Beauty Services — Threading, Waxing, Facials & More \| Urmi Threading Salon | 1 | All Beauty Services | ✓ | ✓ |
| /pricing | 200 | Pricing & Services Menu \| Urmi Threading Salon | 1 | Services & Pricing | ✓ | ✓ |
| /book | 200 | Book an Appointment — Urmi Threading Salon Wayne NJ \| Urmi Threading Salon | **0** | — | ✓ | missing |
| /about | 200 | About Us — 15+ Years Threading in Wayne, NJ \| Urmi Threading Salon | 1 | 15 Years. One Craft. Thousands of Beautiful Brows. | ✓ | missing |
| /contact | 200 | Contact — Urmi Threading Salon, 150 Hinchman Ave, Wayne NJ \| Urmi Threading Salon | 1 | Contact Us | ✓ | missing |
| /services/eyebrow-threading | 200 | Eyebrow Threading in Wayne, NJ — Precision Brow Shaping \| Urmi Threading Salon | 1 | Eyebrow Threading | ✓ | ✓ |
| /services/face-threading | 200 | Full Face Threading Wayne NJ — Upper Lip, Chin & Sides \| Urmi Threading Salon | 1 | Full Face Threading | ✓ | ✓ |
| /services/waxing | 200 | Body Waxing in Wayne, NJ — Smooth, Long-Lasting Results \| Urmi Threading Salon | 1 | Body Waxing | ✓ | ✓ |
| /services/facials | 200 | Facial Threading in Wayne, NJ — Chemical-Free Hair Removal \| Urmi Threading Salon | 1 | **Facial Threading** | ✓ | ✓ |
| /services/eyelash-extensions | 200 | Eyelash Extensions Wayne, NJ — Natural to Dramatic Volume \| Urmi Threading Salon | 1 | Eyelash Extensions | ✓ | ✓ |
| /services/henna | 200 | Henna & Mehndi in Wayne, NJ — Natural Henna Art \| Urmi Threading Salon | 1 | Henna | ✓ | ✓ |
| /services/tinting | 200 | Lash & Brow Tinting Wayne NJ — Defined Brows Without Makeup \| Urmi Threading Salon | 1 | Lash & Brow Tinting | ✓ | ✓ |
| /locations/wayne-nj | 200 | Eyebrow Threading in Wayne, NJ — Urmi Threading Salon \| Urmi Threading Salon | 1 | Eyebrow Threading in Wayne, NJ — Urmi Threading Salon | ✓ | missing |
| /locations/paterson-nj | 200 | Eyebrow Threading Near Paterson, NJ — Urmi Threading Salon \| Urmi Threading Salon | 1 | Eyebrow Threading **in** Paterson, NJ — … | ✓ | missing |
| /locations/clifton-nj | 200 | (same pattern, duplicated brand) | 1 | Eyebrow Threading **in** Clifton, NJ — … | ✓ | missing |
| /locations/totowa-nj | 200 | (same pattern) | 1 | … in Totowa, NJ — … | ✓ | missing |
| /locations/little-falls-nj | 200 | (same pattern) | 1 | … in Little Falls, NJ — … | ✓ | missing |
| /locations/fair-lawn-nj | 200 | (same pattern) | 1 | … in Fair Lawn, NJ — … | ✓ | missing |
| /locations/paramus-nj | 200 | (same pattern) | 1 | … in Paramus, NJ — … | ✓ | missing |
| /privacy | **404** | | | | | |
| /locations | 404 (referenced by location BreadcrumbList JSON-LD) | | | | | |
| /this-does-not-exist | 404 ✓ | | | | | |
| /gallery | 308 → / | | | | | |

"missing" og:url means the page inherits the root layout's `og:url` = homepage.

Assets: `/favicon.ico` 200, **1,910,625 B**; `/og/storefront.jpg` 200 (96 KB);
`/og/eyebrow-threading-wayne-nj.jpg` **404** (referenced by the landing page OG tags);
`/urmimainfront.png` 200, 962 KB (used as hero, admin manifest icon and push icon).

Hosts (live): `http://apex` → 308 `https://apex` → **307** `https://www` (temporary).
`http://www` → 308 `https://www`. Query strings preserved. The apex 307 is a Vercel
domain setting — see owner/ops actions.

### Regression constants (must never change)

- Display phone `(973) 653-9322`; href `tel:+19736539322`
- Address `150 Hinchman Ave, Wayne, NJ 07470`
- Canonical origin `https://www.urmithreadingsalon.com`
- The 21 sitemap URLs listed above, all returning 200

These are asserted by `scripts/verify-site.mjs` (added in a later phase).

### 3. Business facts requiring owner verification

| Fact | Current site | Evidence found | Handling until verified |
|---|---|---|---|
| Founding year | "2010", "Est. 2010", "15+ years" (≈40 places) | none in repo; 2016 not found anywhere | `foundingYear: null`; no founding/age claims rendered |
| Family-owned | not stated | project brief | used as instructed |
| Hours | Mon–Wed 10–6:30, Thu–Fri 10–7, Sat 10–6, Sun 11–5 | constants + commit 1d861c3 | kept; booking now uses them; holiday exceptions unknown |
| Google rating / review count | 4.8 / 250+ | stated by the site operator in chat on 2026-09-28 (not independently verified) | see Phase 1 notes |
| Testimonials (10 quotes, names, "Verified", "x weeks ago") | shown on home, landing page, locations, JSON-LD | no source or permission recorded | removed |
| Reviewer avatars | Unsplash stock portraits | stock | removed |
| "10,000+ brows", "thousands", "#1", "most trusted", "top-rated" | several pages | none | removed |
| "CDC-compliant", "medical-grade adhesive", "zero irritation", "safe for all skin types" | several pages | none | removed |
| Offers: 15% new customers, $10 off first Brazilian, $20 off Full Body Wax | banner, offers section | operator stated the two wax offers in chat; stacking/eligibility/dates unknown | see Phase 1 notes |
| Loyalty: "9th brow free" (footer) vs 9-stamp card with free 9th slot vs "every 8th Brazilian $15 off" | footer, loyalty section | commit b998a7e; arithmetic ambiguous | generic "Ask about our loyalty cards" |
| "Eyelash Exchange" (booking) vs "Eyelash Lifting" (pricing) | both | commit c05ae4e mentions fixing lifting | excluded from online requests |
| Service durations | `bookingServices` | none | kept as estimates; owner to confirm |
| Parking, travel times, highway directions | location pages | none | removed |
| Contact email | `info@urmithreadingsalon.com` in constants; `urmithreadingandbeautysalon@gmail.com` in footer and notification code | code | gmail used (it receives booking mail); `info@` unused |
| Geo coordinates | 40.9468, -74.2421 | approximate; map embed `pb` string is synthetic | removed from schema; map uses address query |
| Google place ID | `ChIJkYG8UIMCw4kR9uiaGiH6hBk` | resolved from the site's existing `g.page/r/Cfbomhoh-oQZEAE/review` short link on 2026-09-28 | used for "Read Reviews" link; owner to confirm it opens this salon |

### 4. Phase checklist

- [x] Phase 0 — discovery, map, baseline (this document)
- [x] Phase 1 — accuracy & conversion repairs
- [x] Phase 2 — booking correctness & shared catalog
- [ ] Phase 3 — metadata, local content, schema, privacy
- [ ] Phase 4 — performance, accessibility, proof

Test/verification results are appended per phase below.

## Phase 1 — Accuracy and conversion repairs

Commit: `fix: correct salon content and prioritize calls`

Scope note: a few Phase 3 items landed here because the same files were being
rewritten: the exact title/description/H1 map (`src/lib/seo.ts`), the conservative
BeautySalon JSON-LD, and the location-page copy (the old copy contained the
invented travel times and parking claims this phase had to remove).

### What changed

- **Single business source** — `src/lib/constants.ts` (`BUSINESS`, `WEEKLY_HOURS`,
  `CTA`, `FOOTER_BLURB`). `foundingYear: null`; no founding, "Est.", "15+ years",
  "10,000 brows", "#1", "most trusted", "top-rated", "thousands", "five-star",
  "Verified", "CDC-compliant", "medical-grade", "zero irritation", "no skin damage" or
  "safe for all" wording remains in rendered text, metadata or JSON-LD.
- **Phone-first CTAs** — `src/components/ui/CallCta.tsx`. Filled "Call (973) 653-9322"
  + outlined "Request an Appointment" in the header (≥1024px), hero, service,
  location, contact, pricing and about pages; helper text for the automated
  receptionist next to the main call actions. "Get Directions" links to Google Maps.
- **Sticky bar** — `FloatingCallButton.tsx` now shows below 1024px (was below 768px,
  leaving 768–1023px with no call/request control). Safe-area padding, a spacer below
  the footer, and `scroll-padding-bottom` keep it from covering content. On `/book`
  it shows "View Request Form" (in-page link) instead of reloading `/book`.
- Hardcoded "Open Today" / "Open · Walk-ins Welcome" removed → "Walk-ins welcome
  during salon hours" + "View Hours" (`/contact#hours`).
- **Hero** — exact eyebrow/H1/body copy; social links moved to the Contact section.
- **Service cards** — third card is now "Facials", "From $45" (Mini Facial, from the
  catalog) → `/services/facials`. "Learn More" labels replaced with descriptive text.
- **/services/facials** — skincare facials content, H2s "Skincare Facials",
  "Facial Prices", "Before Your Visit", "Facial Questions". Prices come from
  `src/lib/catalog.ts`. No threading benefits, process, FAQ or Service description
  remain on the URL (HTML and JSON-LD checked).
- **Booking copy** — `/book` has one H1 "Request an Appointment", intro before the form
  on every breakpoint (no CSS `order-*`), "Send Appointment Request", honest
  success/failure text. "Guarantees your preferred time slot" and "within 1 hour"
  removed.
- **Reviews** — 10 unsourced testimonials, stock reviewer avatars, "Verified" badges,
  "x weeks ago" strings and review JSON-LD removed. Rating/count hidden
  (`BUSINESS.reviews.verified = false`). "Read Reviews on Google" uses the place ID
  resolved from the site's existing review short link; "Leave a Review" is separate.
- **Offers** — centralized in `src/lib/offers.ts` with eligibility, dates and stacking
  fields. Terms are unconfirmed, so the site shows "Ask about current salon offers."
  + "Call About Offers". No "$5" offer exists anywhere in the repository.
- **Loyalty** — the 9-stamp/8-stamp card and "Every 9th brow threading is FREE"
  footer line removed → "Ask about our loyalty cards on your next visit."
- **Technical** — favicon 1,910,625 B → 4,496 B (16/32/48 ICO); `apple-icon.png`
  180px; 192/512/maskable PNG icons; both OG images are 1200×630 crops of the real
  salon photo; hero image dimensions corrected (1360×1020); no duplicated brand in
  any title; the landing page's literal `&apos;` strings are gone; admin manifest and
  Apple web-app title moved to `src/app/admin/layout.tsx`.
- **Contrast tokens** — `brand-purple-strong` #7E22CE (6.98:1 on white) for text;
  gradient buttons #C0267A→#8B35E0 (≥5.5:1 with white text).
- Stock imagery with alt text claiming Urmi staff/premises removed; only the two real
  salon interior photos remain, with literal descriptions.

### Operator-requested items reverted by this audit

On 2026-09-28 (before this audit) the site operator asked for "$10 off first Brazilian"
and "$20 off Full Body Wax" cards, 250+ reviews at 4.8 stars, and stock portrait avatars.
Per the audit rules: the avatars are removed; the offers are kept in
`src/lib/offers.ts` but hidden until `termsVerified` is set; the rating/count is kept
in `BUSINESS.reviews` but hidden until `verified` is set.

### Checks

- `next build` ✓, `tsc --noEmit` ✓
- Crawl: all 21 routes 200 with the exact titles/H1s from the brief; `/book` has one H1.
- Assets: favicon, apple-icon, both OG images, app icons all 200.
- `scripts/check-ui.mjs` (Chrome, 320/360/390/768/1024/1440): no overflow, call and
  request controls visible in the first viewport on the tested routes.

## Phase 2 — Booking correctness and shared service data

Commit: `fix: make appointment requests consistent and reliable`

### Catalog (`src/lib/catalog.ts`)

One typed list with stable id, name, category, starting price (or `null` = quote),
scheduling duration, service page and bookability. It drives `/pricing`, every service
page's price list, the homepage cards, the booking `<select>`, and server validation.

- All published prices preserved (including Mini, Deep Cleaning, Acne, Fruits, Gold,
  Repechage and Four Layer facials, which were on the menu but missing from booking).
- "Arm, Leg & Underarm Combo" (booking) and "Arm, Leg & Underarm" (menu) unified.
- **Eyelash Exchange** — only in the old booking list, never on the menu, meaning
  unconfirmed → not offered online; the form points to the phone.
- **Eyelash Lifting** ($55, on the menu) is bookable.
- **Gift cards** are `bookable: false` and shown as "Ask About Gift Cards" (call).
- Durations for items that were not in the old booking list are scheduling estimates
  (Mini 30; other facials 60; Four Layer 90; lifting 60) — owner to confirm.
- Service pages link to `/book?service=<id>` (exact service pages) or
  `/book?category=<id>` (waxing, facials, henna, tinting → category listed first, no
  service auto-chosen). Unknown or non-bookable ids are ignored.

### Request model

Online bookings are **preferred-time requests**. They are stored with
`status: "pending"`; staff confirm or cancel in `/admin` (new **Confirm** button).
The client email (only when an email was given) says "received … not confirmed yet";
a separate "confirmed" email is sent only when staff press Confirm.

### Availability (`src/lib/booking/scheduling.ts`)

- Hours come from `WEEKLY_HOURS` (the old form hardcoded 18:00 on Mon–Wed).
- All date math in America/New_York via `Intl`, independent of server/browser zone.
- 15-minute grid; last start = close − service duration.
- Past times (plus a 30-minute lead) removed from today; past dates return nothing.
- Up to 60 days ahead.
- Overlap-aware capacity (`BOOKING_RULES.capacity = 2` concurrent online requests;
  the old site only blocked identical start times). **Owner to confirm capacity.**
- `/api/availability?date&service` computes slots server-side; failures return 503 —
  the form shows "We couldn't check available times…" with a retry, never all-open.
- The form keys requests by service+date and aborts stale fetches.

### Submission (`src/lib/booking/submit.ts`, `/api/book`)

- One zod schema shared by client and server (`src/lib/booking/schema.ts`).
- Server re-validates service id, date, hours, past time and capacity at submit.
- Simultaneous requests: insert, re-read, and withdraw this request if it ranks beyond
  capacity for its time (→ 409 "That time is no longer available…").
- Success only if the request is stored **and** at least one staff channel (email,
  Telegram, push) accepted it; otherwise the row is withdrawn and the visitor sees the
  failure text. Client input is HTML-escaped in every email.
- Email is optional ("Email address (optional)") on client and server; staff
  notifications don't depend on it; `""` is stored so a NOT NULL column still works.
- Honeypot field for bots.
- Resend is created lazily, so `next build` no longer needs `RESEND_API_KEY`.

### Admin

`/admin` shows times from both the new `HH:MM` and legacy `h:mm AM` formats, sorts
by time, adds **Confirm**, and only shows email when present. Separately, the
middleware, admin API, push-subscribe and login routes now deny access when
`ADMIN_PASSWORD` is unset (previously an unset variable matched a missing cookie).
The cookie still stores the password itself; replacing it with a signed session is
recommended but was not in scope.

### Analytics (`src/lib/analytics.ts`)

No analytics provider exists and none was added (no property ID invented). Events
`call_click`, `directions_click`, `booking_start`, `booking_request_success`,
`booking_request_error` are pushed to `window.dataLayer` only if a tag manager has
created it, and dispatched as a `urmi:analytics` DOM event. Payloads contain only
`page_path`, `placement` and `service_id` (enforced by an allow-list and a test).

### Tests

`npm test` (vitest, 31 tests, all passing):

- scheduling: Mon–Wed 18:30 close (15-min Wednesday service ends at 18:30),
  Thu/Fri 19:00, Sat/Sun, durations, off-grid times, past times and dates, 60-day
  limit, New York midnight, spring-forward and fall-back, overlap and capacity.
- submission: pending storage + staff sink message, client acknowledgement wording,
  optional/invalid email, invalid/non-bookable/ambiguous service ids, past and
  out-of-hours rejection, read failure, insert failure, total notification failure
  (no false success), three simultaneous requests for one time (2 succeed, 1 → 409),
  capacity overlap, HTML escaping, honeypot.
- availability API: valid, unknown service (400), store failure (503, no slots), past date.
- analytics payload allow-list.

`node scripts/e2e-booking.mjs` (Chrome, server started with `BOOKING_TEST_SINK`),
8/8 passing: exact preselection from a service page; category preselection; invalid id
ignored; service kept after navigating away; availability failure UI; field-level
error announcement and focus; failed submit shows no success and keeps values;
successful submit stored as `pending` in the test sink with "not confirmed yet" shown.

No production records or messages were created: every automated run used the test
sink (`BOOKING_TEST_SINK`), which cannot be enabled when `VERCEL_ENV=production`.

The owner-run phone/delivery test is in `docs/operational-test.md`.
