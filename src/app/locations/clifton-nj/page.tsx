import type { Metadata } from "next";
import { LOCATIONS } from "@/lib/locations";
import { SITE_URL } from "@/lib/constants";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

const location = LOCATIONS.find((l) => l.slug === "clifton-nj")!;

export const metadata: Metadata = {
  title: "Eyebrow Threading Near Clifton, NJ — Urmi Threading Salon",
  description:
    "Top-rated threading salon near Clifton NJ. 15 min from Clifton at 150 Hinchman Ave, Wayne NJ. 4.8 ★ Google rating · Walk-ins welcome · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/locations/clifton-nj` },
  keywords: ["eyebrow threading near Clifton NJ", "threading salon Clifton NJ", "best threading near Clifton"],
};

export default function CliftonNJPage() {
  return <LocationPageTemplate location={location} />;
}
