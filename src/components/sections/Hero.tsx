"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Phone, Sparkles, Star, MapPin } from "lucide-react";
import GradientBlob from "@/components/ui/GradientBlob";
import { BUSINESS } from "@/lib/constants";
import { heroImage } from "@/lib/images";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], shouldReduce ? [0, 0] : [0, 50]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: shouldReduce ? 0 : 0.1, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-blush-50 pt-16 sm:pt-20"
      aria-label="Hero section"
    >
      <GradientBlob color="pink" className="-top-40 -left-40" size={600} />
      <GradientBlob color="purple" className="-bottom-40 -right-40" size={500} />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">

          {/* Left column */}
          <motion.div
            className="lg:col-span-3 space-y-5 text-center lg:text-left lg:pr-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Location pill */}
            <motion.div variants={item} className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-white/80 border border-lavender-100 rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-brand-purple shadow-sm">
                <MapPin size={12} />
                Wayne, NJ&apos;s Most Trusted Threading Salon
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={item}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight"
            >
              Flawless Brows,{" "}
              <span className="text-brand-gradient">Handcrafted</span>{" "}
              to Perfection
            </motion.h1>

            {/* Subhead */}
            <motion.p variants={item} className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              15+ years of precision eyebrow threading, waxing, and beauty services in Wayne, NJ.
              Walk in. Walk out radiant.
            </motion.p>

            {/* CTAs — full width on mobile */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/book"
                className="w-full sm:w-auto text-center bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition-opacity text-base"
              >
                Book Appointment
              </Link>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="w-full sm:w-auto text-center flex items-center justify-center gap-2 border-2 border-brand-purple text-brand-purple font-semibold px-8 py-4 rounded-full hover:bg-brand-purple hover:text-white transition-colors text-base"
              >
                <Phone size={16} />
                Call Us
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-4 pt-1">
              <div className="flex -space-x-2.5" aria-hidden="true">
                {["bg-brand-pink", "bg-brand-purple", "bg-amber-400", "bg-emerald-400"].map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {["P", "S", "A", "J"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-600">
                  <strong className="text-charcoal">4.7 ★</strong> · 137+ Google reviews
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — hidden on mobile, shown from lg */}
          <motion.div
            className="hidden lg:flex lg:col-span-2 relative items-stretch"
            initial={shouldReduce ? {} : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          >
            <div className="relative w-full">
              <motion.div
                style={{ y: imageY }}
                className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[2/3]"
              >
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  sizes="50vw"
                  className="object-cover object-center"
                  priority
                />
                {/* subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>

              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -top-4 -left-6 glass rounded-2xl px-4 py-2 shadow-lg"
              >
                <p className="text-sm font-bold text-charcoal">Est. 2010</p>
                <p className="text-xs text-gray-500">15+ Years</p>
              </motion.div>

              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <div>
                  <p className="text-xs font-bold text-charcoal">Open Today</p>
                  <p className="text-xs text-gray-500">Walk-ins Welcome</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Mobile-only image strip — shown below content on small screens */}
        <motion.div
          className="lg:hidden mt-8 relative rounded-2xl overflow-hidden aspect-[16/9] shadow-xl"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-white text-xs font-semibold">Open · Walk-ins Welcome</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
