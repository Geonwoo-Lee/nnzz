import { NextResponse } from 'next/server';
import {getKakaoConfig} from "@/src/lib/server-config";

export async function POST(request: Request) {
    try {
        const { keyword } = await request.json();

        if (!keyword) {
            return NextResponse.json(
                { error: 'Keyword is required' },
                { status: 400 }
            );
        }

        const { restKey } = await getKakaoConfig();

        const response = await fetch(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(keyword)}`,
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
        console.error('Kakao address search error:', error);
        return NextResponse.json(
            { error: 'Address search failed' },
            { status: 500 }
        );
    }
}

