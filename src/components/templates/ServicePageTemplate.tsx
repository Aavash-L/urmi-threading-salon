import Link from "next/link";
import { CheckCircle2, Clock, Phone, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";
import { BUSINESS, SITE_URL } from "@/lib/constants";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import { galleryImages } from "@/lib/images";
import Image from "next/image";

interface ServicePageTemplateProps {
  service: Service;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const serviceUrl = `${SITE_URL}/services/${service.slug}`;
  const previewImages = galleryImages.slice(0, 3);

  const extraContent: Record<string, { intro: string; para2: string; para3: string }> = {
    "eyebrow-threading": {
      intro:
        "Eyebrow threading is one of the oldest forms of hair removal, originating in the Middle East and South Asia thousands of years ago. Today, it remains the gold standard for brow shaping because nothing else combines its precision, gentleness, and clean results. At Urmi Threading Salon, we've spent 15 years perfecting this ancient technique.",
      para2:
        "The process uses a doubled strand of 100% cotton thread, twisted into a loop. The technician rolls this loop across the skin, capturing hairs along the way and lifting them cleanly from the follicle. Because only thread contacts the skin — no wax, no chemicals, no heat — even the most reactive skin types tolerate threading exceptionally well.",
      para3:
        "What sets a great threading technician apart from a mediocre one isn't just speed — it's the ability to read a face. Your bone structure, the natural arch of your brow, the spacing between your eyes: these all inform where that arch should peak, how thick the tail should remain, and what removal will make your face glow versus look overdone. That judgment takes years to develop. Ours has been developing since 2010.",
    },
    "face-threading": {
      intro:
        "Full face threading addresses every area where unwanted facial hair can appear: the upper lip, chin, sideburns (cheeks), and forehead. Done properly, it leaves skin looking smooth, bright, and polished — without the redness or chemical exposure that waxing can cause. At Urmi Threading Salon, a full face threading session typically takes 20–30 minutes.",
      para2:
        "The upper lip is the most sensitive area for most clients, and also one of the most rewarding to thread. Even fine peach fuzz, when threaded away, creates a visible difference in how lipstick applies and how smooth the skin looks. The chin and sides of the face often harbor coarser hairs that contribute to a shadowy appearance — threading these away brightens the complexion immediately.",
      para3:
        "We always start with the brows to set the frame, then work systematically across the face. Between each area, we apply a light cool aloe touch to calm the skin. Most clients are surprised by how quickly the session goes and how little discomfort there is. First-timers almost always leave saying it was much easier than they expected.",
    },
    "waxing": {
      intro:
        "Body waxing remains one of the most effective methods for removing larger areas of unwanted hair, delivering results that last far longer than shaving. At Urmi Threading Salon, we use premium wax formulas designed to grip the hair — not the skin — for a treatment that's both thorough and comfortable.",
      para2:
        "We offer waxing for arms, underarms, legs (half or full), bikini, and back. Each area gets its own preparation and technique. Pre-wax oil protects the skin barrier before application; post-wax soothing lotion closes the follicles and prevents ingrown hairs. We work quickly and methodically — most clients find the anticipation worse than the treatment itself.",
      para3:
        "With regular waxing, hair grows back finer and sparser over time. Many long-term clients report that their regrowth is noticeably softer after just a few months of consistent appointments. If you're new to waxing, the most important prep step is letting your hair grow to at least a quarter inch — roughly two to three weeks past your last shave.",
    },
    "facials": {
      intro:
        "A well-executed facial does far more than just clean the surface of your skin. At Urmi Threading Salon, every facial begins with a skin assessment — because the right cleanser, mask, and active ingredients for dry skin are completely different from those needed for oily or combination skin. We don't do one-size-fits-all facials.",
      para2:
        "Our standard facial includes double cleansing, steam, gentle extractions where needed, a custom mask, and a finishing serum and moisturizer matched to your skin type. If your skin is stressed, dehydrated, or congested, we adjust every product to address what you actually need that day. Skin is dynamic — your facial should be too.",
      para3:
        "Regular facials, spaced 4–6 weeks apart, produce compounding benefits. The first visit cleans the slate; subsequent visits maintain the results and allow us to track how your skin is changing. Many clients notice that their home skincare products start working better after consistent facial treatments because their skin is better prepared to absorb them.",
    },
    "eyelash-extensions": {
      intro:
        "Eyelash extensions are the ultimate low-maintenance beauty upgrade — wake up every morning with full, defined lashes and skip the mascara entirely. At Urmi Threading Salon, we use medical-grade adhesive and individually apply each extension to a single natural lash, creating a look that moves naturally and stays comfortable all day.",
      para2:
        "The application process takes 60–90 minutes for a full set. You'll lie comfortably with your eyes closed while we work, applying extensions one by one to ensure even distribution and proper weight balance. The result can be as natural or as dramatic as you prefer — we'll discuss your desired look in detail before we begin.",
      para3:
        "The key to long-lasting lash extensions is proper aftercare. Avoid water for the first 24–48 hours, sleep on your back when possible, use oil-free products near the eyes, and brush your lashes gently each morning with a clean spoolie. With good care, a full set typically lasts 4–6 weeks before you need a fill. Fills, which take 45–60 minutes, maintain the fullness as natural lashes shed.",
    },
    "henna": {
      intro:
        "Henna has been used for thousands of years across South Asia, the Middle East, and North Africa for body art and celebration. At Urmi Threading Salon, we work exclusively with 100% natural henna paste — no black henna, no chemical additives — to ensure safe, vibrant results on all skin types.",
      para2:
        "Natural henna stains the skin through a compound called lawsone, which binds to the keratin in the outer skin layer. The color develops over the first 24–48 hours, deepening from orange to a rich brown or red-brown depending on your skin tone and how well you care for the paste after application. Hands and feet, where the skin is thickest, produce the deepest, longest-lasting stains.",
      para3:
        "We offer henna for weddings, Eid, Diwali, baby showers, birthdays, and everyday occasions. Our design options range from simple florals and geometric patterns to intricate bridal mehndi across both hands and feet. If you're planning henna for an event, we recommend booking in advance — bridal packages especially should be scheduled 1–2 days before the celebration so the color is at its richest peak.",
    },
    "tinting": {
      intro:
        "Lash and brow tinting is the simplest way to look more polished every day without adding to your makeup routine. At Urmi Threading Salon, we use semi-permanent professional tints that safely darken and define brows and lashes for results that last 4–6 weeks — no mascara, no brow pencil needed.",
      para2:
        "Brow tinting is particularly effective for clients with naturally light, sparse, or uneven brows. The tint fills in the appearance of gaps, makes fine hairs more visible, and creates a defined shape even without makeup. Lash tinting makes lashes appear darker, thicker, and longer — especially transformative for clients with naturally blonde or light-colored lashes.",
      para3:
        "Many clients combine tinting with threading in a single visit. We typically thread first to define the brow shape, then tint to enhance color and fullness. The combination takes under 45 minutes and the results are immediate — no drying time, no waiting. We perform a patch test before your first tinting session to confirm there's no sensitivity.",
    },
  };

  const content = extraContent[service.id] ?? {
    intro: service.description,
    para2: `${service.name} at Urmi Threading Salon is delivered with precision and care. Our team brings 15+ years of expertise to every appointment, ensuring you leave looking and feeling your best.`,
    para3: `We take the time to understand your specific needs and preferences before every treatment. Our goal is not just a single great result — it's a long-term beauty partnership built on trust, consistency, and genuine care.`,
  };

  return (
    <>
      <ServiceSchema name={service.name} description={service.description} url={serviceUrl} />
      <BreadcrumbSchema
        items={[
          { name: "Services", url: `${SITE_URL}/services` },
          { name: service.name, url: serviceUrl },
        ]}
      />
      <FAQSchema faqs={service.faqs} />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-purple">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-brand-purple">Services</Link>
            <span>/</span>
            <span className="text-charcoal">{service.name}</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">{service.name}</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">{service.shortDescription}</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/book"
              className="bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              Book This Service
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="flex items-center gap-2 border-2 border-brand-purple text-brand-purple font-semibold px-8 py-4 rounded-full hover:bg-brand-purple hover:text-white transition-colors"
            >
              <Phone size={16} />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* What is it */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-6">What is {service.name}?</h2>
          <div className="prose-like space-y-4 text-gray-600 leading-relaxed text-base">
            <p>{content.intro}</p>
            <p>{content.para2}</p>
            <p>{content.para3}</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-8">Benefits of {service.name}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 bg-white rounded-2xl p-4 card-shadow">
                <CheckCircle2 size={18} className="text-brand-purple shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-8">What to Expect</h2>
          <ol className="space-y-4">
            {service.whatToExpect.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-brand-gradient rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-8">Gallery</h2>
          <div className="grid grid-cols-3 gap-4">
            {previewImages.map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-square relative">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/gallery" className="inline-flex items-center gap-1.5 text-brand-purple font-semibold hover:underline text-sm">
              View full gallery <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-lavender-50 border border-lavender-100 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Pricing</h2>
              <p className="text-gray-600">
                Affordable pricing for {service.name} — call us for current rates. No hidden fees, no pressure.
              </p>
            </div>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="flex items-center gap-2 bg-brand-gradient text-white font-semibold px-7 py-3.5 rounded-full whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              <Phone size={16} />
              Call for Rates
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 card-shadow">
                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-gradient text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Ready to experience {service.name}?
          </h2>
          <p className="mb-8 opacity-90">
            Visit us at 150 Hinchman Ave, Wayne, NJ. Walk-ins always welcome.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book" className="bg-white text-brand-purple font-semibold px-8 py-4 rounded-full hover:bg-lavender-50 transition-colors">
              Book Appointment
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              <Clock size={16} />
              Walk In Today
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
