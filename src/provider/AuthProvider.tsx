"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SignInType } from "@/src/types/page/sign-up/sign-up";
import { AuthValuesType } from "@/src/types/models/auth";

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SignInType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const path = usePathname();
  const router = useRouter();

  // Public paths 체크 함수
  const isPublicPath = (pathname: string): boolean => {
    const publicPaths = [
      "/",
      "/sign-up",
      "/blog/list",
      "/blog",
      "/shorts",
      "/shorts/list",
      "/shorts-home-test"
    ];

    if (publicPaths.includes(pathname)) {
      return true;
    }

    if (pathname.startsWith("/shorts/") && pathname.split("/").length === 3) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const isPublic = isPublicPath(path);
      const storageUserData = window.localStorage.getItem("nnzz_user");

      if (storageUserData) {
        try {
          const userData = JSON.parse(storageUserData);
          setUser(userData);
          setLoading(false);
          return;
        } catch (e) {
          console.error("Failed to parse user data:", e);
        }
      }

      if (!isPublic && !storageUserData) {
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
};

export { AuthContext, AuthProvider };
export default AuthProvider;