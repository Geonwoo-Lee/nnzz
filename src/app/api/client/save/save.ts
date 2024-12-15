import BaseApi from "@/src/app/api/client/base/base-api";
import {fetchWithToken} from "@/src/app/api/client/fetch/fetch";
import {LocationType} from "@/src/app/types/models/geo";

class SaveApi extends BaseApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/location/save'
    } as const;

    public static SaveLocation(params: LocationType) {
        const url = `${this.BASE_URL}${this.ENDPOINTS.JOIN}`;
        return fetchWithToken(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: params.latitude,
                lng: params.longitude,
                address: params.address,
                buildingName: params.name
            })
        })
    }

    public static async GetSavedLocation() {
        const url = `${this.BASE_URL}/api/location/user`;
        const response = await fetchWithToken(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    }
}

export default SaveApi