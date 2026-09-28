import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { ONE_LOCATION_NOTE, locationFaqs, type Location } from "@/lib/locations";
import { BUSINESS, SITE_URL } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { formatPrice, getCatalogItem } from "@/lib/catalog";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import HoursTable from "@/components/ui/HoursTable";
import TrackedLink from "@/components/analytics/TrackedLink";
import { CallButton, CallHelper, RequestButton } from "@/components/ui/CallCta";

// Starting price shown next to each service where the menu has a single headline price.
const HEADLINE_PRICE: Record<string, string | undefined> = {
  "eyebrow-threading": "eyebrow-threading",
  "face-threading": "full-face-threading",
  facials: "mini-facial",
  "eyelash-extensions": "eyelash-extensions",
  tinting: "eyebrow-tinting",
};

export default function LocationPageTemplate({ location }: { location: Location }) {
  const url = `${SITE_URL}/locations/${location.slug}`;
  const faqs = locationFaqs(location);

  return (
    <>
      <BreadcrumbSchema items={[{ name: location.h1, url }]} />
      <FAQSchema faqs={faqs} />

      <section className="pt-32 pb-12 sm:pb-16 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">{location.h1}</h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl">{location.intro}</p>
          {!location.isSalonTown && (
            <p className="mt-4 inline-flex items-start gap-2 bg-white border border-lavender-100 rounded-xl px-4 py-3 text-charcoal font-medium">
              <MapPin size={18} className="text-brand-purple-strong shrink-0 mt-0.5" aria-hidden="true" />
              {ONE_LOCATION_NOTE}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <CallButton placement={`location_${location.slug}_hero`} />
            <RequestButton placement={`location_${location.slug}_hero`} />
          </div>
          <CallHelper className="mt-4 max-w-2xl" />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white" aria-labelledby="route-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="route-heading" className="font-serif text-3xl font-bold text-charcoal mb-4">Plan Your Route</h2>
          <p className="text-gray-700 leading-relaxed">
            Travel time depends on your starting point and traffic. Open Google Maps for a current route to our
            Wayne salon.
          </p>
          <address className="not-italic mt-4 text-charcoal font-medium">{BUSINESS.address.full}</address>
          <TrackedLink
            href={BUSINESS.directionsUrl}
            event="directions_click"
            placement={`location_${location.slug}`}
            external
            className="mt-5 inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-6 min-h-11 rounded-full hover:opacity-95"
          >
            <MapPin size={16} aria-hidden="true" />
            Get Directions to Our Wayne Salon
          </TrackedLink>
          <div className="mt-8 rounded-2xl overflow-hidden border border-lavender-100">
            <iframe
              src={BUSINESS.mapEmbedUrl}
              className="w-full h-64 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${BUSINESS.name} at ${BUSINESS.address.full}`}
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-lavender-50" aria-labelledby="loc-services-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="loc-services-heading" className="font-serif text-3xl font-bold text-charcoal mb-6">
            Services at Our Wayne Salon
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES.map((service) => {
              const priceId = HEADLINE_PRICE[service.slug];
              const item = priceId ? getCatalogItem(priceId) : undefined;
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center justify-between gap-3 bg-white rounded-xl p-4 border border-lavender-100 hover:border-brand-purple-strong min-h-11"
                  >
                    <span className="font-medium text-charcoal">
                      {service.name}
                      {item && <span className="block text-sm font-normal text-gray-700">from {formatPrice(item)}</span>}
                    </span>
                    <ArrowRight size={14} className="text-brand-purple-strong shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-6">
            <Link href="/pricing" className="font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline">
              View the full salon price menu
            </Link>
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="min-w-0">
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">Salon Hours</h2>
            <HoursTable />
            <p className="text-sm text-gray-700 mt-3">Walk-ins are welcome during salon hours.</p>
          </div>
          <div className="min-w-0">
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">Common Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-semibold text-charcoal mb-1">{faq.question}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {location.isSalonTown && (
        <section className="py-12 bg-lavender-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">Eyebrow Threading in Wayne</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/eyebrow-threading-wayne-nj" className="inline-flex items-center gap-1.5 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11">
                  Eyebrow threading in Wayne: prices and walk-ins <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/services/eyebrow-threading" className="inline-flex items-center gap-1.5 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11">
                  Eyebrow threading service details <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
