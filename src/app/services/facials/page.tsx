import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.id === "facials")!;

export const metadata: Metadata = {
  title: "Facial Threading in Wayne, NJ — Chemical-Free Hair Removal",
  description:
    "Facial threading at Urmi Threading Salon, Wayne NJ. Ancient cotton-thread technique removes peach fuzz & facial hair with zero chemicals or irritation. Book now · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/services/facials` },
  keywords: service.keywords,
  openGraph: {
    title: "Facial Threading in Wayne, NJ | Urmi Threading Salon",
    description: "Chemical-free facial hair removal using twisted cotton thread. Perfect for sensitive skin. 150 Hinchman Ave, Wayne NJ.",
    url: `${SITE_URL}/services/facials`,
  },
};

export default function FacialsPage() {
  return <ServicePageTemplate service={service} />;
}
