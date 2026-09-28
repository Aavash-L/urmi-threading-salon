import { pageMetadata } from "@/lib/seo";
import { getLocation } from "@/lib/locations";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

export const metadata = pageMetadata("/locations/totowa-nj");

export default function TotowaNjPage() {
  return <LocationPageTemplate location={getLocation("totowa-nj")} />;
}
