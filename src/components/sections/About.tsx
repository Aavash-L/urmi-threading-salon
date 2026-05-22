"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { aboutImage1, aboutImage2, aboutImage3 } from "@/lib/images";

const stats = [
  { value: 138, suffix: "+", label: "Google Reviews" },
  { value: 15, suffix: "+", label: "Years in Business" },
  { value: 4, suffix: ".7 ★", label: "Google Rating", prefix: "" },
  { value: 10000, suffix: "+", label: "Brows Shaped" },
];

const highlights = [
  "Precise, customized arch for every face shape",
  "100% cotton thread — no chemicals, no heat",
  "Sanitized tools for every single client",
  "Walk-ins welcome, minimal wait times",
];

export default function About() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="about" className="py-24 bg-lavender-50" aria-label="About Urmi Threading Salon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <motion.div
            className="relative h-[500px] hidden sm:block"
            initial={{ opacity: 0, x: shouldReduce ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute top-0 left-0 w-56 h-72 rounded-2xl overflow-hidden shadow-xl rotate-[-3deg]">
              <Image src={aboutImage1.src} alt={aboutImage1.alt} fill className="object-cover" sizes="224px" />
            </div>
            <div className="absolute top-16 right-0 w-52 h-64 rounded-2xl overflow-hidden shadow-xl rotate-[2deg]">
              <Image src={aboutImage2.src} alt={aboutImage2.alt} fill className="object-cover" sizes="208px" />
            </div>
            <div className="absolute bottom-0 left-16 w-48 h-60 rounded-2xl overflow-hidden shadow-xl rotate-[-1deg]">
              <Image src={aboutImage3.src} alt={aboutImage3.alt} fill className="object-cover" sizes="192px" />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-purple mb-3">Our Story</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
                Threading is an art. We&apos;ve spent 15 years mastering it.
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Urmi Threading Salon has been part of the Wayne, NJ community since 2010. What started as a single chair and a passion for precision has grown into the area&apos;s most trusted beauty destination — because we&apos;ve never lost sight of what matters: making every client feel genuinely cared for.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe your brows should work with your face, not against it. Before we touch a thread, we study your bone structure, your natural arch, and what shape will make your features shine. The result isn&apos;t just clean brows — it&apos;s a shape that looks like it was always meant to be there.
            </p>

            <ul className="space-y-3 pt-2">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 size={18} className="text-brand-purple mt-0.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: shouldReduce ? 0 : i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center card-shadow"
            >
              <p className="font-serif text-4xl font-bold text-brand-purple">
                {stat.prefix}
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
