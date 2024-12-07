import {fetchWithoutToken} from "@/src/app/api/client/fetch/fetch";
import BaseApi from "@/src/app/api/client/base/base-api";
import { SignInTypeFromServer} from "@/src/app/types/page/sign-up/sign-up";


class SignInApi extends BaseApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/user/login'
    } as const;


    static async login(email: string): Promise<SignInTypeFromServer> {
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