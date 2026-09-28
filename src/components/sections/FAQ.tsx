import { ChevronDown } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { formatPrice, getCatalogItem } from "@/lib/catalog";
import FAQSchema from "@/components/seo/FAQSchema";

const hoursSentence = BUSINESS.hours.map((h) => `${h.days}: ${h.open} – ${h.close}`).join("; ");

export const homepageFAQs = [
  {
    question: "How much does eyebrow threading cost?",
    answer: `Eyebrow threading starts at ${formatPrice(getCatalogItem("eyebrow-threading")!)}. View the full price menu for other services, or call ${BUSINESS.phone}.`,
  },
  {
    question: "Do I need an appointment?",
    answer: `Walk-ins are welcome during salon hours. You can also call ${BUSINESS.phone} or send an appointment request online. An online request is not confirmed until the salon confirms it.`,
  },
  {
    question: "What are your hours?",
    answer: `${hoursSentence}.`,
  },
  {
    question: "Where is the salon?",
    answer: `We have one salon location: ${BUSINESS.address.full}. Use Get Directions for a current route.`,
  },
  {
    question: "Is a facial the same as facial threading?",
    answer:
      "No. A facial is a skincare treatment. Facial threading removes unwanted facial hair. Each has its own page and pricing.",
  },
];

// Native <details> keeps the accordion keyboard-operable without client JS.
export default function FAQ() {
  return (
    <section id="faq" className="py-14 sm:py-20 bg-white" aria-labelledby="faq-home-heading">
      <FAQSchema faqs={homepageFAQs} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="faq-home-heading" className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-8 text-center">
          Common Questions
        </h2>
        <div className="space-y-3">
          {homepageFAQs.map((faq) => (
            <details key={faq.question} className="group border border-lavender-100 rounded-2xl bg-white">
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold text-charcoal min-h-11 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown size={20} aria-hidden="true" className="text-brand-purple-strong shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-gray-700 leading-relaxed text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
