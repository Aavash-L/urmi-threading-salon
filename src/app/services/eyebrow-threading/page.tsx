import { pageMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export const metadata = pageMetadata("/services/eyebrow-threading");

export default function EyebrowThreadingPage() {
  return <ServicePageTemplate service={getService("eyebrow-threading")} />;
}
