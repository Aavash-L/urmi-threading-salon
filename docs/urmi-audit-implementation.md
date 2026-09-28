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
- [ ] Phase 1 — accuracy & conversion repairs
- [ ] Phase 2 — booking correctness & shared catalog
- [ ] Phase 3 — metadata, local content, schema, privacy
- [ ] Phase 4 — performance, accessibility, proof

Test/verification results are appended per phase below.
