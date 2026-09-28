import { NextRequest, NextResponse } from "next/server";
import { submitRequest, MESSAGES } from "@/lib/booking/submit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: MESSAGES.failure }, { status: 400 });
  }
  const result = await submitRequest(body);
  return NextResponse.json(result.body, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
