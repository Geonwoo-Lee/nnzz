import { LoginRes } from "@/src/types/models/user";
import { LoginToken, SignInType } from "@/src/types/page/sign-up/sign-up";
import { useAuthStore } from "@/src/stores/authStore";
import { useLocationStore } from "@/src/stores/locationStore";

export default class AuthUtils {
  public static isLoggedIn() {
    return useAuthStore.getState().isLoggedIn();
  }

  public static setToken(token: LoginToken) {
    useAuthStore.getState().setToken(token);
  }

  public static getToken(): LoginToken | null {
    return useAuthStore.getState().token;
  }

  public static removeToken() {
    useAuthStore.getState().clearToken();
  }

  public static setUserInfo(userInfo: SignInType) {
    useAuthStore.getState().setUserInfo(userInfo);
  }

  public static getUserInfo(): SignInType | null {
    return useAuthStore.getState().user;
  }

  public static removeUserInfo() {
    useAuthStore.getState().clearUser();
  }

  public static removeLocation() {
    useLocationStore.getState().clearLocation();
  }

  public static async login(loginRes: LoginRes) {
    return useAuthStore.getState().login(loginRes);
  }
}
