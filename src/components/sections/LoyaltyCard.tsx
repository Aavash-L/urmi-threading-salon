"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Sparkles, Crown, Phone } from "lucide-react";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

const programs = [
  {
    id: "brow",
    icon: Sparkles,
    label: "Brow Loyalty",
    title: "Your 10th Brow Threading",
    reward: "is on us. Free.",
    description: "Every time you come in for eyebrow threading, you earn a stamp. Hit 10 and your next visit is completely free. No expiry, no fine print.",
    total: 10,
    freeSlot: 10,
    stampColor: "from-brand-pink to-brand-purple",
    rewardLabel: "FREE Brow Threading",
  },
  {
    id: "glow",
    icon: Crown,
    label: "Glow Rewards",
    title: "Every 5th Brazilian Wax",
    reward: "$15 off. Just for showing up.",
    description: "Come in for a Brazilian wax and collect stamps. Every 5th visit earns you $15 off — automatically applied at checkout.",
    total: 5,
    freeSlot: 5,
    stampColor: "from-brand-purple to-lavender-100",
    rewardLabel: "$15 OFF Brazilian Wax",
  },
];

function StampGrid({ total, freeSlot, stampColor, shouldReduce }: {
  total: number;
  freeSlot: number;
  stampColor: string;
  shouldReduce: boolean | null;
}) {
  const [filled, setFilled] = useState(0);

  const toggle = (i: number) => {
    if (i === filled - 1) setFilled(i);
    else if (i === filled) setFilled(i + 1);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: total }).map((_, i) => {
          const isLast = i === total - 1;
          const isStamped = i < filled;

          return (
            <motion.button
              key={i}
              onClick={() => toggle(i)}
              aria-label={isLast ? `Reward stamp — ${isStamped ? "earned" : "not yet earned"}` : `Stamp ${i + 1} — ${isStamped ? "stamped" : "empty"}`}
              whileHover={shouldReduce ? {} : { scale: 1.08 }}
              whileTap={shouldReduce ? {} : { scale: 0.94 }}
              className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-200 overflow-hidden ${
                isStamped
                  ? "border-transparent"
                  : isLast
                  ? "border-brand-purple border-dashed bg-lavender-50"
                  : "border-lavender-100 bg-white hover:border-brand-purple/40"
              }`}
            >
              <AnimatePresence>
                {isStamped && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stampColor} flex flex-col items-center justify-center`}
                    initial={shouldReduce ? { opacity: 1 } : { scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={shouldReduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {isLast ? (
                      <>
                        <Sparkles size={16} className="text-white" />
                        <span className="text-white text-[10px] font-bold mt-1">FREE</span>
                      </>
                    ) : (
                      <Sparkles size={14} className="text-white/90" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isStamped && (
                isLast ? (
                  <div className="flex flex-col items-center gap-0.5">
                    <Sparkles size={14} className="text-brand-purple/40" />
                    <span className="text-[9px] font-bold text-brand-purple/50">FREE</span>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-gray-300">{i + 1}</span>
                )
              )}
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-center text-gray-400">
        {filled === 0
          ? "Tap the stamps above to preview your progress"
          : filled === total
          ? "🎉 Reward unlocked! Show this to us at your next visit."
          : `${total - filled} more visit${total - filled !== 1 ? "s" : ""} until your reward`}
      </p>
    </div>
  );
}

export default function LoyaltyCard() {
  const [active, setActive] = useState("brow");
  const shouldReduce = useReducedMotion();

  const program = programs.find((p) => p.id === active)!;
  const Icon = program.icon;

  return (
    <section id="loyalty" className="py-14 sm:py-24 bg-lavender-50" aria-label="Loyalty rewards program">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-purple mb-3">Loyalty Rewards</p>
          <h2 className="font-serif text-4xl font-bold text-charcoal mb-4">
            The More You Come, <span className="text-brand-gradient">The More You Save</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Our loyalty cards are our way of saying thank you. Pick up a physical card next time you visit — we stamp it every time.
          </p>
        </div>

        {/* Program switcher */}
        <div className="flex justify-center gap-3 mb-10">
          {programs.map((p) => {
            const PIcon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  active === p.id
                    ? "bg-brand-gradient text-white shadow-md"
                    : "bg-white border border-lavender-100 text-gray-600 hover:border-brand-purple"
                }`}
              >
                <PIcon size={14} />
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? {} : { opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 card-shadow border border-lavender-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

              {/* Left: info */}
              <div className="space-y-5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${program.stampColor} flex items-center justify-center`}>
                  <Icon size={22} className="text-white" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-brand-purple uppercase tracking-wider mb-1">{program.label}</p>
                  <h3 className="font-serif text-2xl font-bold text-charcoal leading-snug">
                    {program.title}{" "}
                    <span className="text-brand-gradient">{program.reward}</span>
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">{program.description}</p>

                {/* Reward badge */}
                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${program.stampColor} text-white text-sm font-semibold px-4 py-2 rounded-full`}>
                  <Sparkles size={14} />
                  {program.rewardLabel}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
                  >
                    Start Earning Today
                  </Link>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 border-2 border-brand-purple text-brand-purple font-semibold px-6 py-3 rounded-full hover:bg-brand-purple hover:text-white transition-colors text-sm"
                  >
                    <Phone size={13} />
                    Ask Us In-Store
                  </a>
                </div>
              </div>

              {/* Right: interactive stamp grid */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center">Your Card Preview</p>
                <div className="bg-lavender-50 rounded-2xl p-6 border border-lavender-100">
                  <StampGrid
                    total={program.total}
                    freeSlot={program.freeSlot}
                    stampColor={program.stampColor}
                    shouldReduce={shouldReduce}
                  />
                </div>
                <p className="text-xs text-center text-gray-400">Physical cards available at the salon</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Instagram banner */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white border border-lavender-100 rounded-3xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 card-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-pink to-brand-purple rounded-2xl flex items-center justify-center text-white">
              <InstagramIcon size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-purple mb-0.5">Follow Our Journey</p>
              <p className="font-serif text-lg font-bold text-charcoal">Stay in the loop on deals & looks</p>
              <p className="text-sm text-gray-500">@urmithreading.wayne</p>
            </div>
          </div>
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap text-sm shrink-0"
          >
            <InstagramIcon size={15} />
            Follow on Instagram
          </a>
        </motion.div>

      </div>
    </section>
  );
}
