import type { Metadata } from "next";
import { LOCATIONS } from "@/lib/locations";
import { SITE_URL } from "@/lib/constants";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

const location = LOCATIONS.find((l) => l.slug === "totowa-nj")!;

export const metadata: Metadata = {
  title: "Eyebrow Threading Near Totowa, NJ — Urmi Threading Salon",
  description:
    "Eyebrow threading just 3 miles from Totowa NJ. Precision threading at Urmi Salon, 150 Hinchman Ave Wayne. Walk-ins welcome · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/locations/totowa-nj` },
  keywords: ["eyebrow threading near Totowa NJ", "threading salon Totowa NJ", "best threading near Totowa"],
};

export default function TotowaNJPage() {
  return <LocationPageTemplate location={location} />;
}
