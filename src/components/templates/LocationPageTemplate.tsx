import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import type { Location } from "@/lib/locations";
import { BUSINESS, SITE_URL } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { TESTIMONIALS } from "@/lib/testimonials";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import StarRating from "@/components/ui/StarRating";

interface LocationPageTemplateProps {
  location: Location;
}

export default function LocationPageTemplate({ location }: LocationPageTemplateProps) {
  const locationUrl = `${SITE_URL}/locations/${location.slug}`;
  const locationTestimonials = TESTIMONIALS.filter((t) =>
    location.testimonialIds.includes(t.id)
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Locations", url: `${SITE_URL}/locations` },
          { name: `${location.city}, NJ`, url: locationUrl },
        ]}
      />
      <FAQSchema faqs={location.faqs} />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-purple">Home</Link>
            <span>/</span>
            <span className="text-charcoal">{location.city}, NJ</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Eyebrow Threading in {location.city}, NJ — Urmi Threading Salon
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">{location.intro}</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/book"
              className="bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              Book Appointment
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

      {/* Why choose us */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-8">
            Why {location.city} Residents Choose Urmi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {location.reasons.map((reason, i) => (
              <div key={i} className="bg-lavender-50 rounded-2xl p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-6">
            Services Available to {location.city} Clients
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center justify-between bg-white rounded-xl p-4 card-shadow hover:border-brand-purple border border-transparent transition-colors group"
                >
                  <span className="font-medium text-charcoal group-hover:text-brand-purple transition-colors">
                    {service.name}
                  </span>
                  <ArrowRight size={14} className="text-gray-400 group-hover:text-brand-purple transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      {locationTestimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-charcoal mb-8">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locationTestimonials.slice(0, 2).map((t) => (
                <div key={t.id} className="bg-lavender-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">Verified Google Review</p>
                    </div>
                  </div>
                  <StarRating rating={t.rating} size={13} className="mb-2" />
                  <p className="text-gray-600 text-sm leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Directions */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-6">
            Getting Here from {location.city}
          </h2>
          <div className="bg-white rounded-2xl p-6 card-shadow mb-6">
            <div className="flex items-start gap-3 mb-4">
              <MapPin size={20} className="text-brand-purple shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-charcoal mb-1">Our Address</p>
                <address className="text-gray-600 not-italic text-sm">{BUSINESS.address.full}</address>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{location.directions}</p>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.1234567890!2d-74.2421!3d40.9468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s150+Hinchman+Ave%2C+Wayne%2C+NJ+07470!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Directions from ${location.city} to Urmi Threading Salon in Wayne, NJ`}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-8">
            Frequently Asked Questions — {location.city}
          </h2>
          <div className="space-y-4">
            {location.faqs.map((faq, i) => (
              <div key={i} className="border border-lavender-100 rounded-2xl p-6">
                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours summary */}
      <section className="py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 card-shadow flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-brand-purple" />
                <h3 className="font-semibold text-charcoal">Business Hours</h3>
              </div>
              <table className="text-sm w-full">
                <tbody>
                  {BUSINESS.hours.map((h, i) => (
                    <tr key={i} className="border-b border-lavender-50 last:border-0">
                      <td className="py-1.5 font-medium text-charcoal pr-6">{h.days}</td>
                      <td className="py-1.5 text-gray-600">
                        {h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/book"
                className="bg-brand-gradient text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
              >
                Book Appointment
              </Link>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="border-2 border-brand-purple text-brand-purple font-semibold px-7 py-3.5 rounded-full hover:bg-brand-purple hover:text-white transition-colors text-center flex items-center justify-center gap-2"
              >
                <Phone size={14} />
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
