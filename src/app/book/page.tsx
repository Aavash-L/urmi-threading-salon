import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Booking from "@/components/sections/Booking";

export const metadata: Metadata = {
  title: "Book an Appointment — Urmi Threading Salon Wayne NJ",
  description:
    "Book your threading, waxing, facial, or lash appointment at Urmi Threading Salon in Wayne, NJ. Online booking or call (973) 653-9322. Walk-ins also welcome.",
  alternates: { canonical: `${SITE_URL}/book` },
};

export default function BookPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Book Appointment", url: `${SITE_URL}/book` }]} />

      <section className="pt-32 pb-10 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-purple mb-3">Reserve Your Spot</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Book an Appointment</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Fill out the form below and we&apos;ll confirm your appointment within 1 hour during business hours.
          </p>
        </div>
      </section>

      <Booking />
    </>
  );
}
