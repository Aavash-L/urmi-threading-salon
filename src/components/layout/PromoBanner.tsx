import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { OFFERS_FALLBACK } from "@/lib/offers";
import TrackedLink from "@/components/analytics/TrackedLink";

// Static top bar. Specific discounts stay off the site until their terms are
// confirmed in src/lib/offers.ts.
export default function PromoBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-10 bg-brand-gradient text-white flex items-center justify-center px-4">
      <TrackedLink
        href={`tel:${BUSINESS.phoneRaw}`}
        event="call_click"
        placement="promo_bar"
        className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-center underline-offset-4 hover:underline min-h-10"
      >
        <Phone size={13} aria-hidden="true" className="shrink-0" />
        <span>
          {OFFERS_FALLBACK.text} Call {BUSINESS.phone}
        </span>
      </TrackedLink>
    </div>
  );
}
