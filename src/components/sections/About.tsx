import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { salonStationsImage } from "@/lib/images";

export default function About() {
  return (
    <section id="about" className="py-14 sm:py-20 bg-white" aria-labelledby="story-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
          <Image
            src={salonStationsImage.src}
            alt={salonStationsImage.alt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-4 min-w-0">
          <h2 id="story-heading" className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
            Personal Care at Our Wayne Salon
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Urmi Threading Salon is a family-owned salon at 150 Hinchman Ave in Wayne.
            Explore threading, waxing, facials, lashes, henna, and tinting, then call
            with questions or request an appointment.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11"
          >
            About our family-owned salon <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
