import { ShieldCheck, Star, Sparkles, Clock } from "lucide-react";

const items = [
  { icon: Clock, label: "15+ Years Experience" },
  { icon: Star, label: "4.7 ★ Google Rating" },
  { icon: ShieldCheck, label: "Sanitized Tools Per Client" },
  { icon: Sparkles, label: "Walk-Ins Welcome" },
];

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-lavender-100 py-5" aria-label="Trust indicators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-lavender-100">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2 px-4 text-sm font-medium text-charcoal"
            >
              <Icon size={16} className="text-brand-purple shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
