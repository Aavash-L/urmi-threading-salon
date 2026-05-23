"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Phone, Sparkles, Tag, X } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

const coupons = [
  { discount: "$5 OFF",  service: "Facial",      note: "Limited time" },
  { discount: "$10 OFF", service: "Body Waxing",  note: "Limited time" },
  { discount: "$5 OFF",  service: "Lash Lifting", note: "Limited time" },
];

export default function Offers() {
  const [activeCoupon, setActiveCoupon] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-14 sm:py-24 bg-white" aria-label="Current offers and promotions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Limited Time"
          title="Current Offers"
          subtitle="Treat yourself a little more. Exclusive promotions for our Wayne, NJ clients."
        />

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mt-4 mb-12">
          <div className="h-px w-16 bg-lavender-100" />
          <Sparkles size={14} className="text-brand-purple" />
          <div className="h-px w-16 bg-lavender-100" />
        </div>

        {/* Coupon cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {coupons.map((coupon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: shouldReduce ? 0 : i * 0.08 }}
              className="relative bg-white border border-lavender-100 rounded-2xl p-5 text-center card-shadow overflow-hidden group hover:border-brand-purple transition-colors"
            >
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-brand-purple bg-lavender-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Tag size={8} />
                Coupon
              </span>

              <div className="mt-4">
                <p className="font-serif text-3xl font-bold text-brand-pink">{coupon.discount}</p>

                <div className="flex items-center gap-2 my-3">
                  <div className="h-px flex-1 bg-lavender-100" />
                  <Sparkles size={10} className="text-lavender-100" />
                  <div className="h-px flex-1 bg-lavender-100" />
                </div>

                <p className="font-semibold text-charcoal text-sm">{coupon.service}</p>

                <div className="flex items-center gap-2 my-3">
                  <div className="h-px flex-1 bg-lavender-100" />
                  <Sparkles size={10} className="text-lavender-100" />
                  <div className="h-px flex-1 bg-lavender-100" />
                </div>

                <p className="text-xs text-gray-400 mb-4">{coupon.note}</p>

                <div className="flex flex-col gap-2">
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-brand-gradient text-white text-xs font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Phone size={11} />
                    Call to Redeem
                  </a>
                  <button
                    onClick={() => setActiveCoupon(i)}
                    className="inline-flex items-center justify-center gap-1.5 border border-brand-purple text-brand-purple text-xs font-semibold px-4 py-2 rounded-full hover:bg-lavender-50 transition-colors"
                  >
                    Show Coupon
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-md"
          >
            <Phone size={16} />
            Call to Book — {BUSINESS.phone}
          </a>
        </div>
      </div>

      {/* Coupon modal */}
      <AnimatePresence>
        {activeCoupon !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={() => setActiveCoupon(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.92 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-lavender-100 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveCoupon(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-charcoal transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <p className="text-sm font-semibold text-charcoal mb-1">{BUSINESS.name}</p>
              <p className="font-serif text-5xl font-bold text-brand-pink my-3">
                {coupons[activeCoupon].discount}
              </p>
              <p className="font-semibold text-charcoal text-lg">{coupons[activeCoupon].service}</p>

              <div className="flex items-center gap-3 my-5">
                <div className="h-px flex-1 bg-lavender-100" />
                <Sparkles size={12} className="text-brand-purple" />
                <div className="h-px flex-1 bg-lavender-100" />
              </div>

              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity w-full justify-center"
              >
                <Phone size={16} />
                Call {BUSINESS.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
