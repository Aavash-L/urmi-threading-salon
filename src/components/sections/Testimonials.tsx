"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import StarRating from "@/components/ui/StarRating";
import { TESTIMONIALS } from "@/lib/testimonials";
import { BUSINESS } from "@/lib/constants";

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 card-shadow border border-lavender-100 mx-3">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-charcoal text-sm">{testimonial.name}</p>
          <p className="text-xs text-gray-500">Verified Google Review · {testimonial.date}</p>
        </div>
      </div>
      <StarRating rating={testimonial.rating} size={14} className="mb-3" />
      <Quote size={16} className="text-lavender-100 mb-2" />
      <p className="text-gray-600 text-sm leading-relaxed">{testimonial.text}</p>
      <span className="inline-block mt-3 text-xs font-medium text-brand-purple bg-lavender-50 px-2 py-1 rounded-full">
        {testimonial.service}
      </span>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 bg-lavender-50 overflow-hidden" aria-label="Customer testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionHeading
          eyebrow="What Clients Say"
          title="Trusted by Thousands Across Wayne, NJ"
          subtitle="Real reviews from real clients who keep coming back — and send their friends."
        />
      </div>

      {/* Marquee */}
      <div
        className="relative group"
        role="region"
        aria-label="Scrolling testimonials"
      >
        <div
          ref={trackRef}
          className={`flex ${shouldReduce ? "" : "animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]"}`}
          style={shouldReduce ? {} : undefined}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <a
          href={BUSINESS.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-brand-purple font-semibold hover:underline text-sm"
        >
          Read all 137+ reviews on Google →
        </a>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
