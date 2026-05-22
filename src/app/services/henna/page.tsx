import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.id === "henna")!;

export const metadata: Metadata = {
  title: "Henna & Mehndi in Wayne, NJ — Natural Henna Art",
  description:
    "100% natural henna art at Urmi Threading Salon, Wayne NJ. Weddings, Eid, Diwali & events. Intricate designs, deep color. Call (973) 653-9322 to book.",
  alternates: { canonical: `${SITE_URL}/services/henna` },
  keywords: service.keywords,
  openGraph: {
    title: "Henna & Mehndi in Wayne, NJ | Urmi Threading Salon",
    description: "Natural henna art for weddings and celebrations. 150 Hinchman Ave, Wayne NJ.",
    url: `${SITE_URL}/services/henna`,
  },
};

export default function HennaPage() {
  return <ServicePageTemplate service={service} />;
}
