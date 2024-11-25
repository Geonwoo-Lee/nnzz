'use client'
import AuthUtils from "@/src/app/func/common/auth.utils";


const UserName = () => {
    const name = AuthUtils.getUserInfo()?.nickname



    return (
        <div>
            {`${name}님`}
        </div>
    )
}

export default UserName