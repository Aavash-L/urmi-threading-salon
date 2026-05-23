"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { BUSINESS } from "@/lib/constants";

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

const ALL_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM",  "1:30 PM",
  "2:00 PM",  "2:30 PM",  "3:00 PM",  "3:30 PM",
  "4:00 PM",  "4:30 PM",  "5:00 PM",  "5:30 PM",
];

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

  const selectedDate = watch("date");
  const selectedTime = watch("time");

  // Fetch booked slots whenever date changes
  useEffect(() => {
    if (!selectedDate) { setBookedSlots([]); return; }
    setLoadingSlots(true);
    setValue("time", ""); // reset time when date changes
    fetch(`/api/availability?date=${selectedDate}`)
      .then((r) => r.json())
      .then(({ bookedSlots }) => setBookedSlots(bookedSlots ?? []))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, setValue]);

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
      hasError ? "border-red-400 focus:ring-red-400" : "border-lavender-100 hover:border-brand-purple/40"
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
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
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
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
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
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
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
                      <optgroup label="✨ Threading">
                        <option>Eyebrow Threading — $10</option>
                        <option>Men's Eyebrow — $10</option>
                        <option>Upper Lip — $6</option>
                        <option>Lower Lip — $3</option>
                        <option>Chin — $7</option>
                        <option>Forehead — $7</option>
                        <option>Side Threading — $12</option>
                        <option>Neck Threading — $6</option>
                        <option>Cheek Threading — $6</option>
                        <option>Eye &amp; Lip — $16</option>
                        <option>Eye, Lip &amp; Chin — $23</option>
                        <option>Eye, Lip, Chin &amp; Neck — $27</option>
                        <option>Full Face — $35</option>
                        <option>Full Face with Neck — $40</option>
                      </optgroup>
                      <optgroup label="🌿 Waxing">
                        <option>Eyebrow Wax — $12</option>
                        <option>Nose Wax (inside) — $6</option>
                        <option>Nose Wax — $12</option>
                        <option>Ear Wax — $12</option>
                        <option>Under Arm Wax — $15</option>
                        <option>Stomach Line — $8</option>
                        <option>Stomach Wax — $30</option>
                        <option>Bikini Line — $20</option>
                        <option>Deep Bikini Wax — $30</option>
                        <option>Brazilian Wax — $45</option>
                        <option>Butt Wax — $25</option>
                        <option>Half Arm Wax — $20</option>
                        <option>Full Arm Wax — $30</option>
                        <option>Half Leg Wax — $30</option>
                        <option>Upper Half Leg Wax — $35</option>
                        <option>Full Leg Wax — $45</option>
                        <option>Arm, Leg &amp; Underarm — $80</option>
                        <option>Back Neck Wax — $12</option>
                        <option>Women's Back Wax — $40</option>
                        <option>Women's Chest Wax — $45</option>
                        <option>Men's Back Wax — $50</option>
                        <option>Men's Chest Wax — $50</option>
                        <option>Full Body Wax — $180</option>
                      </optgroup>
                      <optgroup label="🌸 Facials">
                        <option>Face Bleach — $35</option>
                        <option>Face Polish — $45</option>
                        <option>Eye Treatment — $50</option>
                        <option>Mini Facial — $45</option>
                        <option>Basic Facial — $65</option>
                        <option>Deep Cleaning Facial — $65</option>
                        <option>Acne Facial — $85</option>
                        <option>Fruits Facial — $80</option>
                        <option>Gold Facial — $80</option>
                        <option>Repechage Facial — $80</option>
                        <option>Diamond Facial — $90</option>
                        <option>Four Layer Facial — $120</option>
                      </optgroup>
                      <optgroup label="👁️ Lash &amp; Brow">
                        <option>Eyebrow Tinting — $15</option>
                        <option>Eyelash Tinting — $20</option>
                        <option>Eyelash Extensions — $50</option>
                        <option>Eyelash Exchange — $50</option>
                      </optgroup>
                      <optgroup label="🌺 Henna">
                        <option>Henna Design (hands)</option>
                        <option>Henna Design (feet)</option>
                        <option>Henna Design (full)</option>
                      </optgroup>
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
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
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-charcoal mb-1.5">
                        Preferred Time <span className="text-red-500">*</span>
                        {loadingSlots && <span className="ml-2 text-xs text-gray-400 font-normal">Checking…</span>}
                      </label>
                      <select
                        id="time"
                        {...register("time")}
                        disabled={!selectedDate || loadingSlots}
                        className={`${inputClass(!!errors.time)} disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <option value="">
                          {!selectedDate ? "Pick a date first" : loadingSlots ? "Loading…" : "Select a time…"}
                        </option>
                        {ALL_SLOTS.map((t) => {
                          const isBooked = bookedSlots.includes(t);
                          return (
                            <option key={t} value={t} disabled={isBooked}>
                              {t}{isBooked ? " — Unavailable" : ""}
                            </option>
                          );
                        })}
                      </select>
                      {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                      {selectedDate && !loadingSlots && bookedSlots.length > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          {bookedSlots.length} slot{bookedSlots.length !== 1 ? "s" : ""} unavailable on this date
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
                    <a href={`tel:${BUSINESS.phoneRaw}`} className="text-brand-purple font-medium hover:underline">
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
