"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock } from "lucide-react";
import { CATALOG, CATEGORIES, getBookableItem, isCategoryId, type CategoryId } from "@/lib/catalog";
import { requestSchema, type RequestInput } from "@/lib/booking/schema";
import { addDays, salonNow, type Slot } from "@/lib/booking/scheduling";
import { track } from "@/lib/analytics";
import HoursTable from "@/components/ui/HoursTable";
import { CallButton, CallHelper } from "@/components/ui/CallCta";

export const BOOKING_COPY = {
  heading: "Request an Appointment",
  intro:
    "Choose your service and preferred time. Your appointment is confirmed only after the salon confirms your request. For same-day availability, call (973) 653-9322.",
  submit: "Send Appointment Request",
  successHeading: "Appointment Request Received",
  successBody:
    "Your request has been received, but your appointment is not confirmed yet. The salon will contact you to confirm availability. For urgent questions, call (973) 653-9322.",
  failure: "We couldn't send your request. Please try again or call (973) 653-9322.",
  availabilityError: "We couldn't check available times. Please try again or call (973) 653-9322.",
} as const;

const DRAFT_KEY = "urmi-request-draft";
const bookable = CATALOG.filter((s) => s.bookable);

type Availability =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error" }
  | { state: "closed" | "past" | "too-far" | "invalid" }
  | { state: "ready"; slots: Slot[] };

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return d.length ? `(${d}` : "";
}

function readDraft(): Partial<RequestInput> {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeDraft(v: Partial<RequestInput>) {
  try {
    // Only non-personal choices are kept, and only for this browser tab.
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ serviceId: v.serviceId, date: v.date }));
  } catch {}
}

