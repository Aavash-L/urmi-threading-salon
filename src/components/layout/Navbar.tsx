"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { CallButton, RequestButton } from "@/components/ui/CallCta";

const links = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about", wideOnly: true },
  { label: "Contact", href: "/contact" },
];

const mobileLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  ...SERVICES.map((s) => ({ label: s.name, href: `/services/${s.slug}`, nested: true })),
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact & Hours", href: "/contact" },
  { label: "Request an Appointment", href: "/book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll and move focus into the open mobile menu.
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    firstMobileLink.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) closeMobile();
      setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
    // Return focus to the control that opened the menu.
    requestAnimationFrame(() => menuButton.current?.focus());
  }

  const linkClass = (href: string) =>
    `text-sm font-medium py-2 underline-offset-4 hover:underline ${
      pathname === href ? "text-brand-purple-strong underline" : "text-charcoal"
    }`;

  return (
    <>
      <header
        className={`fixed top-10 left-0 right-0 z-30 transition-shadow ${
          scrolled || mobileOpen ? "bg-white/95 backdrop-blur shadow-md" : "bg-blush-50/95"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2 min-h-11" onClick={() => setMobileOpen(false)}>
            <Sparkles size={20} className="text-brand-pink-strong" aria-hidden="true" />
            <span className="font-serif font-bold text-xl text-charcoal">Urmi Threading</span>
            <span className="sr-only">Salon home</span>
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              onBlur={(e) => {
                if (!servicesRef.current?.contains(e.relatedTarget as Node)) setServicesOpen(false);
              }}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-charcoal py-2 min-h-11"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((o) => !o)}
              >
                Services
                <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div id="services-menu" hidden={!servicesOpen} className="absolute top-full left-0 pt-2 w-60">
                <ul className="bg-white rounded-2xl shadow-xl border border-lavender-100 py-2">
                  <li>
                    <Link href="/services" className="block px-4 py-2.5 text-sm font-semibold text-brand-purple-strong hover:bg-lavender-50">
                      All Services
                    </Link>
                  </li>
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="block px-4 py-2.5 text-sm text-charcoal hover:bg-lavender-50">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`${linkClass(l.href)} ${l.wideOnly ? "hidden xl:inline" : ""}`}>
                {l.label}
              </Link>
            ))}

            <CallButton placement="header" size="sm" />
            {pathname !== "/book" && <RequestButton placement="header" size="sm" />}
          </div>

          <button
            ref={menuButton}
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-charcoal hover:bg-lavender-50"
            onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-[6.5rem] bottom-0 z-20 bg-white overflow-y-auto px-6 pb-40"
        >
          <nav aria-label="Mobile navigation">
            <ul>
              {mobileLinks.map((l, i) => (
                <li key={l.href}>
                  <Link
                    ref={i === 0 ? firstMobileLink : undefined}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block border-b border-lavender-100 ${
                      "nested" in l ? "pl-4 py-2.5 text-base text-gray-700" : "py-3 text-xl font-serif font-bold text-charcoal"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
