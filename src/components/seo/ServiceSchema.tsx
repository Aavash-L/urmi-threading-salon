import { BUSINESS } from "@/lib/constants";

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
}

export default function ServiceSchema({ name, description, url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "BeautySalon",
      name: BUSINESS.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address.street,
        addressLocality: BUSINESS.address.city,
        addressRegion: BUSINESS.address.state,
        postalCode: BUSINESS.address.zip,
        addressCountry: "US",
      },
      telephone: BUSINESS.phoneRaw,
    },
    areaServed: {
      "@type": "City",
      name: "Wayne",
      containedInPlace: {
        "@type": "State",
        name: "New Jersey",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
