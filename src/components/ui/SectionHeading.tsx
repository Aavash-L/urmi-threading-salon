"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  const shouldReduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: shouldReduce ? 0 : 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`${centered ? "text-center" : ""} max-w-3xl ${centered ? "mx-auto" : ""}`}
    >
      {eyebrow && (
        <motion.p
          variants={item}
          className={`text-sm font-semibold uppercase tracking-widest mb-3 ${
            light ? "text-lavender-100" : "text-brand-purple"
          }`}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={item}
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={item}
          className={`text-lg leading-relaxed ${
            light ? "text-lavender-100" : "text-gray-600"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
