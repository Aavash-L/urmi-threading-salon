"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const shouldReduce = useReducedMotion();

  if (shouldReduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-1 bg-brand-gradient origin-left z-50"
      style={{ scaleX }}
    />
  );
}
