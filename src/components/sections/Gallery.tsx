"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryImages } from "@/lib/images";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
  };
  const next = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
  };

  return (
    <section id="gallery" className="py-24 bg-white" aria-label="Gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="Beauty You Can See"
          subtitle="A glimpse into the care, precision, and artistry behind every service at Urmi Threading Salon."
        />

        <div className="mt-14 columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => openLightbox(index)}
              className="w-full break-inside-avoid rounded-2xl overflow-hidden block focus-visible:ring-2 focus-visible:ring-brand-purple"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: shouldReduce ? 0 : index * 0.05 }}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              aria-label={`View ${image.alt}`}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <motion.div
              key={lightboxIndex}
              initial={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl max-h-[80vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                width={galleryImages[lightboxIndex].width}
                height={galleryImages[lightboxIndex].height}
                className="object-contain max-h-[80vh] w-auto"
              />
            </motion.div>

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
