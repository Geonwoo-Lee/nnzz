import BaseApi from "@/src/app/api/client/base/base-api";
import { fetchWithToken} from "@/src/app/api/client/fetch/fetch";
import {FindCategoryReq, FindRestaurantReq, FindStore} from "@/src/app/types/models/find";
import {FoodItemFromServer} from "@/src/app/types/models/food";


class FindApi extends BaseApi{
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/find'
    } as const;

    static async findCategories(params: FindCategoryReq): Promise<FoodItemFromServer[]> {
        try {
            // Query string 생성
            const queryParams = new URLSearchParams({
                lng: params.data.lng.toString(),
                lat: params.data.lat.toString(),
                day: params.data.day
            });

            const url = `${this.BASE_URL}/api/find/${params.type}/category?${queryParams}`;

            const response = await fetchWithToken(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    static async findRestaurants(params: FindRestaurantReq): Promise<FindStore[]> {
        const url = `${this.BASE_URL}/api/find/${params.type}/detail/${params.distance}`;
        const response = await fetchWithToken(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: params.data.lat,
                lng: params.data.lng,
                day: params.data.day,
                categoryList: params.data.category // categoryList로 파라미터 이름 변경
            })
        });
        return await response.json();
    }
}

export default FindApi