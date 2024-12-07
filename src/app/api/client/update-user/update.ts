import {JoinParams} from "@/src/app/types/models/user";


class UpdateUserApi {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    private static readonly ENDPOINTS = {
        JOIN: '/api/user/update'
    } as const;

    static async updateUser(params: JoinParams) {
        const response = await fetch(`${this.BASE_URL}${this.ENDPOINTS.JOIN}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        return await response.json();
    }
}

export default UpdateUserApi