import { Clock, Heart, MapPin, Sparkles } from "lucide-react";
import { formatPrice, getCatalogItem } from "@/lib/catalog";

const browPrice = formatPrice(getCatalogItem("eyebrow-threading")!);

const items = [
  { icon: Heart, label: "Family-owned salon" },
  { icon: Sparkles, label: `Eyebrow threading from ${browPrice}` },
  { icon: Clock, label: "Walk-ins welcome during salon hours" },
  { icon: MapPin, label: "150 Hinchman Ave, Wayne" },
];

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-lavender-100 py-5">
      <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 lg:divide-x divide-lavender-100">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center sm:justify-center gap-2 px-2 text-sm font-medium text-charcoal">
            <Icon size={16} className="text-brand-purple-strong shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
