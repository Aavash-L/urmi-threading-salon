import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.id === "tinting")!;

export const metadata: Metadata = {
  title: "Lash & Brow Tinting Wayne NJ — Defined Brows Without Makeup",
  description:
    "Lash and brow tinting at Urmi Threading Salon, Wayne NJ. Darker, fuller-looking results lasting 4–6 weeks. Walk-ins welcome · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/services/tinting` },
  keywords: service.keywords,
  openGraph: {
    title: "Lash & Brow Tinting in Wayne, NJ | Urmi Threading Salon",
    description: "Semi-permanent lash and brow tinting. Walk-in friendly at 150 Hinchman Ave, Wayne NJ.",
    url: `${SITE_URL}/services/tinting`,
  },
};

export default function TintingPage() {
  return <ServicePageTemplate service={service} />;
}
