import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.id === "facials")!;

export const metadata: Metadata = {
  title: "Facials in Wayne, NJ — Customized Skin Treatments",
  description:
    "Customized facials at Urmi Threading Salon, Wayne NJ. Deep cleansing, hydration & glow treatments tailored to your skin type. Book now · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/services/facials` },
  keywords: service.keywords,
  openGraph: {
    title: "Facials in Wayne, NJ | Urmi Threading Salon",
    description: "Customized facial treatments for every skin type. 150 Hinchman Ave, Wayne NJ.",
    url: `${SITE_URL}/services/facials`,
  },
};

export default function FacialsPage() {
  return <ServicePageTemplate service={service} />;
}
