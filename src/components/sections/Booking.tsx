"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { BUSINESS } from "@/lib/constants";
import { bookingServices } from "@/lib/services";

const CATEGORY_EMOJI: Record<string, string> = {
  Threading: "✨",
  Waxing: "🌿",
  Facials: "🌸",
  "Lash & Brow": "👁️",
  Henna: "🌺",
};

// Groups bookingServices by category in insertion order
const servicesByCategory = bookingServices.reduce<Record<string, typeof bookingServices>>(
  (acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  },
  {}
);

function generateTimeSlots(date: Date, serviceDuration: number): string[] {
  const dayOfWeek = date.getDay(); // 0=Sun

  if (dayOfWeek === 0) return []; // Sunday closed

  const openHour = 10;
  const closeHour = dayOfWeek === 4 || dayOfWeek === 5 ? 19 : 18; // Thu/Fri close 7pm

  const openMinutes = openHour * 60;
  const closeMinutes = closeHour * 60;
  const lastSlotMinutes = closeMinutes - serviceDuration;
  // Cap minimum step at 15 min so short services (5-min Upper Lip) don't flood the list
  const stepMinutes = Math.max(serviceDuration, 15);

  const slots: string[] = [];
  for (let m = openMinutes; m <= lastSlotMinutes; m += stepMinutes) {
    const hours = Math.floor(m / 60);
    const minutes = m % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const displayMinutes = minutes.toString().padStart(2, "0");
    slots.push(`${displayHours}:${displayMinutes} ${ampm}`);
  }
  return slots;
}

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(phoneRegex, "Enter your 10-digit phone number"),
  email: z.string().email("Enter a valid email address, e.g. jane@example.com"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a preferred date"),
  time: z.string().min(1, "Please select a preferred time"),
  notes: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const shouldReduce = useReducedMotion();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BookingForm>({ resolver: zodResolver(bookingSchema) });

  const selectedService = watch("service");
  const selectedDate = watch("date");

  const serviceInfo = selectedService
    ? bookingServices.find((s) => s.name === selectedService)
    : null;

  // Reset time whenever service changes (new duration = new slot set)
  useEffect(() => {
    setValue("time", "");
  }, [selectedService, setValue]);

  // Fetch booked slots whenever date changes
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }
    setLoadingSlots(true);
    setValue("time", "");
    fetch(`/api/availability?date=${selectedDate}`)
      .then((r) => r.json())
      .then(({ bookedSlots }) => setBookedSlots(bookedSlots ?? []))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, setValue]);

  const isSunday = selectedDate
    ? new Date(selectedDate + "T12:00:00").getDay() === 0
    : false;

  const generatedSlots = useMemo(() => {
    if (!selectedDate || !serviceInfo || isSunday) return [];
    return generateTimeSlots(new Date(selectedDate + "T12:00:00"), serviceInfo.duration);
  }, [selectedDate, serviceInfo, isSunday]);

  const noSlotsAvailable =
    !!(selectedDate && serviceInfo && !isSunday && generatedSlots.length === 0);

  const timeDisabled =
    !selectedDate || !selectedService || loadingSlots || isSunday || noSlotsAvailable;

  let timePlaceholder: string;
  if (!selectedService) timePlaceholder = "Select a service first";
  else if (!selectedDate) timePlaceholder = "Pick a date first";
  else if (loadingSlots) timePlaceholder = "Loading…";
  else if (isSunday) timePlaceholder = "Closed on Sundays";
  else if (noSlotsAvailable) timePlaceholder = "No slots — pick another day";
  else timePlaceholder = "Select a time…";

  const onSubmit = async (data: BookingForm) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
        setBookedSlots([]);
      } else {
        const body = await res.json();
        setSubmitError(body.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple transition-colors ${
      hasError
        ? "border-red-400 focus:ring-red-400"
        : "border-lavender-100 hover:border-brand-purple/40"
    }`;

  return (
    <section id="book" className="py-14 sm:py-24 bg-white" aria-label="Book an appointment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Book Now"
          title="Reserve Your Appointment"
          subtitle="Fill out the form below and we'll confirm your appointment within 1 hour during business hours."
        />

        <div className="mt-8 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left: hours — pushed below form on mobile */}
          <div className="space-y-6 order-last lg:order-first">
            <div className="bg-lavender-50 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-charcoal">
                Walk in, or book ahead — your choice.
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We welcome walk-ins every day, but booking ahead guarantees your preferred time slot.
                Most threading appointments take 10–30 minutes, so you can fit us into any schedule.
              </p>
            </div>

            <div className="bg-white border border-lavender-100 rounded-2xl p-6 card-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-brand-purple" />
                <h4 className="font-semibold text-charcoal">Business Hours</h4>
              </div>
              <table className="text-sm w-full">
                <tbody>
                  {BUSINESS.hours.map((h, i) => (
                    <tr key={i} className="border-b border-lavender-50 last:border-0">
                      <td className="py-2 font-medium text-charcoal pr-4">{h.days}</td>
                      <td className="py-2 text-gray-600">
                        {h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: booking form — first on mobile */}
          <div className="bg-white border border-lavender-100 rounded-2xl p-5 sm:p-8 card-shadow order-first lg:order-last">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12 gap-4"
                >
                  <motion.div
                    initial={shouldReduce ? {} : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle2 size={56} className="text-emerald-500" />
                  </motion.div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal">Request Received!</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                    We&apos;ll confirm your appointment by text or call within 1 hour during business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-brand-purple text-sm font-medium hover:underline"
                  >
                    Book another appointment
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        {...register("name")}
                        className={inputClass(!!errors.name)}
                        placeholder="Jane Smith"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        {...register("phone")}
                        onInput={(e) => {
                          const digits = e.currentTarget.value.replace(/\D/g, "").slice(0, 10);
                          let formatted = digits;
                          if (digits.length > 6) {
                            formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
                          } else if (digits.length > 3) {
                            formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                          } else if (digits.length > 0) {
                            formatted = `(${digits}`;
                          }
                          e.currentTarget.value = formatted;
                        }}
                        className={inputClass(!!errors.phone)}
                        placeholder="(973) 653-9322"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      className={inputClass(!!errors.email)}
                      placeholder="jane@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-charcoal mb-1.5">
                      Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      {...register("service")}
                      className={inputClass(!!errors.service)}
                    >
                      <option value="">Select a service…</option>
                      {Object.entries(servicesByCategory).map(([category, items]) => (
                        <optgroup
                          key={category}
                          label={`${CATEGORY_EMOJI[category] ?? "•"} ${category}`}
                        >
                          {items.map((s) => (
                            <option key={s.name} value={s.name}>
                              {s.name}{s.price > 0 ? ` — $${s.price}` : ""}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>
                    )}
                    {serviceInfo && (
                      <p className="text-xs text-gray-500 mt-1">
                        This service takes about {serviceInfo.duration} minutes
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-charcoal mb-1.5">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="date"
                        type="date"
                        {...register("date")}
                        className={inputClass(!!errors.date)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-charcoal mb-1.5">
                        Preferred Time <span className="text-red-500">*</span>
                        {loadingSlots && (
                          <span className="ml-2 text-xs text-gray-400 font-normal">Checking…</span>
                        )}
                      </label>
                      <select
                        id="time"
                        {...register("time")}
                        disabled={timeDisabled}
                        className={`${inputClass(!!errors.time)} disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <option value="">{timePlaceholder}</option>
                        {generatedSlots.map((t) => {
                          const isBooked = bookedSlots.includes(t);
                          return (
                            <option key={t} value={t} disabled={isBooked}>
                              {t}{isBooked ? " — Unavailable" : ""}
                            </option>
                          );
                        })}
                      </select>
                      {errors.time && (
                        <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                      )}
                      {isSunday && (
                        <p className="text-xs text-amber-600 mt-1">
                          We&apos;re closed on Sundays — please pick another day.
                        </p>
                      )}
                      {noSlotsAvailable && (
                        <p className="text-xs text-amber-600 mt-1">
                          No available slots for this date — please pick another day.
                        </p>
                      )}
                      {selectedDate && !loadingSlots && !isSunday && bookedSlots.length > 0 && generatedSlots.length > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          {bookedSlots.filter((b) => generatedSlots.includes(b)).length > 0
                            ? `${bookedSlots.filter((b) => generatedSlots.includes(b)).length} slot${bookedSlots.filter((b) => generatedSlots.includes(b)).length !== 1 ? "s" : ""} unavailable on this date`
                            : null}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-charcoal mb-1.5">
                      Notes (optional)
                    </label>
                    <textarea
                      id="notes"
                      {...register("notes")}
                      className={inputClass(false)}
                      rows={3}
                      placeholder="Any preferences, skin sensitivities, or questions…"
                    />
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-gradient text-white font-semibold py-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 text-base"
                  >
                    {submitting ? "Submitting…" : "Request Appointment"}
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    Prefer to call?{" "}
                    <a
                      href={`tel:${BUSINESS.phoneRaw}`}
                      className="text-brand-purple font-medium hover:underline"
                    >
                      <Phone size={12} className="inline mr-1" />
                      {BUSINESS.phone}
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
