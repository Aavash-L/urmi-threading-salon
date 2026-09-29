export const BUSINESS = {
  name: "Urmi Threading Salon",
  phone: "(973) 653-9322",
  phoneRaw: "+19736539322",
  email: "info@urmithreadingsalon.com",
  address: {
    street: "150 Hinchman Ave",
    city: "Wayne",
    state: "NJ",
    zip: "07470",
    full: "150 Hinchman Ave, Wayne, NJ 07470",
  },
  geo: {
    lat: 40.9468,
    lng: -74.2421,
  },
  // Update these two to change the rating/review count everywhere on the site
  rating: 4.8,
  reviewCount: 250,
  reviewsUrl: "https://g.page/r/Cfbomhoh-oQZEAE/review",
  established: 2010,
  url: "https://www.urmithreadingsalon.com",
  googleMapsUrl:
    "https://www.google.com/maps/place/Urmi+Threading+Salon/@40.9468,-74.2421,17z",
  instagram: "https://www.instagram.com/urmithreading.wayne",
  facebook: "https://www.facebook.com/profile.php?id=100071167904006",
  hours: [
    { days: "Monday – Wednesday", open: "10:00 AM", close: "6:30 PM" },
    { days: "Thursday – Friday", open: "10:00 AM", close: "7:00 PM" },
    { days: "Saturday", open: "10:00 AM", close: "6:00 PM" },
    { days: "Sunday", open: "11:00 AM", close: "5:00 PM" },
  ],
  serviceArea: [
    "Wayne",
    "Paterson",
    "Clifton",
    "Totowa",
    "Little Falls",
    "Fair Lawn",
    "Paramus",
    "Pompton Lakes",
    "Haledon",
    "North Haledon",
  ],
} as const;

export const SITE_URL = "https://www.urmithreadingsalon.com";

// Shown as "250+" — rounded down to the nearest 10 so the label never overstates the live count.
export const REVIEW_COUNT_ROUNDED = Math.floor(BUSINESS.reviewCount / 10) * 10;
export const REVIEWS_LABEL = `${REVIEW_COUNT_ROUNDED}+`;
export const RATING_LABEL = BUSINESS.rating.toFixed(1);

export const WAX_OFFERS = [
  {
    id: "brazilian",
    service: "Brazilian Wax",
    discount: 10,
    price: 45,
    tag: "First visit",
    headline: "Your first Brazilian, $10 off",
    blurb: "New to Urmi? Your first Brazilian wax is $10 off. It's quick and gentle, and we use soothing aftercare every time.",
  },
  {
    id: "full-body",
    service: "Full Body Wax",
    discount: 20,
    price: 180,
    tag: "Best value",
    headline: "Full Body Wax, $20 off",
    blurb: "Head-to-toe smooth in a single visit. Arms, legs, underarms, back and more, all done in one appointment.",
  },
] as const;
