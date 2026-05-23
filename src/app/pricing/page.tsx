"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Phone, Sparkles } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const menu = [
  {
    id: "threading",
    label: "Threading",
    emoji: "✨",
    items: [
      { name: "Eyebrow Threading",       price: "$10" },
      { name: "Men's Eyebrow",           price: "$10" },
      { name: "Upper Lip",               price: "$6"  },
      { name: "Lower Lip",               price: "$3"  },
      { name: "Chin",                    price: "$7"  },
      { name: "Forehead",                price: "$7"  },
      { name: "Side Threading",          price: "$12" },
      { name: "Neck Threading",          price: "$6"  },
      { name: "Cheek Threading",         price: "$6"  },
      { name: "Eye & Lip",               price: "$16" },
      { name: "Eye, Lip & Chin",         price: "$23" },
      { name: "Eye, Lip, Chin & Neck",   price: "$27" },
      { name: "Full Face",               price: "$35" },
      { name: "Full Face with Neck",     price: "$40" },
    ],
  },
  {
    id: "waxing",
    label: "Waxing",
    emoji: "🌿",
    items: [
      { name: "Eyebrow Wax",             price: "$12"  },
      { name: "Nose Wax (inside)",       price: "$6"   },
      { name: "Nose Wax",                price: "$12"  },
      { name: "Ear Wax",                 price: "$12"  },
      { name: "Under Arm Wax",           price: "$15"  },
      { name: "Stomach Line",            price: "$8"   },
      { name: "Stomach Wax",             price: "$30"  },
      { name: "Bikini Line",             price: "$20"  },
      { name: "Deep Bikini Wax",         price: "$30"  },
      { name: "Brazilian Wax",           price: "$45"  },
      { name: "Butt Wax",                price: "$25"  },
      { name: "Half Arm Wax",            price: "$20"  },
      { name: "Full Arm Wax",            price: "$30"  },
      { name: "Half Leg Wax",            price: "$30"  },
      { name: "Upper Half Leg Wax",      price: "$35"  },
      { name: "Full Leg Wax",            price: "$45"  },
      { name: "Arm, Leg & Underarm",     price: "$80"  },
      { name: "Back Neck Wax",           price: "$12"  },
      { name: "Women's Back Wax",        price: "$40"  },
      { name: "Women's Chest Wax",       price: "$45"  },
      { name: "Men's Back Wax",          price: "$50"  },
      { name: "Men's Chest Wax",         price: "$50"  },
      { name: "Full Body Wax",           price: "$180" },
    ],
  },
  {
    id: "facials",
    label: "Facials",
    emoji: "🌸",
    items: [
      { name: "Face Bleach",             price: "$35"  },
      { name: "Face Polish",             price: "$45"  },
      { name: "Eye Treatment",           price: "$50"  },
      { name: "Mini Facial",             price: "$45"  },
      { name: "Basic Facial",            price: "$65"  },
      { name: "Deep Cleaning Facial",    price: "$65"  },
      { name: "Acne Facial",             price: "$85"  },
      { name: "Fruits Facial",           price: "$80"  },
      { name: "Gold Facial",             price: "$80"  },
      { name: "Repechage Facial",        price: "$80"  },
      { name: "Diamond Facial",          price: "$90"  },
      { name: "Four Layer Facial",       price: "$120" },
    ],
  },
  {
    id: "lash-brow",
    label: "Lash & Brow",
    emoji: "👁️",
    items: [
      { name: "Eyebrow Tinting",         price: "$15" },
      { name: "Eyelash Tinting",         price: "$20" },
      { name: "Eyelash Extensions",      price: "$50" },
      { name: "Eyelash Lifting",         price: "$55" },
    ],
  },
  {
    id: "henna",
    label: "Henna",
    emoji: "🌺",
    items: [
      { name: "Henna Design (hands)",    price: "Quote" },
      { name: "Henna Design (feet)",     price: "Quote" },
      { name: "Henna Design (full)",     price: "Quote" },
    ],
  },
  {
    id: "gift",
    label: "Gift Cards",
    emoji: "🎁",
    items: [
      { name: "Gift Card",               price: "$25"  },
      { name: "Gift Card",               price: "$50"  },
      { name: "Gift Card",               price: "$100" },
    ],
  },
];

export default function PricingPage() {
  const [active, setActive] = useState("threading");
  const shouldReduce = useReducedMotion();
  const category = menu.find((m) => m.id === active)!;

  return (
    <div className="min-h-screen bg-lavender-50">
      {/* Header */}
      <div className="bg-white border-b border-lavender-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-purple mb-3">Full Menu</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Services &amp; <span className="text-brand-gradient">Pricing</span>
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
            All prices listed are starting prices and may vary based on hair length and density. Walk-ins welcome — no hidden fees.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/book"
              className="bg-brand-gradient text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="flex items-center gap-2 border-2 border-brand-purple text-brand-purple font-semibold px-6 py-3 rounded-full hover:bg-brand-purple hover:text-white transition-colors text-sm"
            >
              <Phone size={14} />
              Call to Ask
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {menu.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active === cat.id
                  ? "bg-brand-gradient text-white shadow-md"
                  : "bg-white border border-lavender-100 text-gray-600 hover:border-brand-purple"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Price list */}
        <motion.div
          key={active}
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl card-shadow border border-lavender-100 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-lavender-50 flex items-center gap-2">
            <span className="text-xl">{category.emoji}</span>
            <h2 className="font-serif text-xl font-bold text-charcoal">{category.label}</h2>
            <span className="ml-auto text-xs text-gray-400">{category.items.length} services</span>
          </div>

          <div className="divide-y divide-lavender-50">
            {category.items.map((item, i) => (
              <motion.div
                key={i}
                initial={shouldReduce ? {} : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: shouldReduce ? 0 : i * 0.03 }}
                className="flex items-center justify-between px-6 py-3.5 hover:bg-lavender-50/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={10} className="text-brand-purple/40 shrink-0" />
                  <span className="text-sm text-charcoal font-medium">{item.name}</span>
                </div>
                <span className={`text-sm font-bold ${item.price === "Quote" ? "text-brand-purple" : "text-charcoal"}`}>
                  {item.price}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Prices may vary. Call <a href={`tel:${BUSINESS.phoneRaw}`} className="text-brand-purple hover:underline">{BUSINESS.phone}</a> for a custom quote.
        </p>
      </div>
    </div>
  );
}
