'use client'
import ProfileImageComponent
    from "@/src/app/component/client/page/sign-up/features/ProfileComponet/ProfileImageComponent";
import {useEffect, useState} from "react";
import {FoodProfileType} from "@/src/app/types/page/sign-up/sign-up";
import FoodProfileDummy from "@/src/app/dummy/sign-up";
import {ChangeProfileImageProps} from "@/src/app/types/common/profileImage";


const ChangeProfile = (props: ChangeProfileImageProps) => {
    const {userInfoProfile} = props
    const [profileImage, setProfileImage] = useState<FoodProfileType>(FoodProfileDummy[0])
    const [open, setOpen] = useState<boolean>(false)

    const close = () => {
        setOpen(false)
    }
    const setImage = (profileImage: FoodProfileType) => {
        setProfileImage(profileImage)
        setOpen(false)
    }

    const setLoginProfileImage = (profileImage: FoodProfileType) => {
        console.log(profileImage)
    }

    useEffect(() => {
        if(userInfoProfile) setProfileImage(userInfoProfile)
    }, [userInfoProfile]);

    return <div className='flex flex-col gap-6'>
        <ProfileImageComponent isSetting setLoginProfileImage={setLoginProfileImage} userInfoImage={profileImage} />
    </div>
}

export default ChangeProfile;