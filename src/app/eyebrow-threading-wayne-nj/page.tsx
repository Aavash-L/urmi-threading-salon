import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BUSINESS, SITE_URL } from "@/lib/constants";
import { formatPrice, getCatalogItem } from "@/lib/catalog";
import { LOCATIONS } from "@/lib/locations";
import { heroImage } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { PRICING_NOTE } from "@/lib/services";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import HoursTable from "@/components/ui/HoursTable";
import { CallButton, CallHelper, DirectionsLink, RequestButton, WalkInsNote } from "@/components/ui/CallCta";

export const metadata = pageMetadata("/eyebrow-threading-wayne-nj");

// Role: local commercial landing page. Detailed service info lives at
// /services/eyebrow-threading; practical visiting info at /locations/wayne-nj.

const PAGE_URL = `${SITE_URL}/eyebrow-threading-wayne-nj`;
const INTRO =
  "Looking for eyebrow threading in Wayne? Visit Urmi Threading Salon at 150 Hinchman Ave. Eyebrow threading starts at $10, and walk-ins are welcome during salon hours.";

const priceIds = ["eyebrow-threading", "mens-eyebrow-threading", "eye-lip-threading", "eyebrow-tinting"];

const faqs = [
  {
    question: "How much is eyebrow threading in Wayne?",
    answer: `Eyebrow threading at Urmi Threading Salon starts at ${formatPrice(getCatalogItem("eyebrow-threading")!)}. Call ${BUSINESS.phone} to confirm the price for your service.`,
  },
  {
    question: "Do you take walk-ins for eyebrow threading?",
    answer:
      "Yes. Walk-ins are welcome during salon hours. You can also send an appointment request; your requested time is confirmed only after the salon confirms it.",
  },
  {
    question: "Where is the salon?",
    answer: `We have one salon location: ${BUSINESS.address.full}.`,
  },
];

export default function EyebrowThreadingWayneNJ() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Eyebrow Threading in Wayne, NJ", url: PAGE_URL }]} />
      <ServiceSchema name="Eyebrow Threading" description={INTRO} url={PAGE_URL} />
      <FAQSchema faqs={faqs} />

      <section className="bg-blush-50 pt-32 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 min-w-0">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal leading-tight">
              Eyebrow Threading in Wayne, NJ
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">{INTRO}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <CallButton placement="landing_hero" />
              <RequestButton href="/book?service=eyebrow-threading" placement="landing_hero" />
            </div>
            <CallHelper />
            <WalkInsNote />
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white" aria-labelledby="visit-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="visit-heading" className="font-serif text-3xl font-bold text-charcoal mb-4">
            Prices, Hours &amp; Your Visit
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            Check the current menu and salon hours before you visit. Call {BUSINESS.phone} for availability, or send
            an appointment request. Your requested time is confirmed only after the salon confirms it.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-lavender-50 rounded-2xl p-6 min-w-0">
              <h3 className="font-semibold text-charcoal mb-3">Brow Prices</h3>
              <ul className="divide-y divide-lavender-100">
                {priceIds.map((id) => {
                  const item = getCatalogItem(id)!;
                  return (
                    <li key={id} className="flex justify-between gap-4 py-2 text-sm">
                      <span className="text-charcoal">{item.name}</span>
                      <span className="font-bold text-charcoal">from {formatPrice(item)}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="text-sm text-gray-700 mt-3">{PRICING_NOTE}</p>
            </div>
            <div className="bg-lavender-50 rounded-2xl p-6 min-w-0">
              <h3 className="font-semibold text-charcoal mb-3">Salon Hours</h3>
              <HoursTable />
              <address className="not-italic text-sm text-gray-700 mt-4">{BUSINESS.address.full}</address>
              <DirectionsLink placement="landing_visit" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-lavender-50" aria-labelledby="landing-faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="landing-faq-heading" className="font-serif text-3xl font-bold text-charcoal mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl p-6 border border-lavender-100">
                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">More About Eyebrow Threading</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/services/eyebrow-threading" className="inline-flex items-center gap-1.5 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11">
                  Eyebrow threading service details and prices <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/locations/wayne-nj" className="inline-flex items-center gap-1.5 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11">
                  Plan your visit to our Wayne salon <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="inline-flex items-center gap-1.5 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11">
                  Full salon price menu <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">Visiting From a Nearby Town?</h2>
            <ul className="space-y-1">
              {LOCATIONS.filter((l) => l.slug !== "wayne-nj").map((l) => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="inline-flex items-center font-medium text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11">
                    Visiting from {l.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
