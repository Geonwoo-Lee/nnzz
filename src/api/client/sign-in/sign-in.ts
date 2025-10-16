import {fetchWithoutToken} from "@/src/api/client/fetch/fetch";
import BaseApi from "@/src/api/client/base/base-api";
import {LoginRes} from "@/src/types/page/sign-up/sign-up";


class SignInApi extends BaseApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/user/login'
    } as const;


    static async login(email: string): Promise<LoginRes> {
        try {
            const response = await fetchWithoutToken(`${this.BASE_URL}${this.ENDPOINTS.JOIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(email)
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

export default SignInApi;