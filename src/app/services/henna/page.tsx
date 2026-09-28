import { pageMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export const metadata = pageMetadata("/services/henna");

export default function HennaPage() {
  return <ServicePageTemplate service={getService("henna")} />;
}
