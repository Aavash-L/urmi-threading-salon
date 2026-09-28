import { pageMetadata } from "@/lib/seo";
import { getLocation } from "@/lib/locations";
import LocationPageTemplate from "@/components/templates/LocationPageTemplate";

export const metadata = pageMetadata("/locations/wayne-nj");

export default function WayneNjPage() {
  return <LocationPageTemplate location={getLocation("wayne-nj")} />;
}
