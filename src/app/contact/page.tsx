import { SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Contact from "@/components/sections/Contact";
import { CallButton, CallHelper, DirectionsLink, RequestButton } from "@/components/ui/CallCta";

export const metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Contact", url: `${SITE_URL}/contact` }]} />

      <section className="pt-32 pb-10 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Contact Urmi Threading Salon</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Visit us at 150 Hinchman Ave, Wayne, NJ 07470. Check the hours below, get directions, or call
            (973) 653-9322 before your visit.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <CallButton placement="contact_hero" />
            <RequestButton placement="contact_hero" />
          </div>
          <CallHelper className="mt-4 max-w-xl mx-auto" />
          <DirectionsLink placement="contact_hero" className="mt-2" />
        </div>
      </section>

      <Contact />
    </>
  );
}
