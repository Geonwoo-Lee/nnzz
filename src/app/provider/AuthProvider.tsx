'use client'
import { createContext, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SignInType } from "@/src/app/types/page/sign-up/sign-up";
import { AuthValuesType } from "@/src/app/types/models/auth";

const defaultProvider: AuthValuesType = {
    user: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean,
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: {
    children: ReactNode
}) => {
    const [user, setUser] = useState<SignInType | null>(defaultProvider.user);
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
    const path = usePathname();
    const router = useRouter();

    const publicPaths = ['/', '/sign-up'];

    useEffect(() => {
        const initAuth = async (): Promise<void> => {
            const isPublicPath = publicPaths.includes(path);
            const storageUserData = window.localStorage.getItem("nnzz_user");

            // localStorage에 유저 데이터가 있는 경우
            if (storageUserData) {
                try {
                    const userData = JSON.parse(storageUserData);
                    setUser(userData);
                    setLoading(false);
                    return; // 유저 데이터가 있으면 여기서 종료
                } catch (e) {
                    console.error('Failed to parse user data:', e);
                }
            }

            // localStorage에 유저 데이터가 없고 public path가 아닌 경우
            if (!isPublicPath && !storageUserData) {
                router.push("/");
            }

            setLoading(false);
        };

        initAuth();
    }, [path, router]);

    const values = {
        user,
        loading,
        setUser,
        setLoading,
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
export default AuthProvider;