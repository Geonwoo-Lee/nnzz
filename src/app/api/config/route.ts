import { NextResponse } from "next/server";
import { getClientSafeConfig } from "@/src/lib/server-config";

export async function GET() {
    try {
        const config = await getClientSafeConfig();
        return NextResponse.json(config);
    } catch (error) {
        console.error('Config API error:', error);
        return NextResponse.json({ error: 'Failed to load config' }, { status: 500 });
    }
}