import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) return NextResponse.json({ bookedSlots: [] });

  const { data } = await supabase
    .from("bookings")
    .select("time")
    .eq("date", date)
    .neq("status", "cancelled");

  const bookedSlots = (data ?? []).map((b: { time: string }) => b.time);
  return NextResponse.json({ bookedSlots });
}
