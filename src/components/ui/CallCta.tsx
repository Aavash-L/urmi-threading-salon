import Link from "next/link";
import { CalendarDays, MapPin, Phone } from "lucide-react";
import { BUSINESS, CTA } from "@/lib/constants";
import TrackedLink from "@/components/analytics/TrackedLink";

// Shared phone-first call-to-action pieces. Calling is the primary (filled) action,
// requesting an appointment is secondary (outlined).

type Size = "md" | "sm";
const base = (size: Size) =>
  `inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors min-h-11 whitespace-nowrap ${
    size === "sm" ? "px-4 text-sm" : "px-6 py-3 text-base"
  }`;

export function CallButton({
  placement,
  className = "",
  onDark = false,
  size = "md",
}: {
  placement: string;
  className?: string;
  onDark?: boolean;
  size?: Size;
}) {
  return (
    <TrackedLink
      href={CTA.callHref}
      event="call_click"
      placement={placement}
      className={`${base(size)} ${onDark ? "bg-white text-brand-purple-strong hover:bg-lavender-50" : "bg-brand-gradient text-white shadow-md hover:opacity-95"} ${className}`}
    >
      <Phone size={17} aria-hidden="true" />
      {CTA.call}
    </TrackedLink>
  );
}

export function RequestButton({
  href = CTA.requestHref,
  label = CTA.request,
  placement,
  className = "",
  onDark = false,
  size = "md",
}: {
  href?: string;
  label?: string;
  placement: string;
  className?: string;
  onDark?: boolean;
  size?: Size;
}) {
  return (
    <TrackedLink
      href={href}
      event="booking_start"
      placement={placement}
      className={`${base(size)} border-2 ${onDark ? "border-white text-white hover:bg-white/10" : "border-brand-purple-strong text-brand-purple-strong bg-white hover:bg-lavender-50"} ${className}`}
    >
      <CalendarDays size={17} aria-hidden="true" />
      {label}
    </TrackedLink>
  );
}

export function DirectionsLink({ placement, className = "" }: { placement: string; className?: string }) {
  return (
    <TrackedLink
      href={BUSINESS.directionsUrl}
      event="directions_click"
      placement={placement}
      external
      className={`inline-flex items-center gap-1.5 font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline min-h-11 ${className}`}
    >
      <MapPin size={16} aria-hidden="true" />
      {CTA.directions}
    </TrackedLink>
  );
}

export function CallHelper({ className = "" }: { className?: string }) {
  return <p className={`text-sm text-gray-700 leading-relaxed ${className}`}>{CTA.callHelper}</p>;
}

export function WalkInsNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-gray-700 ${className}`}>
      {CTA.walkIns}.{" "}
      <Link href="/contact#hours" className="font-semibold text-brand-purple-strong underline underline-offset-4 hover:no-underline">
        {CTA.viewHours}
      </Link>
    </p>
  );
}
