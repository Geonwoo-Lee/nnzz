import {fetchWithoutToken} from "@/src/api/client/fetch/fetch";
import BaseApi from "@/src/api/client/base/base-api";
import { logoutRes} from "@/src/types/page/sign-up/sign-up";


class LogoutApi extends BaseApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/user/logout'
    } as const;


    static async logout( authorization: string): Promise<logoutRes> {
        try {
            const response = await fetchWithoutToken(`${this.BASE_URL}${this.ENDPOINTS.JOIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

export default LogoutApi;