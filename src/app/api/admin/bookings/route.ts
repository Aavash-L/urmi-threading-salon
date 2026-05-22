import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();

  // Fetch booking details before updating so we can email the client
  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send cancellation email to client
  if (status === "cancelled" && booking) {
    const formattedDate = new Date(booking.date + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    await resend.emails.send({
      from: "Urmi Threading Salon <bookings@urmithreadingsalon.com>",
      to: booking.email,
      subject: "Your appointment has been cancelled",
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
          <h2 style="color:#A855F7;">Appointment Cancelled</h2>
          <p style="color:#444;line-height:1.6;">Hi ${booking.name}, your appointment for <strong>${booking.service}</strong> on <strong>${formattedDate} at ${booking.time}</strong> has been cancelled.</p>
          <p style="color:#444;line-height:1.6;">We're sorry for any inconvenience. Please call or book again to reschedule at a time that works for you.</p>
          <div style="background:#F4EEF8;border-radius:12px;padding:16px;margin:20px 0;">
            <p style="margin:0 0 6px;font-weight:600;color:#1A1A1A;">Urmi Threading Salon</p>
            <p style="margin:0;color:#666;font-size:13px;">150 Hinchman Ave, Wayne, NJ 07470</p>
            <p style="margin:4px 0 0;color:#666;font-size:13px;">(973) 653-9322</p>
          </div>
          <p style="color:#999;font-size:12px;">Questions? Call us directly or reply to this email.</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ success: true });
}
