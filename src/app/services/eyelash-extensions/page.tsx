import { pageMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export const metadata = pageMetadata("/services/eyelash-extensions");

export default function EyelashExtensionsPage() {
  return <ServicePageTemplate service={getService("eyelash-extensions")} />;
}
