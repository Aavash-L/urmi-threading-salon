import { price } from "@/lib/catalog";

// Offer eligibility, benefit, dates and stacking rules live here and nowhere else.
//
// The salon operator described these offers on 2026-09-28, but eligibility details,
// start/end dates, and whether offers combine (including with the 15% new-customer
// offer) have not been confirmed. While `termsVerified` is false the site shows only
// the generic "Ask about current salon offers" message, so no conflicting numbers
// are published. Fill in the missing fields and set `termsVerified: true` to show them.

export interface Offer {
  id: string;
  title: string;
  catalogId?: string;
  discount: { type: "amount"; value: number } | { type: "percent"; value: number };
  eligibility: string;
  startDate: string | null;
  endDate: string | null;
}

export const OFFERS = {
  termsVerified: false,
  /** Whether offers can be combined. null = unknown. */
  stacking: null as "none" | "allowed" | null,
  items: [
    {
      id: "new-customer-15",
      title: "15% off for new customers",
      discount: { type: "percent", value: 15 },
      eligibility: "New customers (details unconfirmed)",
      startDate: null,
      endDate: null,
    },
    {
      id: "first-brazilian-10",
      title: "$10 off your first Brazilian wax",
      catalogId: "brazilian-wax",
      discount: { type: "amount", value: 10 },
      eligibility: "First-time Brazilian wax clients",
      startDate: null,
      endDate: null,
    },
    {
      id: "full-body-wax-20",
      title: "$20 off Full Body Wax",
      catalogId: "full-body-wax",
      discount: { type: "amount", value: 20 },
      eligibility: "Unconfirmed",
      startDate: null,
      endDate: null,
    },
  ] satisfies Offer[],
} as const;

export const OFFERS_FALLBACK = {
  text: "Ask about current salon offers.",
  cta: "Call About Offers",
  loyalty: "Ask about our loyalty cards on your next visit.",
} as const;

export function offerPrice(offer: Offer): { was: number; now: number } | null {
  if (!offer.catalogId || offer.discount.type !== "amount") return null;
  const was = price(offer.catalogId);
  return { was, now: was - offer.discount.value };
}
