import { pageMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export const metadata = pageMetadata("/services/face-threading");

export default function FaceThreadingPage() {
  return <ServicePageTemplate service={getService("face-threading")} />;
}
