import type { Metadata } from "next";
import { LOCATIONS } from "@/lib/locations";
import { SITE_URL } from "@/lib/constants";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

const location = LOCATIONS.find((l) => l.slug === "wayne-nj")!;

export const metadata: Metadata = {
  title: "Eyebrow Threading in Wayne, NJ — Urmi Threading Salon",
  description:
    "Top-rated threading salon in Wayne, NJ since 2010. Eyebrow threading, waxing, facials & more at 150 Hinchman Ave. Walk-ins welcome · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/locations/wayne-nj` },
  keywords: ["threading salon Wayne NJ", "eyebrow threading Wayne NJ", "beauty salon Wayne NJ"],
};

export default function WayneNJPage() {
  return <LocationPageTemplate location={location} />;
}
