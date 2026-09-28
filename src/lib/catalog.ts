// Shared service catalog. Pricing, service pages, booking options and server-side
// booking validation all read from this list, so a price or bookability change
// happens in exactly one place.
//
// Prices are the salon's published starting prices. `duration` is a scheduling
// estimate in minutes used to lay out preferred-time slots; durations have not
// been confirmed by the owner (see docs/local-search-handoff.md).

export type CategoryId = "threading" | "waxing" | "facials" | "lash-brow" | "henna" | "gift-cards";

export type ServicePageSlug =
  | "eyebrow-threading"
  | "face-threading"
  | "waxing"
  | "facials"
  | "eyelash-extensions"
  | "henna"
  | "tinting";

export interface CatalogItem {
  id: string;
  name: string;
  category: CategoryId;
  /** Starting price in USD, or null when the price is quoted per design. */
  price: number | null;
  duration: number;
  /** Service detail page that covers this item. */
  page?: ServicePageSlug;
  /** true: can be chosen in the online appointment request form. */
  bookable: boolean;
}

export const CATEGORIES: { id: CategoryId; label: string; page?: ServicePageSlug }[] = [
  { id: "threading", label: "Threading" },
  { id: "waxing", label: "Waxing", page: "waxing" },
  { id: "facials", label: "Facials", page: "facials" },
  { id: "lash-brow", label: "Lash & Brow" },
  { id: "henna", label: "Henna", page: "henna" },
  { id: "gift-cards", label: "Gift Cards" },
];

const t = (id: string, name: string, price: number, duration: number, page: ServicePageSlug = "face-threading"): CatalogItem =>
  ({ id, name, category: "threading", price, duration, page, bookable: true });
const w = (id: string, name: string, price: number, duration: number): CatalogItem =>
  ({ id, name, category: "waxing", price, duration, page: "waxing", bookable: true });
const f = (id: string, name: string, price: number, duration: number): CatalogItem =>
  ({ id, name, category: "facials", price, duration, page: "facials", bookable: true });

