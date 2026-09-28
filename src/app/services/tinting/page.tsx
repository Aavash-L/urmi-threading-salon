import { pageMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export const metadata = pageMetadata("/services/tinting");

export default function TintingPage() {
  return <ServicePageTemplate service={getService("tinting")} />;
}
