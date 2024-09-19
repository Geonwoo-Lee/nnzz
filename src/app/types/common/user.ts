

export interface  UserInfo {
    id: string
    nickname: string
    email: string
}

export interface LoginRes {
    member: UserInfo;
    token: {
        token: string;
    };
}