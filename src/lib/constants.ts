// Single source of truth for business facts. Anything shown to visitors, put in
// metadata, or emitted as JSON-LD should read from here.
// Facts still awaiting owner confirmation are listed in docs/urmi-audit-implementation.md.

export const SITE_URL = "https://www.urmithreadingsalon.com";

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, matches Date#getDay

export interface HoursBlock {
  days: readonly Weekday[];
  label: string;
  open: string;  // "HH:MM", 24h, America/New_York
  close: string; // "HH:MM", 24h, America/New_York
}

// Published salon hours. Booking availability, visible hours tables and JSON-LD all read this.
export const WEEKLY_HOURS: readonly HoursBlock[] = [
  { days: [1, 2, 3], label: "Monday – Wednesday", open: "10:00", close: "18:30" },
  { days: [4, 5],    label: "Thursday – Friday",  open: "10:00", close: "19:00" },
  { days: [6],       label: "Saturday",           open: "10:00", close: "18:00" },
  { days: [0],       label: "Sunday",             open: "11:00", close: "17:00" },
];

export function formatClock(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

const ADDRESS = {
  street: "150 Hinchman Ave",
  city: "Wayne",
  state: "NJ",
  zip: "07470",
  full: "150 Hinchman Ave, Wayne, NJ 07470",
} as const;

const GOOGLE_PLACE_ID = "ChIJkYG8UIMCw4kR9uiaGiH6hBk";
const MAPS_QUERY = encodeURIComponent(ADDRESS.full);

export const BUSINESS = {
  name: "Urmi Threading Salon",
  phone: "(973) 653-9322",
  phoneRaw: "+19736539322",
  email: "urmithreadingandbeautysalon@gmail.com",
  address: ADDRESS,
  timezone: "America/New_York",
  familyOwned: true,
  // Unknown until the owner provides documentation. While null, no founding year,
  // "Est." badge or years-in-business claim may be rendered anywhere.
  foundingYear: null as number | null,
  url: SITE_URL,
  hours: WEEKLY_HOURS.map((h) => ({
    days: h.label,
    open: formatClock(h.open),
    close: formatClock(h.close),
  })),
  instagram: "https://www.instagram.com/urmithreading.wayne",
  instagramHandle: "@urmithreading.wayne",
  facebook: "https://www.facebook.com/profile.php?id=100071167904006",
  googlePlaceId: GOOGLE_PLACE_ID,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`,
  reviews: {
    // Rating and count stay hidden until the owner verifies them against the live
    // Google Business Profile. Flip `verified` to show them again.
    verified: false,
    rating: 4.8,
    count: 250,
    // Google Maps URLs API: opens this salon's profile (reviews tab is one tap away).
    readUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Urmi Threading Salon")}&query_place_id=${GOOGLE_PLACE_ID}`,
    writeUrl: "https://g.page/r/Cfbomhoh-oQZEAE/review",
  },
  serviceArea: [
    "Wayne",
    "Paterson",
    "Totowa",
    "Little Falls",
    "Pompton Lakes",
    "Clifton",
    "Fair Lawn",
    "Paramus",
  ],
} as const;

export const FOOTER_BLURB =
  "Family-owned threading and beauty salon at 150 Hinchman Ave, Wayne, NJ. Threading, waxing, facials, lashes, henna, and tinting.";

export const CTA = {
  call: `Call ${BUSINESS.phone}`,
  callHref: `tel:${BUSINESS.phoneRaw}`,
  request: "Request an Appointment",
  requestHref: "/book",
  directions: "Get Directions",
  callHelper:
    "Questions about prices, services, or availability? Our automated receptionist can help with common questions or connect you with the salon.",
  walkIns: "Walk-ins welcome during salon hours",
  viewHours: "View Hours",
} as const;
