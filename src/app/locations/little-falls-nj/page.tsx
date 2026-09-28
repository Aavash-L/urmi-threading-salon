import { pageMetadata } from "@/lib/seo";
import { getLocation } from "@/lib/locations";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

export const metadata = pageMetadata("/locations/little-falls-nj");

export default function LittleFallsNjPage() {
  return <LocationPageTemplate location={getLocation("little-falls-nj")} />;
}
