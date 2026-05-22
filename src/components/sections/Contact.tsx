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
import SectionHeading from "@/components/ui/SectionHeading";
import { BUSINESS } from "@/lib/constants";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-lavender-50" aria-label="Contact information">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Find Us"
          title="Visit Urmi Threading Salon"
          subtitle="We're conveniently located in Wayne, NJ. Walk in anytime or call ahead."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 card-shadow space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-lavender-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-brand-purple" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal mb-1">Address</p>
                  <address className="text-gray-600 not-italic text-sm leading-relaxed">
                    {BUSINESS.address.street}<br />
                    {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                  </address>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-lavender-50 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-brand-purple" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal mb-1">Phone</p>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="text-brand-purple hover:underline text-sm font-medium"
                  >
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-lavender-50 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-brand-purple" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal mb-2">Hours</p>
                  <table className="text-sm text-gray-600 w-full">
                    <tbody>
                      {BUSINESS.hours.map((h, i) => (
                        <tr key={i}>
                          <td className="pr-4 py-0.5 font-medium text-charcoal">{h.days}</td>
                          <td className="py-0.5">
                            {h.open === "Closed" ? (
                              <span className="text-gray-400">Closed</span>
                            ) : (
                              `${h.open} – ${h.close}`
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 card-shadow">
              <p className="font-semibold text-charcoal mb-4">Follow Us</p>
              <div className="flex gap-4">
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-pink transition-colors"
                  aria-label="Urmi Threading Salon on Instagram"
                >
                  <InstagramIcon size={18} />
                  @urmithreading.wayne
                </a>
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-purple transition-colors"
                  aria-label="Urmi Threading Salon on Facebook"
                >
                  <FacebookIcon size={18} />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden card-shadow h-[400px] lg:h-auto min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.1234567890!2d-74.2421!3d40.9468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s150+Hinchman+Ave%2C+Wayne%2C+NJ+07470!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Urmi Threading Salon location at 150 Hinchman Ave, Wayne, NJ 07470"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
