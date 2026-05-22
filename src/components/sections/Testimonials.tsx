"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/testimonials";
import { BUSINESS } from "@/lib/constants";

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.urmithreadingsalon.com",
  name: "Urmi Threading Salon",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "138",
    bestRating: "5",
  },
  review: TESTIMONIALS.slice(0, 6).map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: { "@type": "Rating", ratingValue: t.rating.toString(), bestRating: "5" },
    reviewBody: t.text,
    datePublished: new Date().getFullYear().toString(),
  })),
};

const featured = TESTIMONIALS.slice(0, 6);

export default function Testimonials() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-24 bg-lavender-50" aria-label="Customer testimonials">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What Clients Say"
          title="Trusted by Thousands Across Wayne, NJ"
          subtitle="Real reviews from real clients who keep coming back — and send their friends."
        />

        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 mb-14">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-charcoal">4.7</span>
          </div>
          <span className="text-lavender-100 hidden sm:block">|</span>
          <div className="flex items-center gap-1.5">
            <GoogleIcon />
            <span className="text-gray-600 text-sm font-medium">138+ Google Reviews</span>
          </div>
          <span className="text-lavender-100 hidden sm:block">|</span>
          <span className="text-gray-600 text-sm font-medium">15+ Years in Wayne, NJ</span>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: shouldReduce ? 0 : i * 0.08 }}
              className="bg-white rounded-2xl p-6 card-shadow border border-lavender-100 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < t.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-lavender-50">
                <div>
                  <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.service} · {t.date}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">
                  <GoogleIcon />
                  Verified
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={BUSINESS.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-purple font-semibold hover:underline underline-offset-4 text-sm"
          >
            Read all 138+ reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
