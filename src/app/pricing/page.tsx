import Link from "next/link";
import { Gift } from "lucide-react";
import { CATEGORIES, formatPrice, itemsInCategory } from "@/lib/catalog";
import { BUSINESS, SITE_URL } from "@/lib/constants";
import { PRICING_NOTE } from "@/lib/services";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import TrackedLink from "@/components/analytics/TrackedLink";
import { CallButton, CallHelper, RequestButton } from "@/components/ui/CallCta";

const serviceCategories = CATEGORIES.filter((c) => c.id !== "gift-cards");
const giftCardAmounts = itemsInCategory("gift-cards").map((g) => formatPrice(g));

export default function PricingPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Prices", url: `${SITE_URL}/pricing` }]} />

      <section className="pt-32 pb-10 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">Salon Services &amp; Prices</h1>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Explore our service menu and starting prices. Select a category below. Call {BUSINESS.phone} if you
            would like help choosing a service.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <CallButton placement="pricing_hero" />
            <RequestButton placement="pricing_hero" />
          </div>
          <CallHelper className="mt-4 max-w-xl mx-auto" />
        </div>
      </section>

      <div className="bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <nav aria-label="Price categories" className="mb-8">
            <ul className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="inline-flex items-center min-h-11 px-4 rounded-full bg-white border border-lavender-100 text-sm font-semibold text-charcoal hover:border-brand-purple-strong"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-8">
            {serviceCategories.map((c) => {
              const items = itemsInCategory(c.id);
              return (
                <section
                  key={c.id}
                  id={c.id}
                  aria-labelledby={`${c.id}-heading`}
                  className="bg-white rounded-2xl border border-lavender-100 overflow-hidden scroll-mt-32"
                >
                  <div className="px-5 sm:px-6 py-4 border-b border-lavender-100 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 id={`${c.id}-heading`} className="font-serif text-xl font-bold text-charcoal">
                      {c.label}
                    </h2>
                    {c.page && (
                      <Link
                        href={`/services/${c.page}`}
                        className="text-sm font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline"
                      >
                        About our {c.label.toLowerCase()} services
                      </Link>
                    )}
                  </div>
                  <ul className="divide-y divide-lavender-100">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3">
                        <span className="text-sm text-charcoal font-medium">{item.name}</span>
                        <span className="text-sm font-bold text-charcoal whitespace-nowrap">{formatPrice(item)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}

            <section
              id="gift-cards"
              aria-labelledby="gift-cards-heading"
              className="bg-white rounded-2xl border border-lavender-100 p-6 scroll-mt-32"
            >
              <div className="flex items-center gap-2 mb-3">
                <Gift size={20} className="text-brand-purple-strong" aria-hidden="true" />
                <h2 id="gift-cards-heading" className="font-serif text-xl font-bold text-charcoal">
                  Ask About Gift Cards
                </h2>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Gift cards are listed in {giftCardAmounts.slice(0, -1).join(", ")}, and {giftCardAmounts.at(-1)} amounts.
                Call {BUSINESS.phone} to ask about purchase and redemption.
              </p>
              <TrackedLink
                href={`tel:${BUSINESS.phoneRaw}`}
                event="call_click"
                placement="pricing_gift_cards"
                className="mt-4 inline-flex items-center justify-center bg-brand-gradient text-white font-semibold px-6 min-h-11 rounded-full hover:opacity-95"
              >
                Call About Gift Cards
              </TrackedLink>
            </section>
          </div>

          <p className="text-center text-sm text-gray-700 mt-8">{PRICING_NOTE}</p>
        </div>
      </div>
    </>
  );
}
