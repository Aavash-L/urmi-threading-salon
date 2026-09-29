"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingCallButton from "./FloatingCallButton";
import ScrollProgress from "./ScrollProgress";
import PromoBanner from "./PromoBanner";

export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <PromoBanner />
      <ScrollProgress />
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
      <FloatingCallButton />
    </>
  );
}
