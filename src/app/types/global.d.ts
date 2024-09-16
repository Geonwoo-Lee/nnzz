interface KakaoStatic {
    init(appKey: string): void;
    isInitialized(): boolean;
    Auth: {
        authorize(options: { redirectUri: string }): void;
        getStatusInfo(): Promise<{ status: string }>;
        setAccessToken(token: string): void;
    };
    API: {
        request(options: { url: string; success: (response: any) => void; fail: (error: any) => void }): void;
    };
}

interface Window {
    Kakao: KakaoStatic;
}