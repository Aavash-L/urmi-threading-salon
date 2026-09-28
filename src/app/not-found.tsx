import Link from "next/link";
import type { Metadata } from "next";
import { CallButton } from "@/components/ui/CallCta";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Urmi Threading Salon" },
  robots: { index: false },
};

// Rendered with a genuine 404 status.
export default function NotFound() {
  return (
    <section className="pt-36 pb-20 bg-blush-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">Page Not Found</h1>
        <p className="text-gray-700 mb-8">This page doesn&apos;t exist. Try one of these instead, or call the salon.</p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          <li><Link href="/" className="font-semibold text-brand-purple-strong underline underline-offset-4">Home</Link></li>
          <li><Link href="/services" className="font-semibold text-brand-purple-strong underline underline-offset-4">Services</Link></li>
          <li><Link href="/pricing" className="font-semibold text-brand-purple-strong underline underline-offset-4">Prices</Link></li>
          <li><Link href="/contact" className="font-semibold text-brand-purple-strong underline underline-offset-4">Contact &amp; Hours</Link></li>
        </ul>
        <CallButton placement="not_found" />
      </div>
    </section>
  );
}
