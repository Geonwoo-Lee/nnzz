import BaseApi from "@/src/app/api/client/base/base-api";
import {fetchWithToken} from "@/src/app/api/client/fetch/fetch";

class RequestLocationApi extends BaseApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/location/open'
    } as const;

    public static async requestLocation(params: {address: string, lat: string, lng: string}) {
        try {
            const response = await fetchWithToken(`${this.BASE_URL}${this.ENDPOINTS.JOIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: decodeURIComponent(params.address),
                    lat: params.lat,
                    lng: params.lng,
                }),
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

export default RequestLocationApi