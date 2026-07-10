import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.id === "eyebrow-threading")!;

export const metadata: Metadata = {
  title: "Eyebrow Threading in Wayne, NJ — Precision Brow Shaping",
  description:
    "Expert eyebrow threading in Wayne, NJ at Urmi Threading Salon. 15+ years of precision brow shaping. Walk-ins welcome · 4.8 ★ · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/services/eyebrow-threading` },
  keywords: service.keywords,
  openGraph: {
    title: "Eyebrow Threading in Wayne, NJ | Urmi Threading Salon",
    description: "Precision eyebrow threading by experts with 15+ years experience. Walk-ins welcome at 150 Hinchman Ave, Wayne, NJ.",
    url: `${SITE_URL}/services/eyebrow-threading`,
  },
};

export default function EyebrowThreadingPage() {
  return <ServicePageTemplate service={service} />;
}
