"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Phone, Sparkles, Tag, X } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

const coupons = [
  { discount: "$5 OFF",  service: "Facial",       description: "Save $5 on any facial service",   note: "Limited time" },
  { discount: "$10 OFF", service: "Body Waxing",   description: "Save $10 on any waxing service",  note: "Limited time" },
  { discount: "$5 OFF",  service: "Lash Lifting",  description: "Save $5 on eyelash lifting",      note: "Limited time" },
];

export default function Offers() {
  const [activeCoupon, setActiveCoupon] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-24 bg-white" aria-label="Current offers and promotions">
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
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {coupons.map((coupon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: shouldReduce ? 0 : i * 0.08 }}
              className="relative bg-white border border-[#c9a84c]/40 rounded-2xl overflow-hidden flex card-shadow hover:border-[#c9a84c] transition-colors"
            >
              {/* Left gold section */}
              <div className="bg-[#fdf6e9] flex flex-col items-center justify-center px-6 py-5 min-w-[130px] border-r border-dashed border-[#c9a84c]/50">
                <span className="text-[#c9a84c] text-xl mb-1">✦</span>
                <p className="font-serif text-3xl font-bold text-[#c9a84c] leading-none">{coupon.discount}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#b8932a] mt-1">Coupon</p>
              </div>

              {/* Right content */}
              <div className="flex flex-col justify-center px-5 py-4 flex-1 gap-2">
                <div>
                  <p className="font-semibold text-charcoal text-base">{coupon.service}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{coupon.description}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{coupon.note}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 bg-[#c9a84c] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#b8932a] transition-colors"
                  >
                    <Phone size={12} />
                    Call to Redeem
                  </a>
                  <button
                    onClick={() => setActiveCoupon(i)}
                    className="inline-flex items-center gap-1.5 border border-[#c9a84c] text-[#c9a84c] text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#fdf6e9] transition-colors"
                  >
                    Show Coupon
                  </button>
                </div>
              </div>

              {/* Tag badge */}
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] bg-[#fdf6e9] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Tag size={8} />
                Coupon
              </span>
            </motion.div>
          ))}
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
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-[#c9a84c]/30 relative"
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
              <p className="font-serif text-5xl font-bold text-[#c9a84c] my-3">
                {coupons[activeCoupon].discount}
              </p>
              <p className="font-semibold text-charcoal text-lg">{coupons[activeCoupon].service}</p>
              <p className="text-sm text-gray-500 mt-1">{coupons[activeCoupon].description}</p>

              <div className="flex items-center gap-3 my-5">
                <div className="h-px flex-1 bg-lavender-100" />
                <span className="text-[#c9a84c] text-sm">✦</span>
                <div className="h-px flex-1 bg-lavender-100" />
              </div>

              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-[#c9a84c] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#b8932a] transition-colors w-full justify-center"
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
