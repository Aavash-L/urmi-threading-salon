import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.id === "eyelash-extensions")!;

export const metadata: Metadata = {
  title: "Eyelash Extensions Wayne, NJ — Natural to Dramatic Volume",
  description:
    "Professional eyelash extensions at Urmi Threading Salon, Wayne NJ. Full sets, volumes & fills. Wake up beautiful every day. Book now · (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/services/eyelash-extensions` },
  keywords: service.keywords,
  openGraph: {
    title: "Eyelash Extensions in Wayne, NJ | Urmi Threading Salon",
    description: "Beautiful, natural-looking lash extensions. Walk-in friendly at 150 Hinchman Ave, Wayne NJ.",
    url: `${SITE_URL}/services/eyelash-extensions`,
  },
};

export default function EyelashExtensionsPage() {
  return <ServicePageTemplate service={service} />;
}
