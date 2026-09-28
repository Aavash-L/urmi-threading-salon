// Nearby-town pages. There is ONE salon, in Wayne; every other page points visitors
// there. No travel times, mileage, highway directions or parking details are stated
// because none have been verified — visitors are sent to live Google Maps directions.

export interface Location {
  city: string;
  slug: string;
  h1: string;
  intro: string;
  isSalonTown: boolean;
}

const nearby = (city: string, slug: string, intro: string): Location => ({
  city,
  slug,
  h1: `Eyebrow Threading Near ${city}, NJ`,
  intro,
  isSalonTown: false,
});

export const LOCATIONS: Location[] = [
  {
    city: "Wayne",
    slug: "wayne-nj",
    h1: "Visit Urmi Threading Salon in Wayne, NJ",
    intro:
      "Our salon is at 150 Hinchman Ave, Wayne, NJ 07470. Use this page to check hours, explore services, and get directions before your visit.",
    isSalonTown: true,
  },
  nearby(
    "Paterson",
    "paterson-nj",
    "Visiting from Paterson? Urmi Threading Salon is located in Wayne at 150 Hinchman Ave, NJ 07470. View threading prices, check salon hours, and get directions before you leave."
  ),
  nearby(
    "Clifton",
    "clifton-nj",
    "Planning a salon visit from Clifton? Find Urmi Threading Salon at 150 Hinchman Ave, Wayne, NJ 07470. Explore services and prices, then call or request an appointment."
  ),
  nearby(
    "Totowa",
    "totowa-nj",
    "Looking for threading near Totowa? Our salon is at 150 Hinchman Ave in Wayne, NJ 07470. Check the menu and hours, and use live directions to plan your visit."
  ),
  nearby(
    "Little Falls",
    "little-falls-nj",
    "Coming from Little Falls? Visit Urmi Threading Salon at 150 Hinchman Ave, Wayne, NJ 07470. Call for availability or send an appointment request before your trip."
  ),
  nearby(
    "Fair Lawn",
    "fair-lawn-nj",
    "Considering Urmi from Fair Lawn? Our salon is in Wayne at 150 Hinchman Ave, NJ 07470. Review the services, prices, and hours before planning your visit."
  ),
  nearby(
    "Paramus",
    "paramus-nj",
    "Planning a visit from Paramus? Urmi Threading Salon is at 150 Hinchman Ave, Wayne, NJ 07470. Explore the menu and use live directions to check your journey."
  ),
];

export const ONE_LOCATION_NOTE = "We have one salon location: 150 Hinchman Ave, Wayne, NJ 07470.";

export function getLocation(slug: string): Location {
  const l = LOCATIONS.find((x) => x.slug === slug);
  if (!l) throw new Error(`Unknown location ${slug}`);
  return l;
}

export function locationFaqs(l: Location) {
  const hoursQ = {
    question: "Do I need an appointment?",
    answer:
      "Walk-ins are welcome during salon hours. You can also call (973) 653-9322 or send an appointment request. An online request is not confirmed until the salon confirms it.",
  };
  if (l.isSalonTown) {
    return [
      { question: "Where is Urmi Threading Salon?", answer: "Our salon is at 150 Hinchman Ave, Wayne, NJ 07470." },
      hoursQ,
    ];
  }
  return [
    {
      question: `Is there an Urmi Threading Salon in ${l.city}?`,
      answer: `No. ${ONE_LOCATION_NOTE} Visitors from ${l.city} come to our Wayne salon.`,
    },
    {
      question: `How long does it take to get there from ${l.city}?`,
      answer:
        "Travel time depends on your starting point and traffic. Open Google Maps for a current route to our Wayne salon.",
    },
    hoursQ,
  ];
}
