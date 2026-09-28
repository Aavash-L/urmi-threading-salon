import type { Metadata } from "next";
import { BUSINESS, SITE_URL } from "@/lib/constants";

// Final rendered titles and descriptions for every public route. Titles are
// absolute (the root template is not appended), so the brand never repeats.
// The same description is used for meta, Open Graph and Twitter.

export interface PageMeta {
  title: string;
  description: string;
  image?: string;
}

export const PAGE_META = {
  "/": {
    title: "Threading & Beauty Salon in Wayne, NJ | Urmi",
    description:
      "Visit Urmi Threading Salon at 150 Hinchman Ave, Wayne, NJ for threading, waxing, facials, lashes, henna, and tinting. Call (973) 653-9322.",
  },
  "/eyebrow-threading-wayne-nj": {
    title: "Eyebrow Threading in Wayne, NJ | Urmi Threading Salon",
    description:
      "Eyebrow threading from $10 at 150 Hinchman Ave, Wayne, NJ. Walk-ins welcome during salon hours. Call (973) 653-9322 or request an appointment.",
    image: "/og/eyebrow-threading-wayne-nj.jpg",
  },
  "/services": {
    title: "Beauty Services in Wayne, NJ | Urmi Threading Salon",
    description:
      "Explore threading, waxing, facials, eyelash extensions, henna, and tinting at Urmi Threading Salon in Wayne, NJ. View services and starting prices.",
  },
  "/pricing": {
    title: "Salon Prices in Wayne, NJ | Urmi Threading Salon",
    description:
      "View threading, waxing, facial, lash, tinting, and henna prices at Urmi Threading Salon in Wayne, NJ. Eyebrow threading starts at $10.",
  },
  "/book": {
    title: "Request an Appointment in Wayne, NJ | Urmi",
    description:
      "Request a salon appointment at Urmi in Wayne, NJ. Your preferred time is confirmed by the salon. For same-day availability, call (973) 653-9322.",
  },
  "/about": {
    title: "About Our Family-Owned Wayne Salon | Urmi",
    description:
      "Meet Urmi Threading Salon, a family-owned beauty salon at 150 Hinchman Ave, Wayne, NJ, offering threading, waxing, facials, lashes, and henna.",
  },
  "/contact": {
    title: "Contact & Directions: Wayne, NJ | Urmi Threading Salon",
    description:
      "Find Urmi Threading Salon at 150 Hinchman Ave, Wayne, NJ 07470. Check salon hours, get directions, or call (973) 653-9322 before your visit.",
  },
  "/services/eyebrow-threading": {
    title: "Eyebrow Threading: Service & Prices | Urmi, Wayne NJ",
    description:
      "Explore eyebrow threading at Urmi in Wayne, NJ, with brow shaping from $10. View service details and request a visit or call (973) 653-9322.",
  },
  "/services/face-threading": {
    title: "Full Face Threading in Wayne, NJ | Urmi",
    description:
      "Explore full face threading from $35 at Urmi Threading Salon in Wayne, NJ. View facial hair removal options or call (973) 653-9322.",
  },
  "/services/waxing": {
    title: "Waxing in Wayne, NJ | Urmi Threading Salon",
    description:
      "View body waxing options at Urmi in Wayne, NJ, including underarms, arms, legs, bikini, and Brazilian waxing. Call (973) 653-9322.",
  },
  "/services/facials": {
    title: "Facials in Wayne, NJ | Urmi Threading Salon",
    description:
      "Explore Mini, Basic, Diamond, and other skincare facials at Urmi Threading Salon in Wayne, NJ. View prices or call (973) 653-9322.",
  },
  "/services/eyelash-extensions": {
    title: "Eyelash Extensions in Wayne, NJ | Urmi",
    description:
      "Explore eyelash extensions at Urmi Threading Salon in Wayne, NJ. Call (973) 653-9322 to discuss the service, pricing, and appointment availability.",
  },
  "/services/henna": {
    title: "Henna & Mehndi in Wayne, NJ | Urmi Threading Salon",
    description:
      "Ask about henna for hands, feet, weddings, and special occasions at Urmi in Wayne, NJ. Call (973) 653-9322 for a design quote and availability.",
  },
  "/services/tinting": {
    title: "Brow & Lash Tinting in Wayne, NJ | Urmi",
    description:
      "Explore eyebrow and eyelash tinting at Urmi Threading Salon in Wayne, NJ. View starting prices and call (973) 653-9322 to discuss your visit.",
  },
  "/locations/wayne-nj": {
    title: "Visit Our Wayne, NJ Salon | Urmi Threading Salon",
    description:
      "Plan your visit to Urmi Threading Salon at 150 Hinchman Ave, Wayne, NJ 07470. View hours, services, directions, and contact information.",
  },
  "/locations/paterson-nj": nearby("Paterson"),
  "/locations/clifton-nj": nearby("Clifton"),
  "/locations/totowa-nj": nearby("Totowa"),
  "/locations/little-falls-nj": nearby("Little Falls"),
  "/locations/fair-lawn-nj": nearby("Fair Lawn"),
  "/locations/paramus-nj": nearby("Paramus"),
  "/privacy": {
    title: "Appointment Privacy Information | Urmi Threading Salon",
    description:
      "Learn how appointment request information is used by Urmi Threading Salon and how to contact the salon with questions about your information.",
  },
} satisfies Record<string, PageMeta>;

export type PublicPath = keyof typeof PAGE_META;

function nearby(city: string): PageMeta {
  return {
    title: `Eyebrow Threading Near ${city}, NJ | Urmi`,
    description: `Looking for eyebrow threading near ${city}? Visit Urmi at 150 Hinchman Ave, Wayne, NJ. View prices and directions or call (973) 653-9322.`,
  };
}

export const DEFAULT_OG_IMAGE = "/og/storefront.jpg";

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function pageMetadata(path: PublicPath): Metadata {
  const meta: PageMeta = PAGE_META[path];
  const url = absoluteUrl(path);
  const image = {
    url: meta.image ?? DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
    alt: "Inside Urmi Threading Salon at 150 Hinchman Ave, Wayne, NJ",
  };
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: BUSINESS.name,
      url,
      title: meta.title,
      description: meta.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [image.url],
    },
  };
}
