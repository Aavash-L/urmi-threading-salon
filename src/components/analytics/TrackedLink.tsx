"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

// A link that records a non-personal conversion event on click.
export default function TrackedLink({
  href,
  event,
  placement,
  serviceId,
  external = false,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  event: AnalyticsEvent;
  placement: string;
  serviceId?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const onClick = () => track(event, { placement, service_id: serviceId });

  if (href.startsWith("tel:") || external) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={className}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
