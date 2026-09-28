import Image from "next/image";
import { MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { heroImage } from "@/lib/images";
import { CallButton, CallHelper, DirectionsLink, RequestButton, WalkInsNote } from "@/components/ui/CallCta";

// Server-rendered and not animated, so the heading, number and actions are
// visible on first paint.
export default function Hero() {
  return (
    <section className="relative bg-blush-50 pt-28 sm:pt-32 pb-12 sm:pb-16" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-5 min-w-0">
            <p className="inline-flex items-center gap-2 bg-white border border-lavender-100 rounded-full px-4 py-2 text-sm font-medium text-brand-purple-strong">
              <MapPin size={14} aria-hidden="true" />
              Family-owned salon in Wayne, NJ
            </p>

            <h1
              id="hero-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight"
            >
              Eyebrow Threading &amp; Beauty Services in Wayne, NJ
            </h1>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl">
              Eyebrow threading from $10, plus waxing, facials, lashes, henna, and tinting.
              Visit us at 150 Hinchman Ave. Walk-ins are welcome during salon hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <CallButton placement="home_hero" />
              <RequestButton placement="home_hero" />
            </div>
            <CallHelper className="max-w-xl" />

            <div className="pt-1 space-y-1">
              <address className="not-italic text-sm text-gray-700">{BUSINESS.address.full}</address>
              <WalkInsNote />
              <DirectionsLink placement="home_hero" />
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