export default function Booking({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const Sub = headingLevel === "h1" ? "h2" : "h3";
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [fetched, setFetched] = useState<{ key: string; value: Availability } | null>(null);
  const [preferredCategory, setPreferredCategory] = useState<CategoryId | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => salonNow().date, []);
  const lastDate = useMemo(() => addDays(today, 60), [today]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<RequestInput>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: "", phone: "", email: "", serviceId: "", date: "", time: "", notes: "", company: "" },
    shouldFocusError: true,
  });

  const serviceId = watch("serviceId");
  const date = watch("date");
  const selected = getBookableItem(serviceId);

  // Availability is keyed by service + date (+ a manual retry counter). Until the
  // response for the current key arrives, the state is "loading".
  const availabilityKey = serviceId && date ? `${serviceId}|${date}|${reloadKey}` : null;
  const availability: Availability = !availabilityKey
    ? { state: "idle" }
    : fetched?.key === availabilityKey
    ? fetched.value
    : { state: "loading" };

  // Preselect from ?service= (exact id) or ?category=, falling back to this tab's draft.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("service");
    const category = params.get("category");
    const draft = readDraft();
    if (getBookableItem(fromUrl)) setValue("serviceId", fromUrl!);
    else if (getBookableItem(draft.serviceId)) setValue("serviceId", draft.serviceId!);
    // Reading the URL has to wait until after hydration on these static pages.
    if (isCategoryId(category)) setPreferredCategory(category);
    if (draft.date && draft.date >= today) setValue("date", draft.date);
  }, [setValue, today]);

  useEffect(() => {
    writeDraft({ serviceId, date });
  }, [serviceId, date]);

  // A new service or date invalidates the chosen time.
  useEffect(() => {
    setValue("time", "");
  }, [serviceId, date, setValue]);

  // Fetch preferred times; abort stale requests when the service or date changes.
  useEffect(() => {
    if (!availabilityKey) return;
    const [sid, d] = availabilityKey.split("|");
    const controller = new AbortController();
    fetch(`/api/availability?date=${encodeURIComponent(d)}&service=${encodeURIComponent(sid)}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const body = (await r.json()) as { status: string; slots: Slot[] };
        const value: Availability =
          body.status === "ok" ? { state: "ready", slots: body.slots } : { state: body.status as "closed" };
        setFetched({ key: availabilityKey, value });
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setFetched({ key: availabilityKey, value: { state: "error" } });
      });
    return () => controller.abort();
  }, [availabilityKey]);

  const groups = useMemo(() => {
    const ordered = preferredCategory
      ? [...CATEGORIES].sort((a, b) => Number(b.id === preferredCategory) - Number(a.id === preferredCategory))
      : CATEGORIES;
    return ordered
      .map((c) => ({ ...c, items: bookable.filter((s) => s.category === c.id) }))
      .filter((g) => g.items.length > 0);
  }, [preferredCategory]);

  const openSlots = availability.state === "ready" ? availability.slots.filter((s) => s.available) : [];

  let timeHint = "";
  if (!serviceId) timeHint = "Choose a service first.";
  else if (!date) timeHint = "Choose a date first.";
  else if (availability.state === "loading") timeHint = "Checking available times…";
  else if (availability.state === "closed") timeHint = "The salon is closed on this day. Please choose another date.";
  else if (availability.state === "past") timeHint = "That date has passed. Please choose another date.";
  else if (availability.state === "too-far") timeHint = "Online requests can be made up to 60 days ahead. Please call for later dates.";
  else if (availability.state === "ready" && openSlots.length === 0)
    timeHint = "No online request times are left on this date. Please choose another date or call (973) 653-9322.";

  const onSubmit = async (data: RequestInput) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
      };
      if (res.ok && body.ok) {
        track("booking_request_success", { placement: headingLevel === "h1" ? "book_page" : "home", service_id: data.serviceId });
        setSubmitted(true);
        reset();
        try {
          sessionStorage.removeItem(DRAFT_KEY);
        } catch {}
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      track("booking_request_error", { placement: headingLevel === "h1" ? "book_page" : "home", service_id: data.serviceId });
      for (const [field, message] of Object.entries(body.fieldErrors ?? {})) {
        if (field in data) setError(field as keyof RequestInput, { message });
      }
      if (res.status === 409) setReloadKey((k) => k + 1);
      setSubmitError(body.error ?? BOOKING_COPY.failure);
      requestAnimationFrame(() => errorRef.current?.focus());
    } catch {
      track("booking_request_error", { placement: headingLevel === "h1" ? "book_page" : "home", service_id: data.serviceId });
      setSubmitError(BOOKING_COPY.failure);
      requestAnimationFrame(() => errorRef.current?.focus());
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 min-h-12 rounded-xl border text-base text-charcoal bg-white focus:outline-none focus:ring-2 ${
      hasError ? "border-red-600 focus:ring-red-600" : "border-gray-400 focus:ring-brand-purple-strong"
    }`;

  const fieldError = (name: keyof RequestInput) =>
    errors[name]?.message ? (
      <p id={`${name}-error`} className="text-red-700 text-sm mt-1.5">
        {errors[name]?.message}
      </p>
    ) : null;

  const describedBy = (name: keyof RequestInput, hint?: string) =>
    [hint, errors[name] ? `${name}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <section
      id="book"
      className={`${headingLevel === "h1" ? "pt-32" : "pt-14 sm:pt-20"} pb-14 sm:pb-24 bg-white`}
      aria-labelledby="book-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <Heading id="book-heading" className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {BOOKING_COPY.heading}
          </Heading>
          <p className="text-lg text-gray-700 leading-relaxed">{BOOKING_COPY.intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 sm:gap-12 items-start">
          <div id="request-form" className="bg-white border border-lavender-100 rounded-2xl p-5 sm:p-8 card-shadow scroll-mt-28 min-w-0">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 gap-4" role="status">
                <CheckCircle2 size={56} className="text-emerald-700" aria-hidden="true" />
                <Sub ref={successRef} tabIndex={-1} className="font-serif text-2xl font-bold text-charcoal focus:outline-none">
                  {BOOKING_COPY.successHeading}
                </Sub>
                <p className="text-gray-700 leading-relaxed max-w-md">{BOOKING_COPY.successBody}</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-brand-purple-strong font-semibold underline underline-offset-4 min-h-11"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate aria-describedby="required-note">
                <p id="required-note" className="text-sm text-gray-700">
                  Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.
                </p>

                {/* Honeypot: hidden from people and assistive tech. */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">
                      Full name <span aria-hidden="true" className="text-red-700">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={describedBy("name")}
                      {...register("name")}
                      className={inputClass(!!errors.name)}
                    />
                    {fieldError("name")}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1.5">
                      Phone number <span aria-hidden="true" className="text-red-700">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="(201) 555-0123"
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={describedBy("phone")}
                      {...register("phone", {
                        onChange: (e) => {
                          e.target.value = formatPhone(e.target.value);
                        },
                      })}
                      className={inputClass(!!errors.phone)}
                    />
                    {fieldError("phone")}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
                    Email address (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={describedBy("email", "email-hint")}
                    {...register("email")}
                    className={inputClass(!!errors.email)}
                  />
                  <p id="email-hint" className="text-sm text-gray-700 mt-1.5">
                    If you add an email, we&apos;ll send a copy of your request there.
                  </p>
                  {fieldError("email")}
                </div>

                <div>
                  <label htmlFor="serviceId" className="block text-sm font-medium text-charcoal mb-1.5">
                    Service <span aria-hidden="true" className="text-red-700">*</span>
                  </label>
                  <select
                    id="serviceId"
                    aria-required="true"
                    aria-invalid={!!errors.serviceId}
                    aria-describedby={describedBy("serviceId", "service-hint")}
                    {...register("serviceId")}
                    className={inputClass(!!errors.serviceId)}
                  >
                    <option value="">Choose a service…</option>
                    {groups.map((g) => (
                      <optgroup key={g.id} label={g.label}>
                        {g.items.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                            {s.price == null ? " — price by quote" : ` — from $${s.price}`}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <p id="service-hint" className="text-sm text-gray-700 mt-1.5">
                    {preferredCategory && !selected
                      ? `${CATEGORIES.find((c) => c.id === preferredCategory)?.label} services are listed first. `
                      : ""}
                    Not sure which service? Call{" "}
                    <a href="tel:+19736539322" className="font-semibold text-brand-purple-strong underline underline-offset-2">
                      (973) 653-9322
                    </a>
                    . Gift cards are sold by phone.
                  </p>
                  {fieldError("serviceId")}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-charcoal mb-1.5">
                      Preferred date <span aria-hidden="true" className="text-red-700">*</span>
                    </label>
                    <input
                      id="date"
                      type="date"
                      min={today}
                      max={lastDate}
                      aria-required="true"
                      aria-invalid={!!errors.date}
                      aria-describedby={describedBy("date")}
                      {...register("date")}
                      className={inputClass(!!errors.date)}
                    />
                    {fieldError("date")}
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-charcoal mb-1.5">
                      Preferred time <span aria-hidden="true" className="text-red-700">*</span>
                    </label>
                    <select
                      id="time"
                      aria-required="true"
                      aria-invalid={!!errors.time}
                      aria-describedby={describedBy("time", "time-hint")}
                      aria-busy={availability.state === "loading"}
                      disabled={openSlots.length === 0}
                      {...register("time")}
                      className={`${inputClass(!!errors.time)} disabled:bg-gray-100 disabled:text-gray-700 disabled:cursor-not-allowed`}
                    >
                      <option value="">{openSlots.length ? "Choose a time…" : "No times to show yet"}</option>
                      {openSlots.map((s) => (
                        <option key={s.time} value={s.time}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <p id="time-hint" className="text-sm text-gray-700 mt-1.5" aria-live="polite">
                      {timeHint}
                    </p>
                    {availability.state === "error" && (
                      <div role="alert" className="mt-2 text-sm text-red-700">
                        {BOOKING_COPY.availabilityError}{" "}
                        <button
                          type="button"
                          onClick={() => setReloadKey((k) => k + 1)}
                          className="font-semibold underline underline-offset-2 min-h-11"
                        >
                          Try again
                        </button>
                      </div>
                    )}
                    {fieldError("time")}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-charcoal mb-1.5">
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    aria-invalid={!!errors.notes}
                    aria-describedby={describedBy("notes", "notes-hint")}
                    {...register("notes")}
                    className={inputClass(!!errors.notes)}
                  />
                  <p id="notes-hint" className="text-sm text-gray-700 mt-1.5">
                    Preferences or questions. Please don&apos;t include detailed medical information.
                  </p>
                  {fieldError("notes")}
                </div>

                {submitError && (
                  <div
                    ref={errorRef}
                    tabIndex={-1}
                    role="alert"
                    className="bg-red-50 border border-red-300 rounded-xl px-4 py-3 text-sm text-red-800 focus:outline-none"
                  >
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-gradient text-white font-semibold min-h-12 py-3 rounded-full hover:opacity-95 disabled:opacity-60 text-base"
                >
                  {submitting ? "Sending…" : BOOKING_COPY.submit}
                </button>

                <p className="text-sm text-gray-700">
                  By sending this request, you ask Urmi Threading Salon to contact you about your appointment.{" "}
                  <Link href="/privacy" className="font-semibold text-brand-purple-strong underline underline-offset-2">
                    Read our appointment privacy information.
                  </Link>
                </p>
              </form>
            )}
          </div>

          <aside className="space-y-6 min-w-0" aria-label="Calling and salon hours">
            <div className="bg-lavender-50 rounded-2xl p-6 space-y-3">
              <Sub className="font-serif text-2xl font-bold text-charcoal">Prefer to Call?</Sub>
              <CallButton placement="booking_aside" />
              <CallHelper />
            </div>
            <div className="bg-white border border-lavender-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-brand-purple-strong" aria-hidden="true" />
                <Sub className="font-semibold text-charcoal">Salon Hours</Sub>
              </div>
              <HoursTable />
              <p className="text-sm text-gray-700 mt-3">Walk-ins are welcome during salon hours.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
