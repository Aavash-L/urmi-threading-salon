import { pageMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export const metadata = pageMetadata("/services/facials");

export default function FacialsPage() {
  return <ServicePageTemplate service={getService("facials")} />;
}
