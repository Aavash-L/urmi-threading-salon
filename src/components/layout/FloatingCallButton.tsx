"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { useReducedMotion } from "framer-motion";

export default function FloatingCallButton() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.a
      href={`tel:${BUSINESS.phoneRaw}`}
      aria-label={`Call Urmi Threading Salon at ${BUSINESS.phone}`}
      className="md:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-brand-gradient text-white px-5 py-3 rounded-full shadow-lg font-semibold text-sm"
      initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      whileHover={shouldReduce ? {} : { scale: 1.05 }}
      whileTap={shouldReduce ? {} : { scale: 0.97 }}
    >
      <Phone size={16} className="fill-white" />
      Call Now
    </motion.a>
  );
}
