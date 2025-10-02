import {JoinParams} from "@/src/app/types/models/user";
import {fetchWithToken} from "@/src/app/api/client/fetch/fetch";

class UpdateUserApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/user'
    } as const;

    static async updateUser(params: JoinParams, type: string) {
        const response = await fetchWithToken(`${this.BASE_URL}${this.ENDPOINTS.JOIN}/${type}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message,
                detail: data.detail,
                response: {
                    data: data
                }
            };
        }

        return data;
    }
}

export default UpdateUserApi