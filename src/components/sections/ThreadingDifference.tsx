"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { MessageCircle, Sparkles, Heart, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: MessageCircle,
    title: "Consultation",
    body: "We shape with your face in mind, not a template.",
  },
  {
    icon: Sparkles,
    title: "Precision",
    body: "Threading removes hair in clean lines for sharper definition than waxing or tweezing.",
  },
  {
    icon: Heart,
    title: "Gentle",
    body: "No chemicals, no heat, no pulling. Safe for sensitive skin and all skin types.",
  },
  {
    icon: Clock,
    title: "Quick",
    body: "In and out in under 20 minutes — walk-ins always welcome.",
  },
];

export default function ThreadingDifference() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="py-24 bg-gradient-to-br from-brand-pink/10 via-white to-brand-purple/10"
      aria-label="How threading works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Technique"
          title="The Threading Difference"
          subtitle="Threading uses a twisted cotton thread to remove hair from the follicle — no wax, no chemicals, no skin damage. The result is a cleaner arch and sharper definition than any other method."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: shouldReduce ? 0 : i * 0.1 }}
              whileHover={shouldReduce ? {} : { y: -6, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }}
              className="bg-white rounded-2xl p-6 card-shadow border border-lavender-100 flex flex-col gap-4 cursor-default"
            >
              <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center shadow-md">
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-charcoal text-lg mb-1">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
