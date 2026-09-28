import { Gift, Tag } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { OFFERS, OFFERS_FALLBACK, offerPrice, type Offer } from "@/lib/offers";
import TrackedLink from "@/components/analytics/TrackedLink";

function CallAboutOffers({ placement }: { placement: string }) {
  return (
    <TrackedLink
      href={`tel:${BUSINESS.phoneRaw}`}
      event="call_click"
      placement={placement}
      className="inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-6 py-3 rounded-full min-h-11 hover:opacity-95"
    >
      {OFFERS_FALLBACK.cta}
    </TrackedLink>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  const p = offerPrice(offer);
  return (
    <li className="bg-white rounded-2xl border border-lavender-100 p-6">
      <p className="font-serif text-2xl font-bold text-charcoal">{offer.title}</p>
      {p && (
        <p className="mt-2 text-charcoal">
          <span className="line-through text-gray-700">${p.was}</span>{" "}
          <span className="font-bold">${p.now}</span>
        </p>
      )}
      <p className="mt-2 text-sm text-gray-700">Who qualifies: {offer.eligibility}</p>
      {offer.endDate && <p className="text-sm text-gray-700">Ends {offer.endDate}</p>}
    </li>
  );
}

// Offers + loyalty. Until offer terms are verified this renders only the generic
// prompt to call, never specific discounts.
export default function WaxOffers() {
  return (
    <section id="offers" className="py-12 sm:py-16 bg-blush-50" aria-labelledby="offers-heading">
      <div id="loyalty" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="offers-heading" className="font-serif text-3xl font-bold text-charcoal">
          Offers &amp; Loyalty Cards
        </h2>

        {OFFERS.termsVerified ? (
          <>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {OFFERS.items.map((o) => (
                <OfferCard key={o.id} offer={o} />
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-700">
              {OFFERS.stacking === "none"
                ? "One offer per visit."
                : OFFERS.stacking === "allowed"
                ? "Offers can be combined."
                : "Ask the salon whether offers can be combined."}
            </p>
          </>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-lavender-100 p-6 flex gap-4">
              <Tag size={22} className="text-brand-purple-strong shrink-0 mt-1" aria-hidden="true" />
              <p className="text-lg text-charcoal">{OFFERS_FALLBACK.text}</p>
            </div>
            <div className="bg-white rounded-2xl border border-lavender-100 p-6 flex gap-4">
              <Gift size={22} className="text-brand-purple-strong shrink-0 mt-1" aria-hidden="true" />
              <p className="text-lg text-charcoal">{OFFERS_FALLBACK.loyalty}</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <CallAboutOffers placement="offers" />
          <p className="text-sm text-gray-700">
            {BUSINESS.phone}
          </p>
        </div>
      </div>
    </section>
  );
}
