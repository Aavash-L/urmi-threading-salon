import { Resend } from "resend";
import webpush from "web-push";
import { BUSINESS } from "@/lib/constants";
import { getSupabase } from "@/lib/supabase";
import { labelFor, toMinutes } from "@/lib/booking/scheduling";
import { testSink, testSinkPath, type StoredRequest } from "@/lib/booking/store";

// Staff notifications and the client acknowledgement for appointment requests.
// With BOOKING_TEST_SINK set, every message is recorded in the test sink and
// nothing is sent to Telegram, web push or email.

export interface ChannelResult {
  channel: "email" | "telegram" | "push" | "sink";
  ok: boolean;
  error?: string;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function describe(req: Pick<StoredRequest, "date" | "time">) {
  const [y, m, d] = req.date.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  const minutes = toMinutes(req.time);
  return { date, time: minutes == null ? req.time : labelFor(minutes) };
}

let resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  resend ??= new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const FROM = "Urmi Threading Salon <bookings@urmithreadingsalon.com>";

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const client = getResend();
  if (!client) throw new Error("RESEND_API_KEY not configured");
  const { error } = await client.emails.send({ from: FROM, to, subject, html });
  if (error) throw new Error(error.message);
}

function staffEmailHtml(req: StoredRequest) {
  const { date, time } = describe(req);
  const e = escapeHtml;
  return `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
      <h2 style="color:#7E22CE;">New appointment request (not yet confirmed)</h2>
      <p style="color:#444;line-height:1.6;"><strong>${e(req.service)}</strong> — preferred time <strong>${e(date)} at ${e(time)}</strong>.</p>
      <p style="color:#444;line-height:1.6;">Please contact the client to confirm, then mark it confirmed in the admin dashboard.</p>
      <div style="background:#F4EEF8;border-radius:12px;padding:16px;margin:20px 0;">
        <p style="margin:0 0 4px;color:#444;font-size:13px;"><strong>Name:</strong> ${e(req.name)}</p>
        <p style="margin:0 0 4px;color:#444;font-size:13px;"><strong>Phone:</strong> ${e(req.phone)}</p>
        ${req.email ? `<p style="margin:0 0 4px;color:#444;font-size:13px;"><strong>Email:</strong> ${e(req.email)}</p>` : ""}
        ${req.notes ? `<p style="margin:8px 0 0;color:#444;font-size:13px;"><strong>Notes:</strong> ${e(req.notes)}</p>` : ""}
      </div>
      <p style="font-size:13px;"><a href="${BUSINESS.url}/admin" style="color:#7E22CE;">Open the admin dashboard</a></p>
    </div>`;
}

function clientAckHtml(req: StoredRequest) {
  const { date, time } = describe(req);
  const e = escapeHtml;
  return `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
      <h2 style="color:#7E22CE;">Appointment request received</h2>
      <p style="color:#444;line-height:1.6;">Hi ${e(req.name)}, we received your request for <strong>${e(req.service)}</strong> on <strong>${e(date)} at ${e(time)}</strong>.</p>
      <p style="color:#444;line-height:1.6;"><strong>Your appointment is not confirmed yet.</strong> The salon will contact you to confirm availability. For urgent questions, call ${BUSINESS.phone}.</p>
      <p style="margin:16px 0 0;color:#666;font-size:13px;">${BUSINESS.name} · ${BUSINESS.address.full} · ${BUSINESS.phone}</p>
    </div>`;
}

function sinkRecord(channel: string, to: string, subject: string, body: string) {
  testSink.state.messages.push({ channel, to, subject, body });
  testSink.persist();
}

