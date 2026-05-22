"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Tag } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const featured = [
  {
    tag: "New Clients Only",
    discount: "$5 OFF",
    service: "First Visit Special",
    description: "First time at Urmi? Get $5 off any service on your first visit.",
    color: "from-brand-pink/20 to-brand-purple/20",
  },
  {
    tag: "Limited Time",
    discount: "$10 OFF",
    service: "Full Face Threading",
    description: "Complete facial threading — upper lip, chin, sides, and forehead.",
    color: "from-brand-purple/20 to-lavender-100/60",
  },
  {
    tag: "Bundle Deal",
    discount: "$3 OFF",
    service: "Brows + Upper Lip",
    description: "Book eyebrow threading and upper lip together and save.",
    color: "from-brand-pink/15 to-blush-50",
  },
];

const coupons = [
  { discount: "$5 OFF", service: "Facial", note: "Limited time" },
  { discount: "$10 OFF", service: "Body Waxing", note: "Limited time" },
  { discount: "$2 OFF", service: "Eyebrow & Lip", note: "Limited time" },
  { discount: "$5 OFF", service: "Lash Tinting", note: "Limited time" },
];

export default function Offers() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const shouldReduce = useReducedMotion();

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + featured.length) % featured.length);
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % featured.length);
  };

  useEffect(() => {
    if (paused || shouldReduce) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % featured.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [paused, shouldReduce]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: shouldReduce ? 0 : d * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: shouldReduce ? 0 : d * -60 }),
  };

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

        {/* Featured carousel */}
        <div className="max-w-2xl mx-auto mb-10">
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Card — mx-10 leaves room for arrows on mobile */}
            <div className="relative rounded-3xl overflow-hidden h-64 border border-lavender-100 card-shadow mx-10 sm:mx-0">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br ${featured[current].color}`}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-purple bg-white/70 px-3 py-1 rounded-full mb-4">
                    {featured[current].tag}
                  </span>
                  <p className="font-serif text-5xl font-bold text-brand-pink mb-2">
                    {featured[current].discount}
                  </p>
                  <p className="font-serif text-2xl font-bold text-charcoal mb-2">
                    {featured[current].service}
                  </p>
                  <p className="text-gray-500 text-sm max-w-xs">
                    {featured[current].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrows — outside overflow-hidden so they're never clipped */}
            <button
              onClick={prev}
              aria-label="Previous offer"
              className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-lavender-100 shadow flex items-center justify-center hover:bg-lavender-50 transition-colors z-10"
            >
              <ChevronLeft size={18} className="text-charcoal" />
            </button>
            <button
              onClick={next}
              aria-label="Next offer"
              className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-lavender-100 shadow flex items-center justify-center hover:bg-lavender-50 transition-colors z-10"
            >
              <ChevronRight size={18} className="text-charcoal" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                aria-label={`Go to offer ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-brand-purple" : "w-2 bg-lavender-100"}`}
              />
            ))}
          </div>
        </div>

        {/* Coupon cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

                <p className="text-xs text-gray-400">{coupon.note}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-md"
          >
            Redeem an Offer — Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
