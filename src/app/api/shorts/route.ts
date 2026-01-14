import { NextResponse } from "next/server";
import { fetchShorts } from "@/src/lib/shorts";

export async function GET() {
  try {
    const shorts = await fetchShorts();
    return NextResponse.json(shorts);
  } catch (error) {
    console.error("Failed to fetch shorts:", error);
    return NextResponse.json({ error: "Failed to fetch shorts" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
