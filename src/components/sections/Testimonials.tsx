import { ArrowUpRight, PenLine } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

// No quotes are shown: none of the previous testimonials had a recorded source or
// permission. The rating/count stays hidden until BUSINESS.reviews.verified is true.
export default function Testimonials() {
  const { reviews } = BUSINESS;
  return (
    <section id="reviews" className="py-14 sm:py-20 bg-lavender-50" aria-labelledby="reviews-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="reviews-heading" className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-3">
          Client Reviews
        </h2>
        <p className="text-gray-700">Read client feedback on Google before your visit.</p>
        {reviews.verified && (
          <p className="mt-3 text-charcoal font-semibold">
            Rated {reviews.rating.toFixed(1)} out of 5 on Google from {reviews.count} reviews
          </p>
        )}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={reviews.readUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-brand-purple-strong text-brand-purple-strong font-semibold px-6 min-h-11 rounded-full hover:bg-lavender-100"
          >
            Read Reviews on Google <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a
            href={reviews.writeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11 px-4"
          >
            <PenLine size={15} aria-hidden="true" /> Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}
