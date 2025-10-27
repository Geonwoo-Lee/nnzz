interface ServerConfig {
    kakaoRestKey: string;
    naverSecretKey: string;
    gaId: string;
    chromaticToken: string;
}

export async function getServerConfig(): Promise<ServerConfig> {
    const config = {
        kakaoRestKey: process.env.KAKAO_REST_KEY,
        naverSecretKey: process.env.NAVER_SECRET_KEY,
        gaId: process.env.GA_ID,
        chromaticToken: process.env.CHROMATIC_TOKEN,
    };

    const missingVars: string[] = [];
    Object.entries(config).forEach(([key, value]) => {
        if (!value) {
            missingVars.push(key);
        }
    });

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    return config as ServerConfig;
}

export async function getClientSafeConfig() {
    const config = await getServerConfig();
    return {
        gaId: config.gaId,
    };
}

export async function getKakaoConfig() {
    const config = await getServerConfig();
    return {
        restKey: config.kakaoRestKey,
    };
}

export async function getNaverConfig() {
    const config = await getServerConfig();
    return {
        secretKey: config.naverSecretKey,
    };
}

export async function getChromaticConfig() {
    const config = await getServerConfig();
    return {
        token: config.chromaticToken,
    };
}