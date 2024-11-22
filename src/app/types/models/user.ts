import {FoodProfileType} from "@/src/app/types/page/sign-up/sign-up";


export interface  UserInfo {
    id?: string;
    nickname: string;
    email?: string;
    profileImage: FoodProfileType;
    gender?: string;
    age?: string;
}

export interface LoginRes {
    member: UserInfo;
    // token: {
    //     token: string;
    // };
}