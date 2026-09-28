import Link from "next/link";
import { ArrowRight, Brush, Eye, Heart, Palette, Sparkles, User, Zap } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { CallButton, CallHelper, RequestButton } from "@/components/ui/CallCta";

export const metadata = pageMetadata("/services");

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>> = {
  Sparkles, User, Zap, Heart, Eye, Palette, Brush,
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Services", url: `${SITE_URL}/services` }]} />

      <section className="pt-32 pb-12 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Beauty Services in Wayne, NJ</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore threading, waxing, facials, eyelash extensions, henna, and tinting at our salon at
            150 Hinchman Ave. Each service page lists starting prices from our menu.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <CallButton placement="services_hero" />
            <RequestButton placement="services_hero" />
          </div>
          <CallHelper className="mt-4 max-w-xl mx-auto" />
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            return (
              <li key={service.slug} className="bg-white border border-lavender-100 rounded-2xl p-7 card-shadow flex flex-col">
                <div className="w-12 h-12 bg-lavender-50 rounded-xl flex items-center justify-center mb-5">
                  <Icon size={22} className="text-brand-purple-strong" aria-hidden />
                </div>
                <h2 className="font-serif text-xl font-bold text-charcoal mb-2">{service.name}</h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 flex-1">{service.shortDescription}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11"
                >
                  {service.name} details and prices <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="text-center mt-10">
          <Link href="/pricing" className="font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline">
            View the full salon price menu
          </Link>
        </p>
      </section>
    </>
  );
}
