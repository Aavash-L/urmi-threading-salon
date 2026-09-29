# Local Search Handoff — Owner Actions

The website changes are done and ready for review; they are **not deployed**. The items
below need the owner's knowledge, photos, or account access. Nothing here was changed in
Google Business Profile (GBP), Search Console, Vercel or the phone system. There was no
access to those accounts.

Each item says what the site does today and which single setting to change once you
have the answer.

## 1. Facts to confirm

| # | Question | Site today | Where to update |
|---|---|---|---|
| 1 | What year did the salon open? (documentation, e.g. business registration) | No year or "years in business" shown anywhere | `BUSINESS.foundingYear` in `src/lib/constants.ts`; then a line can be added to About |
| 2 | Are these hours correct, and what are the holiday closures? Mon–Wed 10–6:30, Thu–Fri 10–7, Sat 10–6, Sun 11–5 | Shown site-wide, in JSON-LD, and used to generate request times | `WEEKLY_HOURS` in `src/lib/constants.ts` (holiday closures are not supported yet — say if needed) |
| 3 | Current Google rating and review count (check the live profile) | Hidden. "Read Reviews on Google" / "Leave a Review" only | `BUSINESS.reviews` → set `rating`, `count`, `verified: true` |
| 4 | Any client quotes you have permission to reuse (name/initials, date, source) | None shown (the previous 10 had no source) | Add a sourced list, then they can be shown with real dates |
| 5 | Offer terms: 15% new-customer, $10 off first Brazilian, $20 off Full Body Wax — who qualifies, start/end dates, and can they be combined? Is there a $5 offer? | "Ask about current salon offers." + "Call About Offers" | `src/lib/offers.ts` → fill in, set `stacking`, `termsVerified: true` |
| 6 | Loyalty card: free eyebrow threading after 8 or 9 paid visits? Brazilian reward details? | "Ask about our loyalty cards on your next visit." | Tell us the exact rules and a loyalty section can come back |
| 7 | What is "Eyelash Exchange"? (It was in the old booking list but not on the menu) | Not offered online | Add to `CATALOG` in `src/lib/catalog.ts` if it's a real service |
| 8 | How long does each service take? Especially facials, lash lift, henna | Scheduling estimates only | `duration` in `src/lib/catalog.ts` |
| 9 | How many online requests can overlap at once (staff available)? | 2 | `BOOKING_RULES.capacity` in `src/lib/booking/scheduling.ts` |
| 10 | Which email should be public? | `urmithreadingandbeautysalon@gmail.com` (receives requests) | `BUSINESS.email` |
| 11 | How long should appointment requests and staff messages be kept? | Not stated | Privacy page + a cleanup job |
| 12 | Is the salon "family-owned"? (stated per the project brief) | Stated in hero, About, footer, JSON-LD | Confirm or tell us to change |
| 13 | Parking and access details (entrance, accessibility)? | Not mentioned (unverified claims removed) | Can be added to Contact / Wayne page |

## 2. Photos needed (real, owner-approved only)

No gallery was published because no verified work photos exist. The site uses only
two real interior photos (`public/urmimainfront.png`, `public/images/salon-stations.jpg`).
Please send:

- **Henna**: 4–8 photos of henna done at the salon (hands, feet, bridal), with permission
  from each client whose hands/feet appear → "Work From Our Salon" gallery on `/services/henna`.
- **Lashes**: 4–8 before/after or result photos with client permission → gallery on
  `/services/eyelash-extensions`.
- **Brows**: optional results photos for `/eyebrow-threading-wayne-nj`.
- **Owner/team**: a portrait plus a short approved biography (names, roles, languages,
  how long they have been threading) → About page.
- **Exterior/entrance**: the storefront and sign on Hinchman Ave as seen from the street/parking → Contact and `/locations/wayne-nj`.

For each photo, include what service it shows, so the caption can say exactly that.

## 3. Google Business Profile (owner login needed)

Check that each of these matches the website exactly:

- Business name: **Urmi Threading Salon**
- Address: **150 Hinchman Ave, Wayne, NJ 07470**
- Phone: **(973) 653-9322** (the original number — do not replace it with a tracking number)
- Primary category (e.g. "Eyebrow bar" / "Threading service") and secondary categories
  (waxing, facial spa, eyelash service, henna)
- Services list and prices consistent with `/pricing`
- Hours (same as item 2 above), including holiday hours
- Website: `https://www.urmithreadingsalon.com/`
- Appointment URL: `https://www.urmithreadingsalon.com/book`
- Confirm the "Read Reviews on Google" link on the site opens *this* profile
  (it uses place ID `ChIJkYG8UIMCw4kR9uiaGiH6hBk`, taken from the site's existing review link).

## 4. Search Console (owner login needed)

- Compare queries and pages for `/eyebrow-threading-wayne-nj`,
  `/services/eyebrow-threading` and `/locations/wayne-nj`. If they compete for the same
  queries, decide which to consolidate. Do **not** noindex or redirect any of them
  without that data.
- Submit `https://www.urmithreadingsalon.com/sitemap.xml` (it now also lists `/privacy`).
- After deploy, inspect `/services/facials` to confirm Google picks up the skincare content.

## 5. Hosting (Vercel dashboard)

- The bare domain `urmithreadingsalon.com` currently redirects to `www` with a
  **temporary 307**. Set the domain redirect to **permanent (308)** in Vercel → Project →
  Domains.
- `RESEND_API_KEY` is no longer needed at build time, but it is still needed at runtime
  for email.

## 6. Measure results (monthly)

- Qualified calls: phone-system call log (website `call_click` taps are not calls).
- Online requests received vs. confirmed vs. no-shows (admin dashboard).
- If an analytics tool is added, it can use the site's existing events:
  `call_click`, `directions_click`, `booking_start`, `booking_request_success`,
  `booking_request_error`. They carry only page path, placement and service id.

## 7. Receptionist test

Run `docs/operational-test.md`: price and hours answers, appointment questions,
transfer to a person, after-hours/unanswered handling, and end-to-end request delivery.
