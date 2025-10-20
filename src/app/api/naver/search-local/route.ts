import { NextResponse } from 'next/server';
import {getNaverConfig} from "@/src/lib/server-config";

export async function POST(request: Request) {
    try {
        const { query, display = 5, start = 1, sort = 'random' } = await request.json();
        if (!query) {
            return NextResponse.json(
                { error: 'Search query is required' },
                { status: 400 }
            );
        }

        const { secretKey } = await getNaverConfig();

        const response = await fetch(
            `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=${display}&start=${start}&sort=${sort}`,
            {
                headers: {
                    'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
                    'X-Naver-Client-Secret': secretKey, // 서버에서만 사용
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Naver local search error:', error);
        return NextResponse.json(
            { error: 'Local search failed' },
            { status: 500 }
        );
    }
}