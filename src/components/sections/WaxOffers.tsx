"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, Sparkles, Tag } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { BUSINESS, WAX_OFFERS } from "@/lib/constants";

export default function WaxOffers() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="offers" className="relative py-14 sm:py-24 bg-blush-50 overflow-hidden scroll-mt-28" aria-label="Waxing offers">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Waxing Specials"
          title="Smooth Skin, Sweeter Price"
          subtitle="Two waxing specials running now. Book online or just walk in, and mention the offer at checkout."
        />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {WAX_OFFERS.map((offer, i) => (
            <motion.article
              key={offer.id}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: shouldReduce ? 0 : i * 0.12 }}
              className="relative flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden card-shadow border border-lavender-100"
            >
              {/* Ticket stub */}
              <div className="relative bg-brand-gradient text-white sm:w-44 shrink-0 flex sm:flex-col items-center justify-center gap-3 sm:gap-0 px-6 py-6 sm:py-10 text-center">
                <Sparkles size={80} className="absolute -right-4 -top-4 text-white/10" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 sm:mb-1">Save</span>
                <span className="font-serif text-6xl sm:text-7xl font-bold leading-none">${offer.discount}</span>
                <span className="text-sm font-bold uppercase tracking-[0.2em] sm:mt-2">Off</span>
              </div>

              {/* Body, with perforated edge + punched notches */}
              <div className="relative flex-1 border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-lavender-100 p-6 sm:p-8 flex flex-col">
                <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-blush-50" aria-hidden="true" />
                <span className="absolute -top-3 -right-3 sm:right-auto sm:top-auto sm:-bottom-3 sm:-left-3 w-6 h-6 rounded-full bg-blush-50" aria-hidden="true" />

                <span className="self-start inline-flex items-center gap-1.5 bg-lavender-50 text-brand-purple text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  <Tag size={11} />
                  {offer.tag}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-tight mt-4">
                  {offer.headline}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mt-2">{offer.blurb}</p>

                <div className="flex items-baseline gap-3 mt-5">
                  <span className="text-lg text-gray-400 line-through decoration-brand-pink/60">${offer.price}</span>
                  <span className="font-serif text-4xl font-bold text-brand-gradient">${offer.price - offer.discount}</span>
                  <span className="text-xs text-gray-400">{offer.service}</span>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/book"
                    className="group inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
                  >
                    Claim Offer
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 border-2 border-brand-purple text-brand-purple font-semibold px-6 py-3 rounded-full hover:bg-brand-purple hover:text-white transition-colors text-sm"
                  >
                    <Phone size={13} />
                    Call Us
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Brazilian offer is for first-time clients. Mention the offer when you book or at checkout.
        </p>
      </div>
    </section>
  );
}
