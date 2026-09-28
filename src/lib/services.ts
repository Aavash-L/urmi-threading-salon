import type { CategoryId, ServicePageSlug } from "@/lib/catalog";

// Content for the /services/* detail pages. Prices are never written here; each page
// lists catalog item ids and the template reads prices from src/lib/catalog.ts.
// Copy is limited to what the salon's menu supports — no treatment guarantees,
// longevity promises or medical claims.

export interface ServiceSection {
  heading: string;
  body: string;
  /** Phrases inside `body` that should render as links. */
  links?: { text: string; href: string }[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: ServicePageSlug;
  slug: ServicePageSlug;
  /** Short label for navigation, cards and breadcrumbs. */
  name: string;
  h1: string;
  intro: string;
  /** One-line summary for cards. */
  shortDescription: string;
  about: ServiceSection;
  priceHeading: string;
  priceItemIds: string[];
  priceNote?: string;
  /** Renders "<name> from $<price>." for each id, followed by `tail`. */
  priceSummary?: { ids: string[]; tail: string };
  extraSections?: ServiceSection[];
  beforeVisit: ServiceSection;
  faqHeading: string;
  faqs: FAQ[];
  /** Preselection passed to /book. */
  booking: { service?: string; category?: CategoryId };
  related: { text: string; href: string }[];
  icon: string;
}

export const PRICING_NOTE =
  "Prices shown are starting prices. Call to confirm the price for your selected service.";

const SUITABILITY: ServiceSection = {
  heading: "Before Your Visit",
  body: "Tell us about sensitivities, recent treatments, and any products you use before your appointment. Call if you are unsure which service to choose.",
};

const REQUEST_FAQ: FAQ = {
  question: "Do I need an appointment?",
  answer:
    "Walk-ins are welcome during salon hours. You can also call (973) 653-9322 or send an appointment request online. An online request is not confirmed until the salon confirms it.",
};

export const SERVICES: Service[] = [
  {
    id: "eyebrow-threading",
    slug: "eyebrow-threading",
    name: "Eyebrow Threading",
    h1: "Eyebrow Threading: Service & Prices",
    intro:
      "Explore eyebrow shaping with cotton thread at our Wayne salon. Eyebrow threading starts at $10. Tell us the shape you prefer before your service.",
    shortDescription: "Brow shaping with cotton thread, from $10.",
    about: {
      heading: "About This Service",
      body: "Eyebrow threading shapes the brows by removing unwanted hair with a twisted cotton thread. Before we start, let us know whether you want a natural shape, a more defined arch, or a light clean-up. Planning a first visit? Our eyebrow threading in Wayne page covers hours and what to expect when you arrive.",
      links: [{ text: "eyebrow threading in Wayne", href: "/eyebrow-threading-wayne-nj" }],
    },
    priceHeading: "Service Options & Prices",
    priceItemIds: ["eyebrow-threading", "mens-eyebrow-threading", "eye-lip-threading", "eyebrow-tinting"],
    beforeVisit: SUITABILITY,
    faqHeading: "Common Questions",
    faqs: [
      {
        question: "How much does eyebrow threading cost?",
        answer:
          "Eyebrow threading starts at $10. Prices shown are starting prices, so call (973) 653-9322 to confirm the price for your service.",
      },
      REQUEST_FAQ,
    ],
    booking: { service: "eyebrow-threading" },
    related: [
      { text: "Eyebrow threading in Wayne: hours and visit details", href: "/eyebrow-threading-wayne-nj" },
      { text: "Plan your visit to our Wayne salon", href: "/locations/wayne-nj" },
      { text: "Full face threading prices", href: "/services/face-threading" },
    ],
    icon: "Sparkles",
  },
  {
    id: "face-threading",
    slug: "face-threading",
    name: "Full Face Threading",
    h1: "Full Face Threading in Wayne, NJ",
    intro:
      "Explore threading for unwanted facial hair at our Wayne salon. Full face threading starts at $35; full face with neck starts at $40. View the menu for individual areas.",
    shortDescription: "Threading for facial hair removal, with full-face options from $35.",
    about: {
      heading: "About This Service",
      body: "Threading removes unwanted facial hair with a twisted cotton thread. Choose a single area, such as the upper lip or chin, or a full face service. Threading is a hair removal service; for skincare treatments, see our facials menu.",
      links: [{ text: "facials menu", href: "/services/facials" }],
    },
    priceHeading: "Service Options & Prices",
    priceItemIds: [
      "full-face-threading",
      "full-face-neck-threading",
      "upper-lip-threading",
      "lower-lip-threading",
      "chin-threading",
      "forehead-threading",
      "side-threading",
      "cheek-threading",
      "neck-threading",
    ],
    beforeVisit: SUITABILITY,
    faqHeading: "Common Questions",
    faqs: [
      {
        question: "Is full face threading the same as a facial?",
        answer:
          "No. Full face threading removes unwanted facial hair. A facial is a skincare treatment, and our facials have their own page and pricing.",
      },
      REQUEST_FAQ,
    ],
    booking: { service: "full-face-threading" },
    related: [
      { text: "Eyebrow threading service and prices", href: "/services/eyebrow-threading" },
      { text: "Skincare facials", href: "/services/facials" },
      { text: "Full salon price menu", href: "/pricing" },
    ],
    icon: "User",
  },
  {
    id: "waxing",
    slug: "waxing",
    name: "Waxing",
    h1: "Waxing in Wayne, NJ",
    intro:
      "Explore waxing for underarms, arms, legs, bikini, Brazilian, and other areas. View the menu for starting prices or call to discuss your visit.",
    shortDescription: "Face and body waxing, including Brazilian and full body.",
    about: {
      heading: "About This Service",
      body: "We offer waxing for the face and body, including underarms, arms, legs, bikini line, Brazilian, back, and chest. Choose one area or combine several in the same visit. The full price menu lists every waxing area.",
      links: [{ text: "full price menu", href: "/pricing" }],
    },
    priceHeading: "Service Options & Prices",
    priceItemIds: [
      "underarm-wax",
      "half-arm-wax",
      "full-arm-wax",
      "half-leg-wax",
      "full-leg-wax",
      "bikini-line-wax",
      "brazilian-wax",
      "arm-leg-underarm-wax",
      "full-body-wax",
    ],
    beforeVisit: SUITABILITY,
    faqHeading: "Common Questions",
    faqs: [
      {
        question: "Which areas can I have waxed?",
        answer:
          "The menu includes eyebrow, nose, ear, underarm, arm, leg, stomach, bikini line, Brazilian, back, chest, and full body waxing. View the pricing menu for starting prices.",
      },
      REQUEST_FAQ,
    ],
    booking: { category: "waxing" },
    related: [
      { text: "Full salon price menu", href: "/pricing" },
      { text: "Full face threading", href: "/services/face-threading" },
    ],
    icon: "Zap",
  },
  {
    id: "facials",
    slug: "facials",
    name: "Facials",
    h1: "Facials in Wayne, NJ",
    intro:
      "Explore skincare facials at Urmi Threading Salon, including Mini, Basic, and Diamond Facials. View the menu or call to discuss your visit.",
    shortDescription: "Explore skincare facials and choose a treatment for your visit.",
    about: {
      heading: "Skincare Facials",
      body: "A skincare facial is different from facial threading. Facials are skincare treatments; facial threading removes unwanted hair. For hair removal, explore our full face threading service.",
      links: [{ text: "full face threading", href: "/services/face-threading" }],
    },
    priceHeading: "Facial Prices",
    priceSummary: {
      ids: ["mini-facial", "basic-facial", "diamond-facial"],
      tail: "See the full menu for additional facial options.",
    },
    priceItemIds: [
      "mini-facial",
      "basic-facial",
      "diamond-facial",
      "deep-cleaning-facial",
      "acne-facial",
      "fruits-facial",
      "gold-facial",
      "repechage-facial",
      "four-layer-facial",
    ],
    beforeVisit: {
      heading: "Before Your Visit",
      body: "Tell us about your skin concerns, sensitivities, and recent treatments before your appointment. Call if you are unsure which facial to choose.",
    },
    faqHeading: "Facial Questions",
    faqs: [
      {
        question: "Is a facial the same as facial threading?",
        answer:
          "No. A facial is a skincare treatment. Facial threading removes unwanted facial hair. Our full face threading service has its own page and pricing.",
      },
      {
        question: "Which facials are available?",
        answer:
          "Our menu includes Mini, Basic, Diamond, and other facial options. View the pricing menu or call (973) 653-9322 to discuss your visit.",
      },
      {
        question: "How do I request a facial appointment?",
        answer:
          "Choose a facial in the appointment request form or call (973) 653-9322. An online request is not confirmed until the salon confirms it.",
      },
    ],
    booking: { category: "facials" },
    related: [
      { text: "Full face threading for facial hair", href: "/services/face-threading" },
      { text: "Full salon price menu", href: "/pricing" },
    ],
    icon: "Heart",
  },
  {
    id: "eyelash-extensions",
    slug: "eyelash-extensions",
    name: "Eyelash Extensions",
    h1: "Eyelash Extensions in Wayne, NJ",
    intro:
      "Explore eyelash extensions at our Wayne salon. The menu lists extensions from $50. Call before booking to confirm the application type, appointment length, and aftercare for the service you want.",
    shortDescription: "Eyelash extensions from $50. Call to discuss your service.",
    about: {
      heading: "About This Service",
      body: "Tell the salon the look you have in mind when you call. They can explain the options available, how long your appointment will take, and the aftercare for your service. The menu also lists eyelash lifting and tinting.",
    },
    priceHeading: "Service Options & Prices",
    priceItemIds: ["eyelash-extensions", "eyelash-lifting", "eyelash-tinting"],
    beforeVisit: SUITABILITY,
    faqHeading: "Common Questions",
    faqs: [
      {
        question: "How long does an eyelash extension appointment take?",
        answer:
          "It depends on the service. Call (973) 653-9322 before booking and the salon will confirm the appointment length.",
      },
      REQUEST_FAQ,
    ],
    booking: { service: "eyelash-extensions" },
    related: [
      { text: "Brow and lash tinting", href: "/services/tinting" },
      { text: "Full salon price menu", href: "/pricing" },
    ],
    icon: "Eye",
  },
  {
    id: "henna",
    slug: "henna",
    name: "Henna & Mehndi",
    h1: "Henna & Mehndi in Wayne, NJ",
    intro:
      "Ask about henna designs for hands, feet, weddings, and special occasions. Pricing depends on the design and coverage. Call (973) 653-9322 to discuss your ideas and availability.",
    shortDescription: "Henna for hands, feet, weddings and special occasions. Priced by quote.",
    about: {
      heading: "About This Service",
      body: "Henna designs are available for hands, feet, and fuller coverage. Because every design is different, henna is priced by quote. Share photos or describe the style you like when you call.",
    },
    priceHeading: "Service Options & Prices",
    priceItemIds: ["henna-hands", "henna-feet", "henna-full"],
    priceNote: "Henna is quoted by design and coverage. Call (973) 653-9322 for a quote.",
    extraSections: [
      {
        heading: "Planning Henna for a Wedding or Event?",
        body: "Call with your event date, preferred design, and the areas you would like decorated. Ask the salon to confirm availability, appointment length, and the quote before making plans.",
      },
    ],
    beforeVisit: SUITABILITY,
    faqHeading: "Common Questions",
    faqs: [
      {
        question: "How much does henna cost?",
        answer:
          "Henna is priced by design and coverage. Call (973) 653-9322 to describe your design and get a quote.",
      },
      REQUEST_FAQ,
    ],
    booking: { category: "henna" },
    related: [{ text: "Full salon price menu", href: "/pricing" }],
    icon: "Palette",
  },
  {
    id: "tinting",
    slug: "tinting",
    name: "Brow & Lash Tinting",
    h1: "Brow & Lash Tinting in Wayne, NJ",
    intro:
      "Explore eyebrow and eyelash tinting at our Wayne salon. Eyebrow tinting starts at $15 and eyelash tinting starts at $20. Call to discuss the service before your visit.",
    shortDescription: "Eyebrow tinting from $15 and eyelash tinting from $20.",
    about: {
      heading: "About This Service",
      body: "Tinting adds color to the brows or lashes. If you are also booking eyebrow threading, mention both services in your request or when you call.",
      links: [{ text: "eyebrow threading", href: "/services/eyebrow-threading" }],
    },
    priceHeading: "Service Options & Prices",
    priceItemIds: ["eyebrow-tinting", "eyelash-tinting"],
    beforeVisit: SUITABILITY,
    faqHeading: "Common Questions",
    faqs: [
      {
        question: "Can I get tinting and threading in the same visit?",
        answer:
          "You can ask for both. Note both services in your appointment request or call (973) 653-9322 to arrange it.",
      },
      REQUEST_FAQ,
    ],
    booking: { category: "lash-brow" },
    related: [
      { text: "Eyebrow threading service and prices", href: "/services/eyebrow-threading" },
      { text: "Eyelash extensions", href: "/services/eyelash-extensions" },
    ],
    icon: "Brush",
  },
];

export function getService(slug: ServicePageSlug): Service {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service page ${slug}`);
  return s;
}

export function bookingHref(b: Service["booking"]): string {
  if (b.service) return `/book?service=${b.service}`;
  if (b.category) return `/book?category=${b.category}`;
  return "/book";
}
