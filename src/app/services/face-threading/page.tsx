import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.id === "face-threading")!;

export const metadata: Metadata = {
  title: "Full Face Threading Wayne NJ — Upper Lip, Chin & Sides",
  description:
    "Full face threading at Urmi Threading Salon, Wayne NJ. Upper lip, chin, cheeks & forehead. Gentle, precise, no chemicals. Walk-ins welcome · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/services/face-threading` },
  keywords: service.keywords,
  openGraph: {
    title: "Full Face Threading in Wayne, NJ | Urmi Threading Salon",
    description: "Complete facial hair removal with threading. No wax, no chemicals. Walk-in friendly at 150 Hinchman Ave, Wayne, NJ.",
    url: `${SITE_URL}/services/face-threading`,
  },
};

export default function FaceThreadingPage() {
  return <ServicePageTemplate service={service} />;
}
