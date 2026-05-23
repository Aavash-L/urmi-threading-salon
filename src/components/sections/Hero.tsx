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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left column */}
          <motion.div
            className="space-y-5 text-center lg:text-left lg:pr-4"
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
                  <strong className="text-charcoal">4.7 ★</strong> · 138+ Google reviews
                </span>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-3 pt-1">
              <span className="text-xs text-gray-400 font-medium">Follow us</span>
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white border border-lavender-100 hover:border-brand-pink hover:shadow-md text-charcoal hover:text-brand-pink transition-all px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm"
                aria-label="Follow Urmi Threading on Instagram"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white border border-lavender-100 hover:border-blue-500 hover:shadow-md text-charcoal hover:text-blue-600 transition-all px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm"
                aria-label="Follow Urmi Threading on Facebook"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </motion.div>
          </motion.div>

          {/* Right column — hidden on mobile, shown from lg */}
          <motion.div
            className="hidden lg:flex relative items-stretch"
            initial={shouldReduce ? {} : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          >
            <div className="relative w-full">
              <motion.div
                style={{ y: imageY }}
                className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]"
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
