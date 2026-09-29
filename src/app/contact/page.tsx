import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — Urmi Threading Salon, 150 Hinchman Ave, Wayne NJ",
  description:
    "Contact Urmi Threading Salon in Wayne, NJ. Address: 150 Hinchman Ave, Wayne NJ 07470. Phone: (973) 653-9322. Hours: Mon–Sat 10 AM–6/7 PM.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Contact", url: `${SITE_URL}/contact` }]} />

      <section className="pt-32 pb-10 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-purple mb-3">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            We&apos;re located at 150 Hinchman Ave, Wayne, NJ 07470. Walk-ins always welcome.
          </p>
        </div>
      </section>

      <Contact />
    </>
  );
}
