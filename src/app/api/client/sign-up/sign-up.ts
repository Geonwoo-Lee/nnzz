import {fetchWithoutToken} from "@/src/app/api/client/fetch/fetch";
import BaseApi from "@/src/app/api/client/base/base-api";
import {JoinParams} from "@/src/app/types/models/user";


class SignUpApi extends BaseApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/user/join'
    } as const;

    static async join(params: JoinParams) {
        console.log(params, `${this.BASE_URL}${this.ENDPOINTS.JOIN}`)
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
            console.error('Join API Error:', error);
            throw error;
        }
    }
}

export default SignUpApi;