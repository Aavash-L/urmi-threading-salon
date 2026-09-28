import { NextRequest, NextResponse } from "next/server";
import { getBookableItem } from "@/lib/catalog";
import { dateStatus, generateSlots } from "@/lib/booking/scheduling";
import { getStore } from "@/lib/booking/store";

export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

// GET /api/availability?date=YYYY-MM-DD&service=<catalog id>
// Returns preferred start times for that service. Errors are explicit (never an
// empty "everything is free" answer).
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date") ?? "";
  const item = getBookableItem(req.nextUrl.searchParams.get("service"));
  if (!item) return NextResponse.json({ error: "Unknown service" }, { status: 400, headers: noStore });

  const status = dateStatus(date);
  if (status !== "ok") return NextResponse.json({ date, status, slots: [] }, { headers: noStore });

  try {
    const existing = await getStore().listActive(date);
    const slots = generateSlots(date, item.duration, existing);
    return NextResponse.json({ date, status, slots }, { headers: noStore });
  } catch (err) {
    console.error("[availability] failed", err);
    return NextResponse.json({ error: "Availability unavailable" }, { status: 503, headers: noStore });
  }
}
