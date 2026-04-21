import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LoginRes } from "@/src/types/models/user";
import { LoginToken, SignInType } from "@/src/types/page/sign-up/sign-up";

type AuthState = {
  user: SignInType | null;
  token: LoginToken | null;
};

type AuthActions = {
  setToken: (token: LoginToken) => void;
  setUserInfo: (user: SignInType) => void;
  login: (loginRes: LoginRes) => Promise<boolean>;
  logout: () => void;
  clearToken: () => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
};

const STORAGE_KEY = "nnzz_auth";
const LEGACY_TOKEN_KEY = "nnzz_token";
const LEGACY_USER_KEY = "nnzz_user";

const migrateLegacy = (): Partial<AuthState> => {
  if (typeof window === "undefined") return {};
  try {
    const legacyToken = localStorage.getItem(LEGACY_TOKEN_KEY);
    const legacyUser = localStorage.getItem(LEGACY_USER_KEY);
    const parsed: Partial<AuthState> = {};
    if (legacyToken) parsed.token = JSON.parse(legacyToken);
    if (legacyUser) parsed.user = JSON.parse(legacyUser);
    if (legacyToken || legacyUser) {
      localStorage.removeItem(LEGACY_TOKEN_KEY);
      localStorage.removeItem(LEGACY_USER_KEY);
    }
    return parsed;
  } catch {
    return {};
  }
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setToken: (token) => set({ token }),
      setUserInfo: (user) => set({ user }),
      login: (loginRes) =>
        new Promise<boolean>((resolve) => {
          set({ user: { ...loginRes.member } });
          resolve(true);
        }),
      logout: () => set({ user: null, token: null }),
      clearToken: () => set({ token: null }),
      clearUser: () => set({ user: null }),
      isLoggedIn: () => {
        const { user, token } = get();
        return user != null && token != null;
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (state.user != null && state.token != null) return;
        const legacy = migrateLegacy();
        if (legacy.user || legacy.token) {
          useAuthStore.setState(legacy);
        }
      },
    },
  ),
);
