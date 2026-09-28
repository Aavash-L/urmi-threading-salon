import { pageMetadata } from "@/lib/seo";
import { getLocation } from "@/lib/locations";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

export const metadata = pageMetadata("/locations/paramus-nj");

export default function ParamusNjPage() {
  return <LocationPageTemplate location={getLocation("paramus-nj")} />;
}
