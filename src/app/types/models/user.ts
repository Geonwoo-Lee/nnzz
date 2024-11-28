

export interface  UserInfo {
    id?: string;
    nickname: string;
    email?: string;
    profileImage: number;
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
    profileImage: number;
    gender?: string;
    ageRange?: string;
}
