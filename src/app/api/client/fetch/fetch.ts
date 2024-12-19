import AuthUtils from "@/src/app/func/common/auth.utils";

const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

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
        const initialResponse = await fetch(fullUrl, mergedOptions);

        // 401 에러 처리 - 바로 로그아웃
        if (initialResponse.status === 401 && !isServer) {
            localStorage.removeItem("nnzz_token");
            localStorage.removeItem("nnzz_user");
            window.location.href = "/";
            throw new Error('Unauthorized access');
        }

        if (!initialResponse.ok) {
            if (initialResponse.status === 404 || initialResponse.status === 403) {
                if (!isServer) {
                    window.location.href = `/error/${initialResponse.status || "network"}`;
                }
            }
            throw new Error(`HTTP error! status: ${initialResponse.status}`);
        }

        return initialResponse;
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