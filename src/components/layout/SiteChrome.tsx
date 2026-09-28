"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingCallButton from "./FloatingCallButton";
import PromoBanner from "./PromoBanner";

export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <PromoBanner />
      <Navbar />
    </>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <Footer />
      {/* Reserves the sticky bar's height below the footer on < lg screens. */}
      <div aria-hidden="true" className="lg:hidden h-[calc(4.75rem+env(safe-area-inset-bottom))] bg-charcoal" />
      <FloatingCallButton />
    </>
  );
}
