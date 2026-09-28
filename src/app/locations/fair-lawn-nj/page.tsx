import { pageMetadata } from "@/lib/seo";
import { getLocation } from "@/lib/locations";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

export const metadata = pageMetadata("/locations/fair-lawn-nj");

export default function FairLawnNjPage() {
  return <LocationPageTemplate location={getLocation("fair-lawn-nj")} />;
}
