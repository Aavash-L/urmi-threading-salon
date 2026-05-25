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

      <Booking />
    </>
  );
}
