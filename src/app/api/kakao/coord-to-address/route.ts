import { NextResponse } from 'next/server';
import {getKakaoConfig} from "@/src/lib/server-config";

export async function POST(request: Request) {
    try {
        const { latitude, longitude } = await request.json();

        if (!latitude || !longitude) {
            return NextResponse.json(
                { error: 'Latitude and longitude are required' },
                { status: 400 }
            );
        }

        const { restKey } = await getKakaoConfig();

        const response = await fetch(
            `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
            {
                headers: {
                    'Authorization': `KakaoAK ${restKey}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Kakao coord to address error:', error);
        return NextResponse.json(
            { error: 'Coordinate to address conversion failed' },
            { status: 500 }
        );
    }
}