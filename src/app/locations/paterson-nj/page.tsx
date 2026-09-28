import { pageMetadata } from "@/lib/seo";
import { getLocation } from "@/lib/locations";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

export const metadata = pageMetadata("/locations/paterson-nj");

export default function PatersonNjPage() {
  return <LocationPageTemplate location={getLocation("paterson-nj")} />;
}
