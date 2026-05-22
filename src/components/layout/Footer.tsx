import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Star, Instagram } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

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

const quickLinks = [
  { label: "Services",         href: "/services"  },
  { label: "Pricing",          href: "/pricing"   },
  { label: "Current Offers",   href: "/#offers"   },
  { label: "About Us",         href: "/about"     },
  { label: "Book Appointment", href: "/book"      },
  { label: "Contact",          href: "/#contact"  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl font-bold text-brand-gradient bg-clip-text mb-3">
              Urmi Threading Salon
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Wayne, NJ's trusted beauty salon since 2010. Precision threading, gentle technique, radiant results.
            </p>
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="text-gray-400 text-xs ml-1.5">4.7 · 137+ reviews</span>
            </div>
            <p className="text-xs text-brand-pink mt-3 font-medium">
              ✨ Every 10th brow threading is FREE
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urmi Threading Salon on Instagram"
                className="text-gray-400 hover:text-brand-pink transition-colors"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Urmi Threading Salon on Facebook"
                className="text-gray-400 hover:text-brand-purple transition-colors"
              >
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>

          {/* Visit Us */}
          <div>
            <h3 className="text-brand-pink font-semibold text-sm uppercase tracking-wider mb-5">Visit Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-brand-pink mt-0.5 shrink-0" />
                <address className="text-gray-400 text-sm not-italic leading-relaxed">
                  {BUSINESS.address.street}<br />
                  {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-brand-pink shrink-0" />
                <a href={`tel:${BUSINESS.phoneRaw}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-brand-pink shrink-0" />
                <a href="mailto:urmithreadingandbeautysalon@gmail.com" className="text-gray-400 hover:text-white text-sm transition-colors break-all">
                  urmithreadingandbeautysalon@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon size={15} />
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-pink text-sm transition-colors"
                >
                  @urmithreading.wayne
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-brand-pink font-semibold text-sm uppercase tracking-wider mb-5">Hours</h3>
            <ul className="space-y-2">
              {BUSINESS.hours.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  {i === 0 && <Clock size={14} className="text-brand-pink mt-0.5 shrink-0" />}
                  {i !== 0 && <span className="w-[14px] shrink-0" />}
                  <span className="text-gray-300 font-medium w-24 shrink-0">{h.days}:</span>
                  <span className="text-gray-400">
                    {h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-brand-pink font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {year} Urmi Threading Salon. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
