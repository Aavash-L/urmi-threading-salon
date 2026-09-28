import { MapPin, Phone, Clock } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
import { BUSINESS } from "@/lib/constants";
import { CallButton, DirectionsLink } from "@/components/ui/CallCta";
import HoursTable from "@/components/ui/HoursTable";

export default function Contact({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <section id="contact" className="py-14 sm:py-20 bg-lavender-50" aria-labelledby="visit-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <H id="visit-heading" className="font-serif text-3xl md:text-4xl font-bold text-charcoal text-center">
          Visit Urmi Threading Salon
        </H>
        <p className="mt-3 text-center text-gray-700">
          We have one salon location: {BUSINESS.address.full}.
        </p>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          <div className="space-y-6 min-w-0">
            <div className="bg-white rounded-2xl p-6 card-shadow space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-lavender-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-brand-purple-strong" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal mb-1">Address</p>
                  <address className="text-gray-700 not-italic text-sm leading-relaxed">
                    {BUSINESS.address.street}<br />
                    {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                  </address>
                  <DirectionsLink placement="contact" className="mt-1" />
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-lavender-50 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-brand-purple-strong" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal mb-2">Phone</p>
                  <CallButton placement="contact" className="text-sm" />
                </div>
              </div>

              <div id="hours" className="flex items-start gap-4 scroll-mt-28">
                <div className="w-10 h-10 bg-lavender-50 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-brand-purple-strong" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-charcoal mb-2">Salon Hours</p>
                  <HoursTable />
                  <p className="text-sm text-gray-700 mt-2">Walk-ins are welcome during salon hours.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 card-shadow">
              <p className="font-semibold text-charcoal mb-3">Follow Us</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-700 underline underline-offset-4 hover:no-underline min-h-11"
                >
                  <InstagramIcon size={18} />
                  Instagram {BUSINESS.instagramHandle}
                </a>
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-700 underline underline-offset-4 hover:no-underline min-h-11"
                >
                  <FacebookIcon size={18} />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden card-shadow bg-white">
            <iframe
              src={BUSINESS.mapEmbedUrl}
              className="w-full h-[260px] sm:h-[350px] lg:h-full lg:min-h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${BUSINESS.name} at ${BUSINESS.address.full}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
