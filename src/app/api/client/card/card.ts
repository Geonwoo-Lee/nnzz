import BaseApi from "@/src/app/api/client/base/base-api";
import {fetchWithToken} from "@/src/app/api/client/fetch/fetch";

class CardApi extends BaseApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/card/make'
    } as const;

    public static SaveLocation(params: {id: number | string, date: string, day: string, authorization: string}) {
        const url = `${this.BASE_URL}${this.ENDPOINTS.JOIN}`;
        return fetchWithToken(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeId: params.id,
                date: `${params.date} ${params.day}`
            }),
        })
    }
}

export default CardApi