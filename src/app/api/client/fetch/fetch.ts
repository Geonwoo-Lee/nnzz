import AuthUtils from "@/src/app/func/common/auth.utils";

const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

interface ErrorResponse {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    timestamp: string;
    message: string;
}

async function customFetch(url: string, options: RequestInit = {}, useToken: boolean = true): Promise<Response> {
    const isServer = typeof window === 'undefined';
    const fullUrl = `${apiKey}${url}`;

    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (!isServer && useToken) {
        const tokenObj = AuthUtils.getToken();
        if (tokenObj?.accessToken) {
            defaultHeaders['Authorization'] = tokenObj.accessToken;
        }
    }

    const mergedOptions: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers as Record<string, string>),
        },
    };

    try {
        const response = await fetch(fullUrl, mergedOptions);

        // 401 에러 처리 - 바로 로그아웃
        if (response.status === 401 && !isServer) {
            localStorage.removeItem("nnzz_token");
            localStorage.removeItem("nnzz_user");
            window.location.href = "/";
            throw new Error('Unauthorized access');
        }

        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new Error(errorData.message);
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export function fetchWithoutToken(url: string, options: RequestInit = {}): Promise<Response> {
    return customFetch(url, options, false);
}

export function fetchWithToken(url: string, options: RequestInit = {}): Promise<Response> {
    return customFetch(url, options, true);
}