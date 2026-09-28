import { pageMetadata } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import WaxOffers from "@/components/sections/WaxOffers";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export const metadata = pageMetadata("/");

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <About />
      <WaxOffers />
      <Testimonials />
      <Booking />
      <Contact />
      <FAQ />
    </>
  );
}
