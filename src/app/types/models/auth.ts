import {SignInType} from "@/src/app/types/page/sign-up/sign-up";

export type AuthValuesType = {
    loading: boolean;
    user: SignInType | null;
    setLoading: (value: boolean) => void;
    setUser: (value: SignInType | null) => void;
};