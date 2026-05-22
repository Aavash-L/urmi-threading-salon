"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Phone, Mail, Clock, ChevronDown, ChevronUp, LogOut, RefreshCw, User } from "lucide-react";
import type { Booking, BookingStatus } from "@/lib/supabase";

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-400 border-red-200",
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function isToday(dateStr: string) {
  const today = new Date().toISOString().slice(0, 10);
  return dateStr === today;
}

function isFuture(dateStr: string) {
  const today = new Date().toISOString().slice(0, 10);
  return dateStr >= today;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"upcoming" | "all">("upcoming");
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bookings");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setBookings(data);
    setLoading(false);

    // Auto-expand today
    const today = new Date().toISOString().slice(0, 10);
    setExpandedDates(new Set([today]));
  }, [router]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  async function cancelBooking(id: string) {
    setUpdating(id);
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "cancelled" }),
    });
    setBookings((prev) => prev.filter((b) => b.id !== id));
    setUpdating(null);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filtered = filter === "upcoming"
    ? bookings.filter((b) => isFuture(b.date) && b.status !== "cancelled")
    : bookings;

  // Group by date
  const grouped = filtered.reduce<Record<string, Booking[]>>((acc, b) => {
    acc[b.date] = acc[b.date] ? [...acc[b.date], b] : [b];
    return acc;
  }, {});
  const dates = Object.keys(grouped).sort();

  const todayCount = bookings.filter((b) => isToday(b.date) && b.status !== "cancelled").length;
  const upcomingCount = bookings.filter((b) => isFuture(b.date) && b.status !== "cancelled").length;
  const totalCount = bookings.filter((b) => b.status !== "cancelled").length;

  function toggleDate(date: string) {
    setExpandedDates((prev) => {
      const next = new Set(prev);
      next.has(date) ? next.delete(date) : next.add(date);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-lavender-50">
      {/* Header */}
      <div className="bg-white border-b border-lavender-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold text-charcoal">Appointment Dashboard</h1>
            <p className="text-xs text-gray-500">Urmi Threading Salon</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="p-2 rounded-full hover:bg-lavender-50 text-gray-400 hover:text-brand-purple transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Today", value: todayCount, color: "text-brand-purple" },
            { label: "Upcoming", value: upcomingCount, color: "text-emerald-600" },
            { label: "Total", value: totalCount, color: "text-charcoal" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 text-center card-shadow">
              <p className={`text-3xl font-bold font-serif ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(["upcoming", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === f
                  ? "bg-brand-gradient text-white shadow-sm"
                  : "bg-white border border-lavender-100 text-gray-500 hover:border-brand-purple"
              }`}
            >
              {f === "upcoming" ? "Upcoming" : "All Bookings"}
            </button>
          ))}
        </div>

        {/* Day sheets */}
        {loading ? (
          <div className="text-center py-16 text-gray-400 text-sm">Loading bookings…</div>
        ) : dates.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No bookings found.</div>
        ) : (
          <div className="space-y-3">
            {dates.map((date) => {
              const dayBookings = grouped[date];
              const isExpanded = expandedDates.has(date);
              const today = isToday(date);

              return (
                <div
                  key={date}
                  className={`bg-white rounded-2xl overflow-hidden card-shadow border ${today ? "border-brand-purple" : "border-lavender-100"}`}
                >
                  {/* Date header */}
                  <button
                    onClick={() => toggleDate(date)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-lavender-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${today ? "bg-brand-gradient" : "bg-lavender-50"}`}>
                        <Calendar size={16} className={today ? "text-white" : "text-brand-purple"} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-charcoal text-sm">{formatDate(date)}</p>
                        <p className="text-xs text-gray-400">
                          {dayBookings.length} appointment{dayBookings.length !== 1 ? "s" : ""}
                          {today && <span className="ml-2 text-brand-purple font-semibold">· Today</span>}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>

                  {/* Booking rows */}
                  {isExpanded && (
                    <div className="border-t border-lavender-100 divide-y divide-lavender-50">
                      {dayBookings.map((b) => (
                        <div key={b.id} className="px-6 py-4 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-semibold text-charcoal text-sm">{b.name}</p>
                                <span className={`text-[10px] font-bold uppercase tracking-wide border px-2 py-0.5 rounded-full ${STATUS_STYLES[b.status]}`}>
                                  {STATUS_LABELS[b.status]}
                                </span>
                              </div>
                              <p className="text-sm text-brand-purple font-medium">{b.service}</p>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={11} />
                                {b.time}
                              </div>
                            </div>

                            {/* Cancel button */}
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => cancelBooking(b.id)}
                                disabled={updating === b.id}
                                className="text-xs font-semibold text-red-400 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                              >
                                {updating === b.id ? "…" : "Cancel"}
                              </button>
                            </div>
                          </div>

                          {/* Contact */}
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 hover:text-brand-purple transition-colors">
                              <Phone size={11} />
                              {b.phone}
                            </a>
                            <a href={`mailto:${b.email}`} className="flex items-center gap-1.5 hover:text-brand-purple transition-colors">
                              <Mail size={11} />
                              {b.email}
                            </a>
                          </div>

                          {b.notes && (
                            <p className="text-xs text-gray-500 bg-lavender-50 rounded-lg px-3 py-2 flex items-start gap-1.5">
                              <User size={11} className="mt-0.5 shrink-0" />
                              {b.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
