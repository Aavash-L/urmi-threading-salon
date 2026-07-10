import type { Metadata } from "next";
import { LOCATIONS } from "@/lib/locations";
import { SITE_URL } from "@/lib/constants";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

const location = LOCATIONS.find((l) => l.slug === "paramus-nj")!;

export const metadata: Metadata = {
  title: "Eyebrow Threading Near Paramus, NJ — Urmi Threading Salon",
  description:
    "Premium threading salon serving Paramus NJ clients. 20 min to Urmi Threading Salon at 150 Hinchman Ave, Wayne NJ. 4.8 ★ · Walk-ins welcome · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/locations/paramus-nj` },
  keywords: ["eyebrow threading near Paramus NJ", "threading salon Paramus NJ", "beauty salon near Paramus"],
};

export default function ParamusNJPage() {
  return <LocationPageTemplate location={location} />;
}