export const CATALOG: readonly CatalogItem[] = [
  t("eyebrow-threading", "Eyebrow Threading", 10, 15, "eyebrow-threading"),
  t("mens-eyebrow-threading", "Men's Eyebrow", 10, 15, "eyebrow-threading"),
  t("upper-lip-threading", "Upper Lip", 6, 5),
  t("lower-lip-threading", "Lower Lip", 3, 5),
  t("chin-threading", "Chin", 7, 10),
  t("forehead-threading", "Forehead", 7, 10),
  t("side-threading", "Side Threading", 12, 15),
  t("neck-threading", "Neck Threading", 6, 10),
  t("cheek-threading", "Cheek Threading", 6, 10),
  t("eye-lip-threading", "Eye & Lip", 16, 20),
  t("eye-lip-chin-threading", "Eye, Lip & Chin", 23, 25),
  t("eye-lip-chin-neck-threading", "Eye, Lip, Chin & Neck", 27, 30),
  t("full-face-threading", "Full Face", 35, 30),
  t("full-face-neck-threading", "Full Face with Neck", 40, 35),

  w("eyebrow-wax", "Eyebrow Wax", 12, 15),
  w("nose-wax-inside", "Nose Wax (inside)", 6, 10),
  w("nose-wax", "Nose Wax", 12, 10),
  w("ear-wax", "Ear Wax", 12, 10),
  w("underarm-wax", "Under Arm Wax", 15, 15),
  w("stomach-line-wax", "Stomach Line", 8, 10),
  w("stomach-wax", "Stomach Wax", 30, 25),
  w("bikini-line-wax", "Bikini Line", 20, 20),
  w("deep-bikini-wax", "Deep Bikini Wax", 30, 25),
  w("brazilian-wax", "Brazilian Wax", 45, 30),
  w("butt-wax", "Butt Wax", 25, 20),
  w("half-arm-wax", "Half Arm Wax", 20, 20),
  w("full-arm-wax", "Full Arm Wax", 30, 30),
  w("half-leg-wax", "Half Leg Wax", 30, 30),
  w("upper-half-leg-wax", "Upper Half Leg Wax", 35, 30),
  w("full-leg-wax", "Full Leg Wax", 45, 45),
  w("arm-leg-underarm-wax", "Arm, Leg & Underarm", 80, 90),
  w("back-neck-wax", "Back Neck Wax", 12, 10),
  w("womens-back-wax", "Women's Back Wax", 40, 30),
  w("womens-chest-wax", "Women's Chest Wax", 45, 30),
  w("mens-back-wax", "Men's Back Wax", 50, 30),
  w("mens-chest-wax", "Men's Chest Wax", 50, 30),
  w("full-body-wax", "Full Body Wax", 180, 120),

  f("face-bleach", "Face Bleach", 35, 30),
  f("face-polish", "Face Polish", 45, 30),
  f("eye-treatment", "Eye Treatment", 50, 30),
  f("mini-facial", "Mini Facial", 45, 30),
  f("basic-facial", "Basic Facial", 65, 45),
  f("deep-cleaning-facial", "Deep Cleaning Facial", 65, 60),
  f("acne-facial", "Acne Facial", 85, 60),
  f("fruits-facial", "Fruits Facial", 80, 60),
  f("gold-facial", "Gold Facial", 80, 60),
  f("repechage-facial", "Repechage Facial", 80, 60),
  f("diamond-facial", "Diamond Facial", 90, 60),
  f("four-layer-facial", "Four Layer Facial", 120, 90),

  { id: "eyebrow-tinting", name: "Eyebrow Tinting", category: "lash-brow", price: 15, duration: 20, page: "tinting", bookable: true },
  { id: "eyelash-tinting", name: "Eyelash Tinting", category: "lash-brow", price: 20, duration: 20, page: "tinting", bookable: true },
  { id: "eyelash-extensions", name: "Eyelash Extensions", category: "lash-brow", price: 50, duration: 90, page: "eyelash-extensions", bookable: true },
  { id: "eyelash-lifting", name: "Eyelash Lifting", category: "lash-brow", price: 55, duration: 60, page: "eyelash-extensions", bookable: true },
  // "Eyelash Exchange" appeared only in the old booking list, never on the menu.
  // Its meaning is unconfirmed, so it is not offered online.

  { id: "henna-hands", name: "Henna Design (hands)", category: "henna", price: null, duration: 60, page: "henna", bookable: true },
  { id: "henna-feet", name: "Henna Design (feet)", category: "henna", price: null, duration: 90, page: "henna", bookable: true },
  { id: "henna-full", name: "Henna Design (full)", category: "henna", price: null, duration: 120, page: "henna", bookable: true },

  // Products, not appointments: call to purchase.
  { id: "gift-card-25", name: "Gift Card", category: "gift-cards", price: 25, duration: 0, bookable: false },
  { id: "gift-card-50", name: "Gift Card", category: "gift-cards", price: 50, duration: 0, bookable: false },
  { id: "gift-card-100", name: "Gift Card", category: "gift-cards", price: 100, duration: 0, bookable: false },
];

const BY_ID = new Map(CATALOG.map((s) => [s.id, s]));

export function getCatalogItem(id: string | null | undefined): CatalogItem | undefined {
  return id ? BY_ID.get(id) : undefined;
}

export function getBookableItem(id: string | null | undefined): CatalogItem | undefined {
  const item = getCatalogItem(id);
  return item?.bookable ? item : undefined;
}

export function price(id: string): number {
  const p = getCatalogItem(id)?.price;
  if (p == null) throw new Error(`Catalog item ${id} has no fixed price`);
  return p;
}

export function formatPrice(item: Pick<CatalogItem, "price">): string {
  return item.price == null ? "Quote" : `$${item.price}`;
}

export function itemsInCategory(category: CategoryId): CatalogItem[] {
  return CATALOG.filter((s) => s.category === category);
}

export function isCategoryId(v: string | null | undefined): v is CategoryId {
  return !!v && CATEGORIES.some((c) => c.id === v);
}
