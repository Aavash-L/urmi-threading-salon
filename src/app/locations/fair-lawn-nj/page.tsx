import type { Metadata } from "next";
import { LOCATIONS } from "@/lib/locations";
import { SITE_URL } from "@/lib/constants";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

const location = LOCATIONS.find((l) => l.slug === "fair-lawn-nj")!;

export const metadata: Metadata = {
  title: "Eyebrow Threading Near Fair Lawn, NJ — Urmi Threading Salon",
  description:
    "Top threading salon serving Fair Lawn NJ. 20 min drive to Urmi Threading Salon at 150 Hinchman Ave Wayne NJ. 4.7 ★ · Walk-ins welcome · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/locations/fair-lawn-nj` },
  keywords: ["eyebrow threading near Fair Lawn NJ", "threading salon Fair Lawn NJ", "best threading near Fair Lawn"],
};

export default function FairLawnNJPage() {
  return <LocationPageTemplate location={location} />;
}
