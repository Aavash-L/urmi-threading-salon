"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, CalendarDays } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { useReducedMotion } from "framer-motion";

export default function FloatingCallButton() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex gap-3 px-4 pb-5 pt-3 bg-white/80 backdrop-blur-md border-t border-lavender-100"
      initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      <a
        href={`tel:${BUSINESS.phoneRaw}`}
        aria-label={`Call Urmi Threading Salon at ${BUSINESS.phone}`}
        className="flex-1 flex items-center justify-center gap-2 border-2 border-brand-purple text-brand-purple font-semibold py-3.5 rounded-full text-sm"
      >
        <Phone size={16} />
        Call Us
      </a>
      <Link
        href="/book"
        className="flex-1 flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold py-3.5 rounded-full shadow-lg text-sm"
      >
        <CalendarDays size={16} />
        Book Now
      </Link>
    </motion.div>
  );
}
