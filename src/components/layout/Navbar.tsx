"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Sparkles } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { useReducedMotion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Loyalty Benefits", href: "/#loyalty" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "glass shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Urmi Threading Salon home">
            <Sparkles size={20} className="text-brand-pink" />
            <span className="font-serif font-bold text-xl text-charcoal group-hover:text-brand-purple transition-colors">
              Urmi Threading
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-brand-purple ${
                pathname === "/" ? "text-brand-purple" : "text-charcoal"
              }`}
            >
              Home
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-charcoal hover:text-brand-purple transition-colors"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2 w-56"
                    role="menu"
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-lavender-100 py-2 overflow-hidden">
                      <Link
                        href="/services"
                        className="block px-4 py-2 text-sm font-semibold text-brand-purple hover:bg-lavender-50 transition-colors"
                        role="menuitem"
                      >
                        All Services
                      </Link>
                      <div className="h-px bg-lavender-100 mx-4 my-1" />
                      {SERVICES.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.slug}`}
                          className="block px-4 py-2 text-sm text-charcoal hover:bg-lavender-50 hover:text-brand-purple transition-colors"
                          role="menuitem"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-purple ${
                  pathname === link.href ? "text-brand-purple" : "text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="flex items-center gap-1.5 text-sm font-medium text-charcoal hover:text-brand-purple transition-colors"
            >
              <Phone size={14} />
              {BUSINESS.phone}
            </a>

            <Link
              href="/book"
              className="bg-brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-md"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-charcoal hover:bg-lavender-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduce ? { opacity: 1 } : { opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed inset-0 z-20 bg-white flex flex-col pt-24 pb-8 px-6"
          >
            <nav aria-label="Mobile navigation">
              <motion.ul
                className="space-y-1"
                variants={{
                  show: { transition: { staggerChildren: shouldReduce ? 0 : 0.07 } },
                  hidden: {},
                }}
                initial="hidden"
                animate="show"
              >
                {[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "About", href: "/about" }, { label: "Loyalty Benefits", href: "/#loyalty" }, { label: "Contact", href: "/contact" }, { label: "Book Appointment", href: "/book" }].map(
                  (link) => (
                    <motion.li
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: shouldReduce ? 0 : 20 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                      }}
                    >
                      <Link
                        href={link.href}
                        className={`block text-2xl font-serif font-bold py-3 border-b border-lavender-100 transition-colors ${
                          link.href === "/book"
                            ? "text-brand-purple"
                            : "text-charcoal hover:text-brand-purple"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  )
                )}
              </motion.ul>
            </nav>

            <div className="mt-auto">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold py-4 rounded-full text-lg"
              >
                <Phone size={18} className="fill-white" />
                {BUSINESS.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
