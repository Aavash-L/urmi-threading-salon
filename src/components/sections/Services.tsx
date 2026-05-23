"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const featured = [
  {
    id: "eyebrow-threading",
    slug: "eyebrow-threading",
    icon: Sparkles,
    name: "Eyebrow Threading",
    description: "Precision shaping with cotton thread — clean lines, natural arches that complement your face.",
    price: "from $10",
    badge: "Most Popular",
  },
  {
    id: "face-threading",
    slug: "face-threading",
    icon: User,
    name: "Full Face Threading",
    description: "Upper lip, chin, sides, and forehead — complete facial hair removal in one visit.",
    price: "from $35",
    badge: "Best Value",
  },
  {
    id: "facials",
    slug: "facials",
    icon: Heart,
    name: "Facials",
    description: "Customized facials to deep cleanse, hydrate, and restore your natural glow.",
    price: "from $45",
    badge: "Trending",
  },
];

export default function Services() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="services" className="py-24 bg-lavender-50" aria-label="Our services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title="Beauty Services Designed Around You"
          subtitle="15+ years of precision threading, waxing, facials, and more — all in one Wayne, NJ salon."
        />

        {/* Featured 3 */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: shouldReduce ? 0 : index * 0.1 }}
                className="group relative bg-white rounded-2xl p-6 card-shadow border border-lavender-100 hover:border-brand-purple transition-all duration-300 flex flex-col"
              >
                {/* Badge */}
                <span className="absolute -top-3 left-5 text-[10px] font-bold uppercase tracking-widest bg-brand-gradient text-white px-3 py-1 rounded-full shadow-sm">
                  {service.badge}
                </span>

                <div className="w-12 h-12 bg-lavender-50 rounded-xl flex items-center justify-center mb-4 mt-2 group-hover:bg-lavender-100 transition-colors">
                  <Icon size={22} className="text-brand-purple" />
                </div>

                <h3 className="font-serif text-xl font-bold text-charcoal mb-2 group-hover:text-brand-purple transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>

                {/* Price */}
                <div className="flex items-center mb-5">
                  <span className="text-lg font-bold text-charcoal">{service.price}</span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="/book"
                    className="flex-1 text-center bg-brand-gradient text-white text-xs font-semibold py-2.5 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Book Now
                  </Link>
                  <Link
                    href={service.id === "eyebrow-threading" ? "/eyebrow-threading-wayne-nj" : `/services/${service.slug}`}
                    className="flex-1 text-center border border-brand-purple text-brand-purple text-xs font-semibold py-2.5 rounded-full hover:bg-brand-purple hover:text-white transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-md"
          >
            <Sparkles size={16} />
            View Full Menu & Pricing
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
