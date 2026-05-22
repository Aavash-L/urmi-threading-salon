import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Offers from "@/components/sections/Offers";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import ThreadingDifference from "@/components/sections/ThreadingDifference";
import Testimonials from "@/components/sections/Testimonials";
import LoyaltyCard from "@/components/sections/LoyaltyCard";
import Booking from "@/components/sections/Booking";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Eyebrow Threading Salon in Wayne, NJ",
  description:
    "Wayne NJ's most trusted threading salon since 2010. Walk-in eyebrow threading, waxing, facials, lash extensions & henna. 4.7 ★ · (973) 653-9322.",
  alternates: { canonical: SITE_URL },
  keywords: [
    "threading salon Wayne NJ",
    "eyebrow threading near me",
    "best eyebrow threading Wayne NJ",
    "eyebrow salon Wayne NJ",
  ],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Offers />
      <Services />
      <About />
      <ThreadingDifference />
      <Testimonials />
      <LoyaltyCard />
      <Booking />
      <FAQ />
      <Contact />
    </>
  );
}
