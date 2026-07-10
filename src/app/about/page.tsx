import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { BUSINESS, SITE_URL } from "@/lib/constants";
import { aboutImage1, aboutImage2, salonInteriorImage } from "@/lib/images";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us — 15+ Years Threading in Wayne, NJ",
  description:
    "Learn the story behind Urmi Threading Salon in Wayne, NJ — 15+ years of precision threading, genuine care, and a community built one beautiful brow at a time.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const values = [
  { title: "Precision above all else", description: "We study your face before touching a thread. Every arch is shaped to you — not to a template." },
  { title: "Hygiene as a baseline", description: "Tools are sanitized between every client without exception. CDC-compliant protocol is not a selling point — it's a standard." },
  { title: "Honesty over upselling", description: "We'll tell you what your skin needs and what it doesn't. Your trust matters more than an extra service sale." },
  { title: "Community roots", description: "Wayne is our neighborhood. The clients we serve are our neighbors. That shapes how we show up every day." },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "About", url: `${SITE_URL}/about` }]} />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-purple mb-3">Our Story</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-5">
            15 Years. One Craft. Thousands of Beautiful Brows.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Urmi Threading Salon has been part of the Wayne, NJ community since 2010. We opened with
            a single purpose: to give every client the kind of careful, skilled threading that makes
            them feel genuinely cared for — not rushed, not upsold, just seen.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Threading is one of the oldest hair removal techniques in the world — and one of the most demanding
                to do well. The technique itself takes minutes to learn and years to master. The difference between
                an average threading experience and an exceptional one isn&apos;t speed or price. It&apos;s the ability
                to read a face.
              </p>
              <p>
                We&apos;ve spent 15 years developing that ability. We&apos;ve shaped brows for teenagers getting their first
                threading appointment and for women who&apos;ve been threading for decades. We&apos;ve learned that every
                face tells you what it needs — you just have to know how to listen.
              </p>
              <p>
                Our clients keep coming back not just because their brows look great, but because they trust us.
                They trust that we&apos;ll use clean, sanitized tools. They trust that we won&apos;t push services they don&apos;t
                need. They trust that the person in the chair next to them received the same care they did.
                That trust is everything to us.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] relative">
                <Image src={aboutImage1.src} alt={aboutImage1.alt} fill className="object-cover" sizes="200px" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] relative mt-8">
                <Image src={aboutImage2.src} alt={aboutImage2.alt} fill className="object-cover" sizes="200px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 15, suffix: "+", label: "Years in Business" },
              { value: 155, suffix: "+", label: "Google Reviews" },
              { value: 10000, suffix: "+", label: "Brows Shaped" },
              { value: 4, suffix: ".8 ★", label: "Avg Rating" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 card-shadow">
                <p className="font-serif text-4xl font-bold text-brand-purple">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-10 text-center">How We Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="flex items-start gap-4 bg-lavender-50 rounded-2xl p-6">
                <CheckCircle2 size={20} className="text-brand-purple shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Salon image */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden relative aspect-video">
            <Image
              src={salonInteriorImage.src}
              alt={salonInteriorImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-gradient text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Come experience the difference.</h2>
          <p className="mb-8 opacity-90">
            Visit us at 150 Hinchman Ave, Wayne, NJ 07470. Walk-ins always welcome.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book" className="bg-white text-brand-purple font-semibold px-8 py-4 rounded-full hover:bg-lavender-50 transition-colors">
              Book Appointment
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
