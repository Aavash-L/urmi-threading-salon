"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQSchema from "@/components/seo/FAQSchema";

export const homepageFAQs = [
  {
    question: "What is eyebrow threading and how is it different from waxing?",
    answer:
      "Eyebrow threading uses a doubled cotton thread twisted in a rolling motion to remove hair directly from the follicle. Unlike waxing, it applies no heat or chemicals to your skin, making it much gentler — particularly for sensitive skin or clients using retinol, acne medications, or other active skincare products. Threading also provides superior precision, allowing us to shape individual hairs for a cleaner, more defined result.",
  },
  {
    question: "Does threading hurt?",
    answer:
      "There is a mild, brief discomfort — similar to a quick snap. Most clients describe it as much gentler than they expected, especially compared to waxing. The sensation fades immediately after the thread passes. After a few sessions, many clients barely notice the feeling at all.",
  },
  {
    question: "How long does threading last?",
    answer:
      "Eyebrow threading typically lasts 3–4 weeks. Full face threading results last 2–3 weeks, depending on how quickly your hair grows. Regular threading is one of the best ways to slow regrowth over time, as repeated sessions weaken the hair follicle.",
  },
  {
    question: "Do I need an appointment or can I walk in?",
    answer:
      "Walk-ins are always welcome at Urmi Threading Salon. We manage our schedule to keep wait times minimal — most walk-in clients are seen within 15 minutes. If you prefer a guaranteed time, you can also book an appointment online or by calling us at (973) 653-9322.",
  },
  {
    question: "How much does eyebrow threading cost in Wayne, NJ?",
    answer:
      "Our threading prices are affordable and competitive for the Wayne, NJ area. For current pricing on eyebrow threading and all services, please call us at (973) 653-9322. We believe exceptional threading should be accessible — no surprises, no pressure.",
  },
  {
    question: "Is threading safe for sensitive skin?",
    answer:
      "Yes — threading is actually the preferred hair removal method for sensitive skin. Because only the thread touches the skin (never wax or chemicals), there's far less risk of irritation, redness, or allergic reaction. Many clients who've had wax reactions find threading completely comfortable.",
  },
  {
    question: "Can I get threading while pregnant?",
    answer:
      "Threading is generally considered safe during pregnancy, as it uses no chemicals or heat. Many of our clients continue threading throughout their pregnancies without issue. That said, we always recommend checking with your healthcare provider before any beauty treatments during pregnancy, as skin can become more sensitive.",
  },
  {
    question: "What should I do before and after my threading appointment?",
    answer:
      "Before: Cleanse your face and avoid applying heavy moisturizers or serums to the brow area. Avoid waxing or using retinol products for 48 hours before. After: Skip heavy makeup on the threaded area for at least 2 hours. A cool aloe vera gel can soothe any redness. Avoid direct sun exposure and hot showers immediately after threading.",
  },
];

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: shouldReduce ? 0 : index * 0.06 }}
      className="border border-lavender-100 rounded-2xl overflow-hidden"
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-lavender-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-charcoal text-base">{faq.question}</span>
        <ChevronDown
          size={20}
          className={`text-brand-purple shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={shouldReduce ? {} : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-14 sm:py-24 bg-white" aria-label="Frequently asked questions">
      <FAQSchema faqs={homepageFAQs} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Common Questions, Honest Answers"
          subtitle="Everything you need to know before your first threading appointment — or your fiftieth."
        />
        <div className="mt-8 sm:mt-12 space-y-3">
          {homepageFAQs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