/** Notify staff on every configured channel. Returns one result per attempted channel. */
export async function notifyStaff(req: StoredRequest): Promise<ChannelResult[]> {
  if (testSinkPath()) {
    if (testSink.state.failures.staff) return [{ channel: "sink", ok: false, error: "simulated failure" }];
    sinkRecord("staff", BUSINESS.email, `New request — ${req.service}`, staffEmailHtml(req));
    return [{ channel: "sink", ok: true }];
  }

  const { date, time } = describe(req);
  const tasks: Promise<ChannelResult>[] = [];

  tasks.push(
    sendEmail(BUSINESS.email, `New appointment request — ${req.service} on ${date}`, staffEmailHtml(req))
      .then(() => ({ channel: "email" as const, ok: true }))
      .catch((err: Error) => ({ channel: "email" as const, ok: false, error: err.message }))
  );

  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;
  if (tgToken && tgChatId) {
    const text = `New appointment REQUEST (not confirmed)\n${req.name} - ${req.service}\n${date} at ${time}\nPhone: ${req.phone}${req.notes ? `\nNotes: ${req.notes}` : ""}`;
    tasks.push(
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ chat_id: tgChatId, text }),
      })
        .then((r) => ({ channel: "telegram" as const, ok: r.ok, error: r.ok ? undefined : `HTTP ${r.status}` }))
        .catch((err: Error) => ({ channel: "telegram" as const, ok: false, error: err.message }))
    );
  }

  const vapidPublic = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
  if (vapidPublic && vapidPrivate) {
    tasks.push(
      (async (): Promise<ChannelResult> => {
        webpush.setVapidDetails(`mailto:${BUSINESS.email}`, vapidPublic, vapidPrivate);
        const { data: subs } = await getSupabase().from("push_subscriptions").select("*");
        if (!subs?.length) return { channel: "push", ok: false, error: "no subscriptions" };
        const payload = JSON.stringify({
          title: "New Appointment Request",
          body: `${req.name} — ${req.service} on ${date} at ${time} (not confirmed yet)`,
          url: "/admin",
        });
        const results = await Promise.allSettled(
          subs.map((s) =>
            webpush
              .sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload, { urgency: "high", TTL: 60 })
              .catch(async (err: { statusCode?: number; message?: string }) => {
                if (err.statusCode === 410 || err.statusCode === 404) {
                  await getSupabase().from("push_subscriptions").delete().eq("endpoint", s.endpoint);
                }
                throw err;
              })
          )
        );
        const ok = results.some((r) => r.status === "fulfilled");
        return { channel: "push", ok, error: ok ? undefined : "all push sends failed" };
      })().catch((err: Error) => ({ channel: "push" as const, ok: false, error: err.message }))
    );
  }

  return Promise.all(tasks);
}

/** Acknowledge the request to the client (only when they gave an email). Never says "confirmed". */
export async function acknowledgeClient(req: StoredRequest): Promise<boolean> {
  if (!req.email) return false;
  const subject = "We received your appointment request";
  if (testSinkPath()) {
    sinkRecord("client", req.email, subject, clientAckHtml(req));
    return true;
  }
  try {
    await sendEmail(req.email, subject, clientAckHtml(req));
    return true;
  } catch {
    return false;
  }
}

/** Sent when staff confirm a request in the admin dashboard. */
export async function sendConfirmation(req: StoredRequest): Promise<boolean> {
  if (!req.email) return false;
  const { date, time } = describe(req);
  const e = escapeHtml;
  const html = `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
      <h2 style="color:#7E22CE;">Your appointment is confirmed</h2>
      <p style="color:#444;line-height:1.6;">Hi ${e(req.name)}, the salon has confirmed your <strong>${e(req.service)}</strong> appointment on <strong>${e(date)} at ${e(time)}</strong>.</p>
      <p style="color:#444;line-height:1.6;">To change or cancel, please call ${BUSINESS.phone}.</p>
      <p style="margin:16px 0 0;color:#666;font-size:13px;">${BUSINESS.name} · ${BUSINESS.address.full}</p>
    </div>`;
  if (testSinkPath()) {
    sinkRecord("client", req.email, "Your appointment is confirmed", html);
    return true;
  }
  try {
    await sendEmail(req.email, "Your appointment is confirmed", html);
    return true;
  } catch {
    return false;
  }
}

export async function sendCancellation(req: StoredRequest): Promise<boolean> {
  if (!req.email) return false;
  const { date, time } = describe(req);
  const e = escapeHtml;
  const html = `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
      <h2 style="color:#7E22CE;">Appointment cancelled</h2>
      <p style="color:#444;line-height:1.6;">Hi ${e(req.name)}, your <strong>${e(req.service)}</strong> appointment on <strong>${e(date)} at ${e(time)}</strong> has been cancelled.</p>
      <p style="color:#444;line-height:1.6;">Please call ${BUSINESS.phone} or send a new request to find another time.</p>
      <p style="margin:16px 0 0;color:#666;font-size:13px;">${BUSINESS.name} · ${BUSINESS.address.full}</p>
    </div>`;
  if (testSinkPath()) {
    sinkRecord("client", req.email, "Your appointment has been cancelled", html);
    return true;
  }
  try {
    await sendEmail(req.email, "Your appointment has been cancelled", html);
    return true;
  } catch {
    return false;
  }
}
