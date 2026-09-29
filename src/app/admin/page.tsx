"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar, Phone, Mail, Clock, ChevronDown, ChevronUp,
  LogOut, RefreshCw, User, Bell, BellOff, X,
} from "lucide-react";
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

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map((c) => c.charCodeAt(0))) as Uint8Array<ArrayBuffer>;
}

function playChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const note = (freq: number, t: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.start(t);
      osc.stop(t + dur);
    };

    const base = ctx.currentTime;
    note(1046.5, base, 0.8);         // C6
    note(1318.5, base + 0.13, 1.0);  // E6
    note(1568.0, base + 0.26, 1.2);  // G6
  } catch {}
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"upcoming" | "all">("upcoming");
  const [updating, setUpdating] = useState<string | null>(null);
  const [toast, setToast] = useState<Booking | null>(null);
  const [pushEnabled, setPushEnabled] = useState(false);

  const knownIds = useRef<Set<string>>(new Set());
  const initialized = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const router = useRouter();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bookings");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data: Booking[] = await res.json();
    setBookings(data);

    // Always sync knownIds so manual refresh doesn't re-trigger chime
    data.forEach((b) => knownIds.current.add(b.id));

    if (!initialized.current) {
      initialized.current = true;
      const today = new Date().toISOString().slice(0, 10);
      setExpandedDates(new Set([today]));
    }

    setLoading(false);
  }, [router]);

  const silentPoll = useCallback(async () => {
    if (!initialized.current) return;
    try {
      const res = await fetch("/api/admin/bookings");
      if (!res.ok) return;
      const data: Booking[] = await res.json();

      const newOnes = data.filter((b) => !knownIds.current.has(b.id));
      if (newOnes.length > 0) {
        playChime();

        setToast(newOnes[0]);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 6000);

        setBookings(data);
        data.forEach((b) => knownIds.current.add(b.id));

        const today = new Date().toISOString().slice(0, 10);
        if (newOnes.some((b) => b.date === today)) {
          setExpandedDates((prev) => new Set([...prev, today]));
        }
      }
    } catch {}
  }, []);

  // Initial load
  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  // 30-second polling
  useEffect(() => {
    const id = setInterval(silentPoll, 30_000);
    return () => clearInterval(id);
  }, [silentPoll]);

  // Register service worker + set up push subscription
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey) return;

    navigator.serviceWorker.register("/sw.js").then(async (reg) => {
      const perm = Notification.permission;
      if (perm === "granted") {
        await subscribePush(reg, vapidKey);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function subscribePush(reg: ServiceWorkerRegistration, vapidKey: string) {
    try {
      const existing = await reg.pushManager.getSubscription();
      const sub = existing ?? await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });
      setPushEnabled(true);
    } catch {}
  }

  async function enablePush() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey) return;

    const perm = await Notification.requestPermission();
    if (perm !== "granted") return;

    const reg = await navigator.serviceWorker.ready;
    await subscribePush(reg, vapidKey);
  }

  async function cancelBooking(id: string) {
    setUpdating(id);
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "cancelled" }),
    });
    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
    setUpdating(null);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filtered = filter === "upcoming"
    ? bookings.filter((b) => isFuture(b.date) && b.status !== "cancelled")
    : bookings;

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
      {/* New booking toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm"
          >
            <div className="bg-brand-gradient text-white rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Bell size={15} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm leading-tight">New Appointment!</p>
                <p className="text-white/90 text-xs truncate">{toast.name} — {toast.service}</p>
                <p className="text-white/70 text-xs">{toast.time} · {formatDate(toast.date)}</p>
              </div>
              <button
                onClick={() => { setToast(null); if (toastTimer.current) clearTimeout(toastTimer.current); }}
                className="text-white/70 hover:text-white transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b border-lavender-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold text-charcoal">Appointment Dashboard</h1>
            <p className="text-xs text-gray-500">Urmi Threading Salon</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Push notification status */}
            {pushEnabled ? (
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <Bell size={13} />
                Alerts on
              </div>
            ) : (
              <button
                onClick={enablePush}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-purple transition-colors"
                title="Enable push notifications"
              >
                <BellOff size={13} />
                Enable alerts
              </button>
            )}
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
