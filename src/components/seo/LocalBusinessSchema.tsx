import { BUSINESS, WEEKLY_HOURS } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import JsonLd from "@/components/seo/JsonLd";

// The one BeautySalon entity for the site, rendered once from the root layout.
// Deliberately omitted until verified: foundingDate, geo coordinates,
// aggregateRating/review, priceRange and offer dates.

const DAY_URI = [
  "https://schema.org/Sunday",
  "https://schema.org/Monday",
  "https://schema.org/Tuesday",
  "https://schema.org/Wednesday",
  "https://schema.org/Thursday",
  "https://schema.org/Friday",
  "https://schema.org/Saturday",
];

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": BUSINESS.url,
    name: BUSINESS.name,
    url: BUSINESS.url,
    description:
      "Family-owned threading and beauty salon in Wayne, New Jersey, offering threading, waxing, facials, eyelash extensions, henna, and tinting.",
    telephone: BUSINESS.phoneRaw,
    image: `${BUSINESS.url}/og/storefront.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: "US",
    },
    hasMap: BUSINESS.mapUrl,
    openingHoursSpecification: WEEKLY_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.length === 1 ? DAY_URI[h.days[0]] : h.days.map((d) => DAY_URI[d]),
      opens: h.open,
      closes: h.close,
    })),
    sameAs: [BUSINESS.instagram, BUSINESS.facebook],
    areaServed: BUSINESS.serviceArea.map((city) => ({ "@type": "City", name: `${city}, New Jersey` })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Salon Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${BUSINESS.url}/services/${s.slug}`,
          provider: { "@id": BUSINESS.url },
        },
      })),
    },
  };
}

export default function LocalBusinessSchema() {
  return <JsonLd data={businessSchema()} />;
}
