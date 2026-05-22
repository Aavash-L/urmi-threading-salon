import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Sparkles, ShieldCheck, Clock, MapPin, Phone, Star, ChevronDown } from "lucide-react";
import GradientBlob from "@/components/ui/GradientBlob";
import { BUSINESS } from "@/lib/constants";
import { threadingHeroImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Eyebrow Threading in Wayne, NJ | Urmi Threading Salon",
  description:
    "Wayne, NJ's top-rated eyebrow threading salon since 2010. 4.7★ with 137+ Google reviews. Precision threading by experienced estheticians. Walk-ins welcome. Call (973) 653-9322.",
  alternates: { canonical: "https://www.urmithreadingsalon.com/eyebrow-threading-wayne-nj" },
  keywords: [
    "eyebrow threading Wayne NJ",
    "threading salon Wayne",
    "best eyebrow threading near me",
    "eyebrow salon Wayne New Jersey",
  ],
  openGraph: {
    title: "Eyebrow Threading in Wayne, NJ | Urmi Threading Salon",
    description:
      "Wayne's most trusted threading salon since 2010. 137+ five-star reviews. Walk-ins welcome at 150 Hinchman Ave.",
    url: "https://www.urmithreadingsalon.com/eyebrow-threading-wayne-nj",
    type: "website",
    images: [{ url: "/og/eyebrow-threading-wayne-nj.jpg", width: 1200, height: 630 }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.urmithreadingsalon.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.urmithreadingsalon.com/services" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Eyebrow Threading in Wayne, NJ",
      item: "https://www.urmithreadingsalon.com/eyebrow-threading-wayne-nj",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Eyebrow Threading",
  provider: {
    "@type": "BeautySalon",
    name: "Urmi Threading Salon",
    "@id": "https://www.urmithreadingsalon.com",
  },
  areaServed: [
    { "@type": "City", name: "Wayne, NJ" },
    { "@type": "City", name: "Paterson, NJ" },
    { "@type": "City", name: "Clifton, NJ" },
    { "@type": "City", name: "Totowa, NJ" },
  ],
  description:
    "Precision eyebrow threading in Wayne, NJ. 15+ years of experience. Walk-ins welcome.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "137",
  },
};

const faqs = [
  {
    q: "How much does eyebrow threading cost in Wayne, NJ?",
    a: "Eyebrow threading at Urmi Threading Salon starts at $10 and varies based on the service. We offer competitive pricing for Wayne and surrounding areas. Call us at (973) 653-9322 for an exact quote — we're happy to answer over the phone.",
  },
  {
    q: "Does eyebrow threading hurt?",
    a: "Most clients describe the sensation as a mild, brief sting — much less irritating than waxing. The discomfort fades within seconds. Our estheticians use a particularly gentle technique that minimizes any sensitivity, and first-timers are often surprised by how quick and painless the process is.",
  },
  {
    q: "How long does threading last compared to waxing?",
    a: "Eyebrow threading typically lasts 3 to 6 weeks, similar to waxing. Because threading removes hair at the follicle level, regrowth is slower and often finer over time. Many of our clients find they need to come in less frequently the longer they stick with threading.",
  },
  {
    q: "Do I need an appointment or can I walk in?",
    a: "Walk-ins are always welcome at Urmi Threading Salon! For busy days — especially weekends — we recommend booking online or calling ahead to reserve your spot. Most clients are in and out in under 20 minutes.",
  },
  {
    q: "Is threading better than waxing for sensitive skin?",
    a: "Yes — threading is generally the better choice for sensitive skin. It uses no chemicals, no heat, and nothing that touches the skin except a thin cotton thread. There's no risk of burns or allergic reactions, which makes it a popular choice for clients who react badly to waxing.",
  },
  {
    q: "How often should I get my eyebrows threaded?",
    a: "Most clients come in every 3 to 4 weeks to maintain their shape. If you're growing out your brows or going for a fuller look, you may want to wait 4 to 6 weeks between sessions. Our estheticians will recommend a schedule based on your hair growth and goals.",
  },
  {
    q: "Can I get threading while pregnant?",
    a: "Threading is generally considered safe during pregnancy since it uses no chemicals, heat, or products applied to the skin. However, we always recommend consulting your OB-GYN first. Many of our clients continue threading safely throughout their pregnancies.",
  },
  {
    q: "What should I do before my appointment?",
    a: "Arrive with a clean face — no heavy makeup on the brow area. If you wear glasses, consider leaving them at home or bringing contacts. That's really it. There's no numbing or special prep required. Just show up and we'll handle the rest.",
  },
  {
    q: "What should I avoid after threading?",
    a: "Avoid touching the threaded area, applying heavy makeup, or exposing the skin to direct sun or steam for at least 24 hours. Your skin may be slightly pink immediately after — this is completely normal and fades within an hour for most clients.",
  },
  {
    q: "Do you also do face threading and upper lip threading?",
    a: "Absolutely. In addition to eyebrow threading, we offer full face threading including upper lip, chin, sides, cheeks, and forehead. Visit our full services page to see everything we offer, or call us to ask about any specific area.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const whyCards = [
  {
    icon: Award,
    title: "15+ Years of Mastery",
    body: "Founded in 2010, we've shaped over 10,000 brows. Every esthetician on our team trained under our founder's exact technique.",
  },
  {
    icon: Sparkles,
    title: "Gentle, Precise Technique",
    body: "We work with the natural shape of your face, never against it. Clients consistently tell us our threading is the gentlest they've experienced.",
  },
  {
    icon: ShieldCheck,
    title: "Spotless Salon, Sanitized Tools",
    body: "Every tool is sanitized between clients. We follow strict hygiene guidelines and our salon is cleaned throughout the day.",
  },
  {
    icon: Clock,
    title: "No Long Waits",
    body: "Walk-ins welcome. Most clients are in and out in under 20 minutes — including consultation.",
  },
];

const reviews = [
  {
    text: "I've been going to Urmi for years and I won't go anywhere else. The threading is so precise and gentle — my brows have never looked better. The salon is always spotless and the staff remembers exactly how I like my shape.",
    name: "Priya S.",
    location: "Wayne, NJ",
  },
  {
    text: "First time getting eyebrow threading and I was nervous, but honestly it barely hurt and the results were amazing. My brows looked perfectly arched. I was in and out in 15 minutes. Already booked my next appointment.",
    name: "Maria C.",
    location: "Clifton, NJ",
  },
  {
    text: "Best threading salon in the area, hands down. I've tried a few others and nothing compares. The estheticians here really know what they're doing — they shaped my brows to actually fit my face, not just a generic arch.",
    name: "Aisha K.",
    location: "Paterson, NJ",
  },
];

const serviceArea = [
  { city: "Wayne, NJ", drive: "You're here", slug: "wayne-nj" },
  { city: "Paterson, NJ", drive: "8 min", slug: "paterson-nj" },
  { city: "Clifton, NJ", drive: "12 min", slug: "clifton-nj" },
  { city: "Totowa, NJ", drive: "6 min", slug: "totowa-nj" },
  { city: "Little Falls, NJ", drive: "10 min", slug: "little-falls-nj" },
  { city: "Fair Lawn, NJ", drive: "15 min", slug: "fair-lawn-nj" },
  { city: "Paramus, NJ", drive: "18 min", slug: "paramus-nj" },
];

export default function EyebrowThreadingWayneNJ() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── 1. Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="bg-lavender-50 border-b border-lavender-100">
        <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <li><Link href="/" className="hover:text-brand-purple transition-colors">Home</Link></li>
          <li aria-hidden="true">›</li>
          <li><Link href="/services" className="hover:text-brand-purple transition-colors">Services</Link></li>
          <li aria-hidden="true">›</li>
          <li className="text-charcoal font-medium" aria-current="page">Eyebrow Threading in Wayne, NJ</li>
        </ol>
      </nav>

      {/* ── 2. Hero ── */}
      <section className="relative bg-blush-50 overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20" aria-label="Hero">
        <GradientBlob color="pink" className="-top-32 -left-32" size={500} />
        <GradientBlob color="purple" className="-bottom-32 -right-32" size={400} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/80 border border-lavender-100 rounded-full px-4 py-2 text-xs font-semibold text-brand-purple shadow-sm">
                <MapPin size={12} />
                150 Hinchman Ave, Wayne, NJ 07470
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
                Eyebrow Threading{" "}
                <span className="text-brand-gradient">in Wayne, NJ</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                15+ years shaping Wayne&apos;s brows. 137+ five-star Google reviews. Walk-ins welcome every day.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/book"
                  className="text-center bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition-opacity"
                >
                  Book Appointment
                </Link>
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="text-center flex items-center justify-center gap-2 border-2 border-brand-purple text-brand-purple font-semibold px-8 py-4 rounded-full hover:bg-brand-purple hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  Call (973) 653-9322
                </a>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-charcoal">4.7 · 137+ reviews</span>
                </div>
                <div className="h-4 w-px bg-lavender-100 hidden sm:block" />
                <span className="text-sm text-gray-600">Est. <strong className="text-charcoal">2010</strong></span>
                <div className="h-4 w-px bg-lavender-100 hidden sm:block" />
                <span className="text-sm text-gray-600"><strong className="text-charcoal">Sanitized</strong> tools every client</span>
              </div>
            </div>

            {/* Image */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
                <Image
                  src={threadingHeroImage.src}
                  alt={threadingHeroImage.alt}
                  fill
                  sizes="50vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-lavender-100">
                <p className="text-xs font-bold text-charcoal">Wayne, NJ&apos;s #1 Threading Salon</p>
                <p className="text-xs text-gray-500">15+ years · 137+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Intro ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">
            Wayne&apos;s Most Trusted Eyebrow Threading Salon
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              Located at <strong>150 Hinchman Ave in Wayne, New Jersey</strong>, Urmi Threading Salon has been
              the go-to destination for precision eyebrow threading since 2010. Over 15 years, we&apos;ve built
              a reputation that speaks for itself: 137+ five-star Google reviews from real Wayne residents and
              clients who drive in from across Passaic County.
            </p>
            <p>
              Unlike salons where threading is offered as a side service, eyebrow threading is our specialty.
              Every esthetician on our team is trained in the traditional cotton-thread technique — no wax,
              no razors, no shortcuts. The result is a cleaner arch, a sharper line, and a more natural shape
              than any other method can deliver.
            </p>
            <p>
              We proudly serve <strong>Wayne, Paterson, Clifton, Totowa, Little Falls, Fair Lawn, and Paramus</strong>.
              Whether you&apos;re a first-timer curious about eyebrow threading or a longtime threading client
              looking for a salon you can trust, you&apos;ll feel the difference from your very first visit.
              Walk-ins are always welcome — or{" "}
              <Link href="/book" className="text-brand-purple underline underline-offset-2 hover:opacity-80 transition-opacity">
                book your appointment online
              </Link>{" "}
              in under a minute.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. What is threading ── */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">
            What Is Eyebrow Threading?
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              Eyebrow threading is an ancient hair removal technique with roots in the Middle East and
              South Asia, practiced for thousands of years. The method uses a thin, twisted cotton thread
              that is rolled across the skin, catching individual hairs and removing them directly from
              the follicle — all without touching the skin with anything but the thread itself.
            </p>
            <p>
              Because the thread moves in a straight line, threading produces cleaner, sharper results than
              waxing or tweezing. Each hair is removed individually, giving our estheticians precise control
              over exactly which hairs come out and which stay. The result is a defined, symmetrical arch
              that waxing simply cannot replicate.
            </p>
            <p>
              There are no chemicals involved. No heat. No adhesives that pull at the skin. This makes
              threading particularly well-suited for clients with sensitive skin, rosacea, or anyone who
              uses retinol or other topical treatments that make skin more fragile. It&apos;s also safe for
              all skin tones and hair textures.
            </p>
            <p>
              Threading is widely considered the gold standard for eyebrow shaping — and it&apos;s why
              clients who try it rarely go back to anything else. At Urmi, every threading service is
              performed with the traditional hand technique passed down through generations of professional
              practice. See our full{" "}
              <Link href="/services/eyebrow-threading" className="text-brand-purple underline underline-offset-2 hover:opacity-80 transition-opacity">
                eyebrow threading service page
              </Link>{" "}
              for more details.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Why choose Urmi ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-3 text-center">
            Why Wayne, NJ Chooses Urmi for Eyebrow Threading
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We&apos;ve earned our reputation one appointment at a time. Here&apos;s what keeps our clients coming back.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyCards.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 bg-lavender-50 rounded-2xl p-6 border border-lavender-100"
              >
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Icon size={20} className="text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-charcoal text-lg mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. What to expect ── */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-10">
            What to Expect at Your Appointment
          </h2>
          <ol className="space-y-6">
            {[
              {
                n: "1",
                title: "Consultation",
                body: "We discuss the brow shape that best suits your face structure, features, and personal style. If you have reference photos, bring them — we love seeing your vision.",
              },
              {
                n: "2",
                title: "Cleanse",
                body: "We gently clean the brow area to remove any oils or product. This ensures a clean surface and helps the thread grip each hair evenly.",
              },
              {
                n: "3",
                title: "Threading",
                body: "Precision shaping using the traditional cotton-thread technique. Most eyebrow appointments take 5 to 10 minutes from start to finish.",
              },
              {
                n: "4",
                title: "Soothing",
                body: "We apply a calming gel to the treated area to reduce any redness and soothe the skin. Most clients see no visible redness within an hour.",
              },
              {
                n: "5",
                title: "Final Check",
                body: "You approve the shape in a handheld mirror before you leave. We won&apos;t call it done until you&apos;re happy. Your brows, your call.",
              },
            ].map(({ n, title, body }) => (
              <li key={n} className="flex gap-5 items-start">
                <div className="w-9 h-9 rounded-full bg-brand-gradient text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                  {n}
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 7. Pricing ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">Pricing</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our pricing is straightforward and affordable. Eyebrow threading is our most popular service and
            we offer competitive rates for Wayne and surrounding areas. For exact current pricing, call us at{" "}
            <a href={`tel:${BUSINESS.phoneRaw}`} className="text-brand-purple font-semibold hover:opacity-80 transition-opacity">
              (973) 653-9322
            </a>{" "}
            — we&apos;re happy to quote any service over the phone. You can also view our{" "}
            <Link href="/pricing" className="text-brand-purple underline underline-offset-2 hover:opacity-80 transition-opacity">
              full pricing menu
            </Link>{" "}
            for all services and current rates.
          </p>
          <div className="bg-lavender-50 border border-lavender-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-charcoal">New client? Get $5 off your first visit.</p>
              <p className="text-sm text-gray-500 mt-1">Just mention it when you book — no coupon needed.</p>
            </div>
            <Link
              href="/book"
              className="shrink-0 bg-brand-gradient text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. Service area ── */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-3">
            Serving Wayne and Surrounding Areas
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            Conveniently located at 150 Hinchman Ave in Wayne, NJ — easily reachable from Route 23
            and Route 46. Clients drive to us from across Passaic and Bergen counties.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {serviceArea.map(({ city, drive, slug }) => (
              <Link
                key={slug}
                href={`/locations/${slug}`}
                className="group bg-white border border-lavender-100 rounded-2xl p-4 hover:border-brand-purple transition-colors card-shadow"
              >
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-brand-pink mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal text-sm group-hover:text-brand-purple transition-colors">
                      {city}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{drive}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Reviews ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-3 text-center">
            What Wayne, NJ Clients Say
          </h2>
          <p className="text-gray-600 text-center mb-12">Real reviews from our community.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {reviews.map(({ text, name, location }) => (
              <div
                key={name}
                className="bg-lavender-50 border border-lavender-100 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-charcoal text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{location}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                    Verified Google Review
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={BUSINESS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-purple font-semibold hover:underline underline-offset-4 transition-all"
            >
              Read all 137+ reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ── */}
      <section className="py-16 bg-lavender-50" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-10 text-center">
            Eyebrow Threading FAQ
          </h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white border border-lavender-100 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-charcoal text-sm sm:text-base select-none list-none hover:text-brand-purple transition-colors">
                  {q}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-brand-purple transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-lavender-50 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Location + hours ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-10">
            Visit Us in Wayne, NJ
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* NAP */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-pink mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-charcoal">Address</p>
                  <address className="not-italic text-gray-600 text-sm mt-1 leading-relaxed">
                    {BUSINESS.address.street}<br />
                    {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                  </address>
                  <a
                    href="https://maps.google.com/?q=150+Hinchman+Ave,+Wayne,+NJ+07470"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-purple font-semibold hover:underline mt-1 inline-block"
                  >
                    Get directions on Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-brand-pink shrink-0" />
                <div>
                  <p className="font-semibold text-charcoal">Phone</p>
                  <a href={`tel:${BUSINESS.phoneRaw}`} className="text-gray-600 text-sm hover:text-brand-purple transition-colors">
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>

              <div>
                <p className="font-semibold text-charcoal mb-3">Hours</p>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-lavender-50">
                    {BUSINESS.hours.map((h) => (
                      <tr key={h.days} className="py-2">
                        <td className="py-1.5 text-gray-600 font-medium pr-6">{h.days}</td>
                        <td className="py-1.5 text-gray-500">
                          {h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-lavender-100 shadow-md h-72 lg:h-auto">
              <iframe
                title="Urmi Threading Salon location map"
                src="https://maps.google.com/maps?q=150+Hinchman+Ave,+Wayne,+NJ+07470&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "288px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. Final CTA ── */}
      <section className="py-20 bg-gradient-to-br from-brand-pink/10 via-lavender-50 to-brand-purple/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
            Ready for Your Best Brows?
          </h2>
          <p className="text-gray-600 text-lg">
            Join 137+ Wayne, NJ clients who trust Urmi Threading Salon. Walk-ins welcome — or book your spot in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-brand-gradient text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:opacity-90 transition-opacity text-base"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="flex items-center justify-center gap-2 border-2 border-brand-purple text-brand-purple font-semibold px-10 py-4 rounded-full hover:bg-brand-purple hover:text-white transition-colors text-base"
            >
              <Phone size={16} />
              Call Now (973) 653-9322
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Also offering{" "}
            <Link href="/services" className="text-brand-purple hover:underline underline-offset-2">
              waxing, facials, lash extensions, and henna
            </Link>{" "}
            — view our{" "}
            <Link href="/about" className="text-brand-purple hover:underline underline-offset-2">
              full story
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
