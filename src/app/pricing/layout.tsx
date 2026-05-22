import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Services Menu",
  description:
    "Full pricing menu for Urmi Threading Salon in Wayne, NJ. Eyebrow threading from $10, waxing, facials, lash extensions, henna & more. Walk-ins welcome.",
  alternates: { canonical: "https://www.urmithreadingsalon.com/pricing" },
  openGraph: {
    title: "Pricing & Services Menu | Urmi Threading Salon",
    description:
      "See all services and prices at Urmi Threading Salon in Wayne, NJ. Eyebrow threading, waxing, facials, lash extensions & henna.",
    url: "https://www.urmithreadingsalon.com/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
