import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Gallery from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "Gallery — Beauty Results at Urmi Threading Salon",
  description:
    "Browse the gallery at Urmi Threading Salon in Wayne, NJ. See our eyebrow threading, lash extension, henna, and facial results. Book your appointment today.",
  alternates: { canonical: `${SITE_URL}/gallery` },
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Gallery", url: `${SITE_URL}/gallery` }]} />

      <section className="pt-32 pb-10 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-purple mb-3">Our Work</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Gallery</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            A look inside Urmi Threading Salon — the artistry, the environment, and the results our clients love.
          </p>
        </div>
      </section>

      <Gallery />
    </>
  );
}
