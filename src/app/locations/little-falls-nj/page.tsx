import type { Metadata } from "next";
import { LOCATIONS } from "@/lib/locations";
import { SITE_URL } from "@/lib/constants";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

const location = LOCATIONS.find((l) => l.slug === "little-falls-nj")!;

export const metadata: Metadata = {
  title: "Eyebrow Threading Near Little Falls, NJ — Urmi Threading Salon",
  description:
    "Best eyebrow threading near Little Falls NJ. 10 min drive to Urmi Threading Salon at 150 Hinchman Ave, Wayne NJ. Walk-ins welcome · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/locations/little-falls-nj` },
  keywords: ["eyebrow threading near Little Falls NJ", "threading salon Little Falls NJ", "beauty salon near Little Falls"],
};

export default function LittleFallsNJPage() {
  return <LocationPageTemplate location={location} />;
}
