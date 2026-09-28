import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendCancellation, sendConfirmation } from "@/lib/booking/delivery";
import type { StoredRequest } from "@/lib/booking/store";

function isAuthed(req: NextRequest) {
  return !!process.env.ADMIN_PASSWORD && req.cookies.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await getSupabase()
    .from("bookings")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Staff confirm or cancel a request. The client is emailed only when they gave an email.
export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  if (typeof id !== "string" || (status !== "confirmed" && status !== "cancelled")) {
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data: booking } = await supabase.from("bookings").select("*").eq("id", id).single();

  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (booking) {
    const row = booking as StoredRequest;
    if (status === "confirmed") await sendConfirmation(row);
    else await sendCancellation(row);
  }

  return NextResponse.json({ success: true });
}
