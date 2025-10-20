import {fetchWithoutToken} from "@/src/app/api/client/fetch/fetch";
import BaseApi from "@/src/app/api/client/base/base-api";
import {JoinParams, JoinRes} from "@/src/types/models/user";


class SignUpApi extends BaseApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/user/join'
    } as const;

    static async join(params: JoinParams): Promise<JoinRes> {
        try {
            const response = await fetchWithoutToken(`${this.BASE_URL}${this.ENDPOINTS.JOIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

export default SignUpApi;