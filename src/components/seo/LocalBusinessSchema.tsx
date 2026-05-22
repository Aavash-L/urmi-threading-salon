import { BUSINESS } from "@/lib/constants";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: BUSINESS.name,
    image: `${BUSINESS.url}/og/storefront.jpg`,
    "@id": BUSINESS.url,
    url: BUSINESS.url,
    telephone: BUSINESS.phoneRaw,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating.toString(),
      reviewCount: BUSINESS.reviewCount.toString(),
    },
    sameAs: [BUSINESS.googleMapsUrl, BUSINESS.instagram, BUSINESS.facebook],
    areaServed: BUSINESS.serviceArea.map((city) => ({
      "@type": "City",
      name: city,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Beauty Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Eyebrow Threading" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Face Threading" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Body Waxing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facials" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Eyelash Extensions" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Henna" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tinting" } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
