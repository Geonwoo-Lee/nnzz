import {LoginRes} from "@/src/app/types/models/user";
import {SignInType} from "@/src/app/types/page/sign-up/sign-up";

export default class AuthUtils {
    public static isLoggedIn() {
        return this.getToken() != null && this.getUserInfo() != null;
    }

    private static TOKEN_KEY = "토큰";

    public static setToken(token: string) {
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    }

    public static getToken(): string | null {
        const tokenStr = localStorage.getItem(this.TOKEN_KEY);
        return tokenStr ? JSON.parse(tokenStr) : null;
    }

    public static removeToken() {
        localStorage.removeItem(this.TOKEN_KEY);
    }



    public static setUserInfo(UserInfo: SignInType) {
        //todo userInfo 설정
        localStorage.setItem("userInfo", JSON.stringify(UserInfo));
    }

    public static getUserInfo(): SignInType | null {
        //todo 토큰명 설정
        const storedUserInfo = localStorage.getItem("userInfo");
        if (!storedUserInfo) {
            return null;
        }
        try {
            return JSON.parse(storedUserInfo);
        } catch (e) {
            return null;
        }
    }

    public static removeUserInfo() {
        localStorage.removeItem("토큰");
    }

    public static async login(loginRes: LoginRes) {
        return new Promise((resolve) => {
            // this.setToken(loginRes.token.token);
            this.setUserInfo({
                ...loginRes.member,
            });
            resolve(true);
        });
    }
}