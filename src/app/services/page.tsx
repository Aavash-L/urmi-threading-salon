import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, User, Zap, Heart, Eye, Palette, Brush } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { BUSINESS, SITE_URL } from "@/lib/constants";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Beauty Services — Threading, Waxing, Facials & More",
  description:
    "Explore all services at Urmi Threading Salon in Wayne, NJ: eyebrow threading, waxing, facials, lash extensions, henna & tinting. Call (973) 653-9322.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Beauty Services | Urmi Threading Salon",
    description: "Threading, waxing, facials, lash extensions, henna & tinting in Wayne, NJ.",
    url: `${SITE_URL}/services`,
  },
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sparkles, User, Zap, Heart, Eye, Palette, Brush,
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Services", url: `${SITE_URL}/services` }]} />

      <section className="pt-32 pb-16 bg-blush-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-purple mb-3">What We Offer</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
            All Beauty Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every service at Urmi Threading Salon is delivered with precision, care, and 15+ years of expertise.
            Walk in or call ahead — {BUSINESS.phone}.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon] ?? Sparkles;
              return (
                <div
                  key={service.id}
                  className="group bg-white border border-lavender-100 rounded-2xl p-7 card-shadow hover:border-brand-purple transition-all"
                >
                  <div className="w-12 h-12 bg-lavender-50 rounded-xl flex items-center justify-center mb-5">
                    <Icon size={22} className="text-brand-purple" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-charcoal mb-2 group-hover:text-brand-purple transition-colors">
                    {service.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Benefits</p>
                    <ul className="space-y-1">
                      {service.benefits.slice(0, 3).map((b, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-brand-purple mt-1">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-brand-purple text-sm font-semibold hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-gradient text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Ready to book?</h2>
          <p className="mb-8 opacity-90">Walk-ins always welcome. Or reserve your spot in advance.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="bg-white text-brand-purple font-semibold px-8 py-4 rounded-full hover:bg-lavender-50 transition-colors"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
