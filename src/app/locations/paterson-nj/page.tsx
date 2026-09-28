import type { Metadata } from "next";
import { LOCATIONS } from "@/lib/locations";
import { SITE_URL, RATING_LABEL } from "@/lib/constants";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

const location = LOCATIONS.find((l) => l.slug === "paterson-nj")!;

export const metadata: Metadata = {
  title: "Eyebrow Threading Near Paterson, NJ — Urmi Threading Salon",
  description:
    `Best eyebrow threading near Paterson NJ. Just 10 min from Paterson at 150 Hinchman Ave, Wayne NJ. ${RATING_LABEL} ★ · Walk-ins welcome · (973) 653-9322.`,
  alternates: { canonical: `${SITE_URL}/locations/paterson-nj` },
  keywords: ["eyebrow threading near Paterson NJ", "threading salon Paterson NJ", "best threading near Paterson"],
};

export default function PatersonNJPage() {
  return <LocationPageTemplate location={location} />;
}
