import {SignInType} from "@/src/app/types/page/sign-up/sign-up";

export type AuthValuesType = {
    loading: boolean;
    user: SignInType | null;
    setLoading: (value: boolean) => void;
    setUser: (value: SignInType | null) => void;
};

export interface ErrorResponse {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    timestamp: string;
    message: string;
}


export interface ClientConfig {
    kakaoJsKey: string;
    siteUrl: string;
    imageDomain: string;
    apiBaseUrl: string;
    gaId: string;
}