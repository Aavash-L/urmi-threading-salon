import { pageMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export const metadata = pageMetadata("/services/waxing");

export default function WaxingPage() {
  return <ServicePageTemplate service={getService("waxing")} />;
}
