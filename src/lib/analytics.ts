// Provider-agnostic conversion events. The site has no analytics provider yet, so
// events go to `window.dataLayer` only if a tag manager has created it, and are
// also dispatched as a DOM CustomEvent ("urmi:analytics") for any future listener.
// Nothing is sent anywhere by default. No property ID is configured here.
//
// Only non-personal dimensions are allowed. Never pass name, phone, email, notes,
// or appointment date/time. A call_click is a tap on a tel: link, not a completed call.

export type AnalyticsEvent =
  | "call_click"
  | "directions_click"
  | "booking_start"
  | "booking_request_success"
  | "booking_request_error";

export interface AnalyticsProps {
  placement?: string;
  service_id?: string;
}

const ALLOWED_KEYS = new Set(["page_path", "placement", "service_id"]);

export function buildEvent(event: AnalyticsEvent, props: AnalyticsProps = {}, pagePath = "") {
  const payload: Record<string, string> = { event, page_path: pagePath };
  for (const [k, v] of Object.entries(props)) {
    if (ALLOWED_KEYS.has(k) && typeof v === "string" && v) payload[k] = v;
  }
  return payload;
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;
  const payload = buildEvent(event, props, window.location.pathname);
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) w.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("urmi:analytics", { detail: payload }));
}
