import {FoodProfileType} from "@/src/app/types/page/sign-up/sign-up";


export interface  UserInfo {
    id?: string;
    nickname: string;
    email?: string;
    profileImage: FoodProfileType | null;
    gender?: string;
    age?: string;
}

export interface LoginRes {
    member: UserInfo;
    // token: {
    //     token: string;
    // };
}

export interface JoinParams {
    email?: string;
    nickname: string;
    profileImage: FoodProfileType | null;
    gender?: string;
    ageRange?: string;
}
