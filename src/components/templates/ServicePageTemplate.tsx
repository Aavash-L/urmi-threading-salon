import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRICING_NOTE, bookingHref, type Service, type ServiceSection } from "@/lib/services";
import { formatPrice, getCatalogItem } from "@/lib/catalog";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import WaxOffers from "@/components/sections/WaxOffers";
import LinkedText from "@/components/ui/LinkedText";
import { CallButton, CallHelper, RequestButton, WalkInsNote } from "@/components/ui/CallCta";

function Section({ section, tone }: { section: ServiceSection; tone: "white" | "lavender" }) {
  return (
    <section className={`py-12 sm:py-16 ${tone === "white" ? "bg-white" : "bg-lavender-50"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4">{section.heading}</h2>
        <p className="text-gray-700 leading-relaxed text-base">
          <LinkedText text={section.body} links={section.links} />
        </p>
      </div>
    </section>
  );
}

export default function ServicePageTemplate({ service }: { service: Service }) {
  const serviceUrl = `${SITE_URL}/services/${service.slug}`;
  const priceItems = service.priceItemIds.map((id) => {
    const item = getCatalogItem(id);
    if (!item) throw new Error(`Unknown catalog id ${id} on ${service.slug}`);
    return item;
  });
  const summary = service.priceSummary
    ? [
        ...service.priceSummary.ids.map((id) => {
          const item = getCatalogItem(id)!;
          return `${item.name} from ${formatPrice(item)}.`;
        }),
        service.priceSummary.tail,
      ].join(" ")
    : null;
  const requestHref = bookingHref(service.booking);

  return (
    <>
      <ServiceSchema name={service.name} description={service.intro} url={serviceUrl} />
      <BreadcrumbSchema
        items={[
          { name: "Services", url: `${SITE_URL}/services` },
          { name: service.name, url: serviceUrl },
        ]}
      />
      <FAQSchema faqs={service.faqs} />

      <section className="pt-32 pb-12 sm:pb-16 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-700 mb-4" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="underline underline-offset-2 hover:no-underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="underline underline-offset-2 hover:no-underline">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-charcoal">{service.name}</li>
            </ol>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">{service.h1}</h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl">{service.intro}</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
            <CallButton placement={`service_${service.slug}_hero`} />
            <RequestButton href={requestHref} placement={`service_${service.slug}_hero`} />
          </div>
          <CallHelper className="mt-4 max-w-2xl" />
          <WalkInsNote className="mt-2" />
        </div>
      </section>

      {service.slug === "waxing" && <WaxOffers />}

      <Section section={service.about} tone="white" />

      <section className="py-12 sm:py-16 bg-lavender-50" aria-labelledby="prices-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="prices-heading" className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4">
            {service.priceHeading}
          </h2>
          {summary && <p className="text-gray-700 leading-relaxed mb-6">{summary}</p>}
          <ul className="bg-white rounded-2xl border border-lavender-100 divide-y divide-lavender-100">
            {priceItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <span className="text-charcoal font-medium">{item.name}</span>
                <span className="font-bold text-charcoal whitespace-nowrap">
                  {item.price == null ? "Quote" : `from ${formatPrice(item)}`}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-700 mt-4">{service.priceNote ?? PRICING_NOTE}</p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 mt-3 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11"
          >
            View the full salon price menu <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {service.extraSections?.map((s, i) => (
        <Section key={s.heading} section={s} tone={i % 2 === 0 ? "white" : "lavender"} />
      ))}

      <Section
        section={service.beforeVisit}
        tone={(service.extraSections?.length ?? 0) % 2 === 0 ? "white" : "lavender"}
      />

      <section className="py-12 sm:py-16 bg-lavender-50" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-6">
            {service.faqHeading}
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl p-6 border border-lavender-100">
                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">Related Pages</h2>
          <ul className="space-y-2">
            {service.related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="inline-flex items-center gap-1.5 font-medium text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11"
                >
                  {r.text} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-brand-gradient text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Questions About {service.name}?</h2>
          <p className="mb-8">
            Visit us at 150 Hinchman Ave, Wayne, NJ. Walk-ins are welcome during salon hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CallButton placement={`service_${service.slug}_footer`} onDark />
            <RequestButton href={requestHref} placement={`service_${service.slug}_footer`} onDark />
          </div>
        </div>
      </section>
    </>
  );
}
