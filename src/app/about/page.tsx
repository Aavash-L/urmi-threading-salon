import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { heroImage, salonStationsImage } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import HoursTable from "@/components/ui/HoursTable";
import { CallButton, CallHelper, DirectionsLink, RequestButton } from "@/components/ui/CallCta";

export const metadata = pageMetadata("/about");

// Team/owner portraits and history are added only from approved owner material.
export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "About", url: `${SITE_URL}/about` }]} />

      <section className="pt-32 pb-12 sm:pb-16 bg-blush-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-5">
            A Family-Owned Beauty Salon in Wayne, NJ
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Urmi Threading Salon is a family-owned beauty salon at 150 Hinchman Ave in Wayne, New Jersey.
            We offer threading, waxing, facials, lashes, henna, and tinting.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <figure>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src={heroImage.src} alt={heroImage.alt} fill sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          </figure>
          <figure>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src={salonStationsImage.src} alt={salonStationsImage.alt} fill sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          </figure>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="min-w-0">
            <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">Plan Your Visit</h2>
            <p className="text-gray-700 leading-relaxed">
              View our services and prices before your visit. Walk-ins are welcome during salon hours. For
              questions about a service or appointment availability, call (973) 653-9322.
            </p>
            <div className="mt-6 flex flex-col gap-3 items-start">
              <CallButton placement="about" />
              <RequestButton placement="about" />
              <DirectionsLink placement="about" />
            </div>
            <CallHelper className="mt-4" />
          </div>
          <div className="bg-white rounded-2xl p-6 border border-lavender-100 min-w-0">
            <h3 className="font-semibold text-charcoal mb-3">Salon Hours</h3>
            <HoursTable />
            <ul className="mt-6 space-y-2">
              <li>
                <Link href="/services" className="inline-flex items-center gap-1.5 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11">
                  Explore our services <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="inline-flex items-center gap-1.5 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11">
                  View the price menu <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
