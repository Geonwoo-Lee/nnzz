import AuthUtils from "../../../app/func/common/auth.utills";

const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

async function customFetch(url: string, options: RequestInit = {}, useToken: boolean = true): Promise<Response> {
    const isServer = typeof window === 'undefined';
    const fullUrl = `${apiKey}${url}`;

    //todo 헤더 수정
    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (!isServer && useToken) {
        const accessToken = AuthUtils.getToken();
        defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
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

        if (initialResponse.status === 401 && !isServer && useToken) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => customFetch(url, options, useToken));
            }

            isRefreshing = true;

            try {
                const newToken = await refreshTokenIfNeeded();
                isRefreshing = false;
                processQueue(null, newToken);

                if (mergedOptions.headers) {
                    (mergedOptions.headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
                }
                return fetch(fullUrl, mergedOptions);
            } catch (error) {
                isRefreshing = false;
                processQueue(error, null);
                throw error;
            }
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

async function refreshTokenIfNeeded(): Promise<string> {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = getSendRefreshToken();

    try {
        const newToken = await refreshPromise;
        AuthUtils.setToken(newToken);
        return newToken;
    } catch (error) {
        handleAuthError();
        throw error;
    } finally {
        refreshPromise = null;
    }
}

async function getSendRefreshToken(): Promise<string> {
    //todo api key 수정
    const response = await customFetch('/api/v1/auth/refresh-token', {
        method: 'GET',
        credentials: 'include',
    }, false);  // 토큰 없이 요청

    if (!response.ok) {
        handleAuthError();
        throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return data.result.token.token;
}

function handleAuthError() {
    if (typeof window !== 'undefined') {
        //todo token명 설정
        localStorage.removeItem("토큰");
        localStorage.removeItem("토큰");
        window.location.href = "/";
    }
}

export function fetchWithoutToken(url: string, options: RequestInit = {}): Promise<Response> {
    return customFetch(url, options, false);
}

export function fetchWithToken(url: string, options: RequestInit = {}): Promise<Response> {
    console.log(url, options)
    return customFetch(url, options, true);
}