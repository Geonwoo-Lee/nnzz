import {SignInType} from "@/src/app/types/page/sign-up/sign-up";


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
    // token: {
    //     token: string;
    // };
}

export interface JoinParams {
    email?: string;
    nickname: string;
    profileImage: number | string;
    gender?: string;
    ageRange?: string;
}
