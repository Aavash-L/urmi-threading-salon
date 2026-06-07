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
  rating: 4.7,
  reviewCount: 138,
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
    { days: "Sunday", open: "Closed", close: "" },
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
