import {SignInType} from "@/src/types/page/sign-up/sign-up";


export interface  UserInfo {
    id?: string;
    nickname: string;
    email?: string;
    profileImage: number;
    gender?: '남' | '여' | '선택안함' | '';
    age?: string;
}

export interface LoginRes {
    member: SignInType;
}

export interface JoinParams {
    email?: string;
    nickname: string;
    profileImage: number | string;
    gender?: string;
    ageRange?: string;
}

export interface JoinRes {
    member: SignInType;
    token: {
        accessToken: string;
        refreshToken: string;
    };
}
