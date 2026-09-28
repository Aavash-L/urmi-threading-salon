import { BUSINESS } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";

// Every item must be a real, indexable URL (no /locations index page exists).
export default function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.url },
          ...items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 2,
            name: item.name,
            item: item.url,
          })),
        ],
      }}
    />
  );
}
