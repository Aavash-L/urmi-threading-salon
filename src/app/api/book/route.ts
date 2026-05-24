import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import webpush from "web-push";
import { supabase } from "@/lib/supabase";

interface BookingPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body: BookingPayload = await req.json();

  const formattedDate = new Date(body.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Check for double booking
  const { data: existing } = await supabase
    .from("bookings")
    .select("id")
    .eq("date", body.date)
    .eq("time", body.time)
    .neq("status", "cancelled")
    .limit(1);

  if (existing && existing.length > 0) {
    return NextResponse.json(
      { error: "That time slot is already booked. Please choose another time." },
      { status: 409 }
    );
  }

  // Save to Supabase
  await supabase.from("bookings").insert({
    name: body.name,
    phone: body.phone,
    email: body.email,
    service: body.service,
    date: body.date,
    time: body.time,
    notes: body.notes || null,
    status: "confirmed",
  });

  // Send web push to all subscribed admin devices
  const vapidPublic = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
  if (vapidPublic && vapidPrivate) {
    webpush.setVapidDetails(
      "mailto:urmithreadingandbeautysalon@gmail.com",
      vapidPublic,
      vapidPrivate
    );
    const { data: subs, error: subErr } = await supabase.from("push_subscriptions").select("*");
    console.log(`Push subscriptions found: ${subs?.length ?? 0}`, subErr?.message ?? "");
    if (subs && subs.length > 0) {
      const payload = JSON.stringify({
        title: "New Appointment Booked!",
        body: `${body.name} — ${body.service} on ${formattedDate} at ${body.time}`,
        url: "/admin",
      });
      await Promise.allSettled(
        subs.map((s) =>
          webpush
            .sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload, { urgency: "high", TTL: 60 })
            .catch(async (err: { statusCode?: number; message?: string }) => {
              console.error("Push failed:", err.statusCode, err.message);
              if (err.statusCode === 410 || err.statusCode === 404) {
                await supabase.from("push_subscriptions").delete().eq("endpoint", s.endpoint);
              }
            })
        )
      );
    }
  }

  // Notify the salon
  await resend.emails.send({
    from: "Urmi Threading Salon <bookings@urmithreadingsalon.com>",
    to: "urmithreadingandbeautysalon@gmail.com",
    subject: `New Booking — ${body.service} on ${formattedDate}`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
        <h2 style="color:#A855F7;">New Appointment Booked!</h2>
        <p style="color:#444;line-height:1.6;">You have a new confirmed booking for <strong>${body.service}</strong> on <strong>${formattedDate} at ${body.time}</strong>.</p>
        <div style="background:#F4EEF8;border-radius:12px;padding:16px;margin:20px 0;">
          <p style="margin:0 0 8px;font-weight:600;color:#1A1A1A;">Client Details</p>
          <p style="margin:0 0 4px;color:#444;font-size:13px;"><strong>Name:</strong> ${body.name}</p>
          <p style="margin:0 0 4px;color:#444;font-size:13px;"><strong>Phone:</strong> <a href="tel:${body.phone}" style="color:#A855F7;">${body.phone}</a></p>
          <p style="margin:0 0 4px;color:#444;font-size:13px;"><strong>Email:</strong> <a href="mailto:${body.email}" style="color:#A855F7;">${body.email}</a></p>
          ${body.notes ? `<p style="margin:8px 0 0;color:#666;font-size:13px;"><strong>Notes:</strong> ${body.notes}</p>` : ""}
        </div>
        <p style="font-size:13px;margin-top:16px;">
          <a href="https://www.urmithreadingsalon.com/admin" style="color:#A855F7;">View all bookings in the admin dashboard →</a>
        </p>
        <p style="color:#999;font-size:12px;margin-top:8px;">Sent from urmithreadingsalon.com booking form</p>
      </div>
    `,
  });

  // Send confirmation to the client
  await resend.emails.send({
    from: "Urmi Threading Salon <bookings@urmithreadingsalon.com>",
    to: body.email,
    subject: "Your appointment is confirmed!",
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
        <h2 style="color:#A855F7;">You're all set, ${body.name}!</h2>
        <p style="color:#444;line-height:1.6;">Your appointment for <strong>${body.service}</strong> on <strong>${formattedDate} at ${body.time}</strong> is confirmed.</p>
        <p style="color:#444;line-height:1.6;">We look forward to seeing you! If you need to cancel or reschedule, please call us.</p>
        <div style="background:#F4EEF8;border-radius:12px;padding:16px;margin:20px 0;">
          <p style="margin:0 0 6px;font-weight:600;color:#1A1A1A;">Urmi Threading Salon</p>
          <p style="margin:0;color:#666;font-size:13px;">150 Hinchman Ave, Wayne, NJ 07470</p>
          <p style="margin:4px 0 0;color:#666;font-size:13px;">(973) 653-9322</p>
        </div>
        <p style="color:#999;font-size:12px;">Questions? Just reply to this email or call us directly.</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
