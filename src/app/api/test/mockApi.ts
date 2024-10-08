import {LoginRes} from "@/src/app/types/models/user";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    login: async (username: string, password: string): Promise<LoginRes> => {
        await delay(500); // 실제 API 호출을 시뮬레이션하기 위한 지연
        if (username === "testuser" && password === "password") {
            return {
                token: { token: "fake_token_123" },
                member: {
                    id: "1",
                    nickname: "Test User",
                    email: "testuser@example.com",
                    profileImage: ''
                }
            };
        }
        throw new Error("Invalid credentials");
    },

    getProtectedData: async (token: string): Promise<string> => {
        await delay(300);
        if (token === "fake_token_123") {
            return "This is protected data";
        }
        throw new Error("Unauthorized");
    },

    refreshToken: async (oldToken: string): Promise<string> => {
        await delay(300);
        if (oldToken === "fake_token_123") {
            return "new_fake_token_456";
        }
        throw new Error("Invalid token");
    }
};