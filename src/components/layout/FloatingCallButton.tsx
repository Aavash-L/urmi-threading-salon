"use client";

import { usePathname } from "next/navigation";
import { CalendarDays, Phone } from "lucide-react";
import { BUSINESS, CTA } from "@/lib/constants";
import TrackedLink from "@/components/analytics/TrackedLink";

// Sticky call/request bar for every viewport where the header's call/request
// buttons are hidden (< lg / 1024px). A matching spacer in SiteChrome reserves
// room so the bar never covers the footer or the end of the page.
export default function FloatingCallButton() {
  const pathname = usePathname();
  const onBookPage = pathname === "/book";

  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-lavender-100 px-3 pt-2.5"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-xl mx-auto grid grid-cols-2 gap-2">
        <TrackedLink
          href={`tel:${BUSINESS.phoneRaw}`}
          event="call_click"
          placement="sticky_bar"
          className="flex items-center justify-center gap-1.5 bg-brand-gradient text-white font-semibold rounded-full min-h-12 px-2 text-[13px] sm:text-sm leading-tight text-center"
        >
          <Phone size={15} aria-hidden="true" className="shrink-0" />
          <span>{CTA.call}</span>
        </TrackedLink>
        {onBookPage ? (
          <a
            href="#request-form"
            className="flex items-center justify-center gap-1.5 border-2 border-brand-purple-strong text-brand-purple-strong bg-white font-semibold rounded-full min-h-12 px-2 text-[13px] sm:text-sm leading-tight text-center"
          >
            View Request Form
          </a>
        ) : (
          <TrackedLink
            href={CTA.requestHref}
            event="booking_start"
            placement="sticky_bar"
            className="flex items-center justify-center gap-1.5 border-2 border-brand-purple-strong text-brand-purple-strong bg-white font-semibold rounded-full min-h-12 px-2 text-[13px] sm:text-sm leading-tight text-center"
          >
            <CalendarDays size={15} aria-hidden="true" className="shrink-0" />
            <span>{CTA.request}</span>
          </TrackedLink>
        )}
      </div>
    </div>
  );
}
