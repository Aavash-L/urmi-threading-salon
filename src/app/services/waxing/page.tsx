import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.id === "waxing")!;

export const metadata: Metadata = {
  title: "Body Waxing in Wayne, NJ — Smooth, Long-Lasting Results",
  description:
    "Professional body waxing in Wayne, NJ at Urmi Threading Salon. Arms, legs, underarms & bikini waxing with premium formulas. Walk-ins welcome · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/services/waxing` },
  keywords: service.keywords,
  openGraph: {
    title: "Body Waxing in Wayne, NJ | Urmi Threading Salon",
    description: "Professional waxing for all body areas. Walk-in friendly at 150 Hinchman Ave, Wayne NJ.",
    url: `${SITE_URL}/services/waxing`,
  },
};

export default function WaxingPage() {
  return <ServicePageTemplate service={service} />;
}
