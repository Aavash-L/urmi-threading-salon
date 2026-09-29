"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

const MESSAGES = [
  "15% OFF for all new customers",
  "First Brazilian wax? Get $10 OFF",
  "Full Body Wax — $20 OFF",
];

export default function PromoBanner() {
  const [i, setI] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <Link
      href="/#offers"
      className="fixed top-0 left-0 right-0 z-40 h-10 bg-brand-gradient text-white flex items-center justify-center px-4 shadow-md overflow-hidden"
    >
      <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-center" aria-live="polite">
        <Sparkles size={14} className="shrink-0" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {MESSAGES[i]}
          </motion.span>
        </AnimatePresence>
        <Sparkles size={14} className="shrink-0" />
      </p>
    </Link>
  );
}
