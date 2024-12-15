import {fetchWithoutToken} from "@/src/app/api/client/fetch/fetch";
import BaseApi from "@/src/app/api/client/base/base-api";
import { logoutRes} from "@/src/app/types/page/sign-up/sign-up";


class DeleteApi extends BaseApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/user'
    } as const;


    static async DeleteUser(token: string): Promise<logoutRes> {
        const url = `${this.BASE_URL}/api/user`
        try {
            const response = await fetchWithoutToken(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

export default DeleteApi;