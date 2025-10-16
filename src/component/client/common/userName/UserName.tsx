'use client'
import {useEffect, useState} from "react";
import AuthUtils from "@/src/func/common/auth.utils";


const UserName = (props: {style: string}) => {
    const {style} =props
    const [nickname, setNickname] = useState<string>("냠냠");

    useEffect(() => {
        const userInfo = AuthUtils.getUserInfo();
        if (userInfo?.nickname) {
            setNickname(userInfo.nickname);
        }
    }, []);
    return(
        <div className={style}>
            {nickname}
        </div>
    )
}

export default UserName