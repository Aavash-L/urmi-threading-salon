import Link from "next/link";
import { ArrowRight, Heart, Sparkles, User } from "lucide-react";
import { formatPrice, getCatalogItem } from "@/lib/catalog";
import { bookingHref, getService } from "@/lib/services";

const from = (id: string) => `From ${formatPrice(getCatalogItem(id)!)}`;

const featured = [
  {
    service: getService("eyebrow-threading"),
    icon: Sparkles,
    name: "Eyebrow Threading",
    description: "Brow shaping with cotton thread. Tell us the shape you prefer before your service.",
    price: from("eyebrow-threading"),
    detailsLabel: "Eyebrow threading details",
  },
  {
    service: getService("face-threading"),
    icon: User,
    name: "Full Face Threading",
    description: `Threading for facial hair removal, with full-face options from ${formatPrice(getCatalogItem("full-face-threading")!)}.`,
    price: from("full-face-threading"),
    detailsLabel: "Full face threading details",
  },
  {
    service: getService("facials"),
    icon: Heart,
    name: "Facials",
    description: "Explore skincare facials and choose a treatment for your visit.",
    price: from("mini-facial"),
    detailsLabel: "Skincare facial options",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-14 sm:py-20 bg-lavender-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 id="services-heading" className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Our Services
          </h2>
          <p className="text-gray-700">
            Threading, waxing, facials, lashes, henna, and tinting at our salon on Hinchman Ave in Wayne.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(({ service, icon: Icon, name, description, price, detailsLabel }) => (
            <li key={service.slug} className="bg-white rounded-2xl p-6 border border-lavender-100 card-shadow flex flex-col">
              <div className="w-12 h-12 bg-lavender-50 rounded-xl flex items-center justify-center mb-4">
                <Icon size={22} className="text-brand-purple-strong" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal mb-2">{name}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">{description}</p>
              <p className="text-lg font-bold text-charcoal mb-5">{price}</p>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 bg-brand-gradient text-white text-sm font-semibold min-h-11 px-4 rounded-full hover:opacity-95"
                >
                  {detailsLabel} <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link
                  href={bookingHref(service.booking)}
                  className="inline-flex items-center justify-center text-sm font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11"
                >
                  Request {name.toLowerCase()}
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 border-2 border-brand-purple-strong text-brand-purple-strong bg-white font-semibold px-8 min-h-12 rounded-full hover:bg-lavender-100"
          >
            View the Full Menu &amp; Prices <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
