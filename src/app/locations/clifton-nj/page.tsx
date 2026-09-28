import { pageMetadata } from "@/lib/seo";
import { getLocation } from "@/lib/locations";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

export const metadata = pageMetadata("/locations/clifton-nj");

export default function CliftonNjPage() {
  return <LocationPageTemplate location={getLocation("clifton-nj")} />;
}
