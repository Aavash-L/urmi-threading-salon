import { BUSINESS } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";

// Page-specific Service entity. The provider references the single BeautySalon
// entity (emitted once in the root layout) by @id instead of redefining it.
export default function ServiceSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url,
        provider: { "@id": BUSINESS.url },
        areaServed: { "@type": "City", name: "Wayne, New Jersey" },
      }}
    />
  );
}
