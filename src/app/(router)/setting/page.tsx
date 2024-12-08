'use client'
import ProfileImageServer from "@/src/app/component/server/common/ProfileImage/ProfileImage";
import AuthUtils from "@/src/app/func/common/auth.utils";
import SettingList from "@/src/app/component/server/page/setting/settingList/SettingList";
import { useEffect, useState } from "react";
import {FoodProfileType, SignInType} from "@/src/app/types/page/sign-up/sign-up";
import Link from "next/link";

const SettingPage = () => {
    const userInfo: SignInType = AuthUtils.getUserInfo() || {} as SignInType;
    const [profileInfo, setProfileInfo] = useState<FoodProfileType | null>(null);

    useEffect(() => {
        if (userInfo?.profileImage) {
            const profile = userInfo.profileImage;
            setProfileInfo(profile || null);
        }
    }, [userInfo.profileImage]);

    const getProfileImage = () => {
        if (userInfo?.profileImage && profileInfo?.src) {
            return profileInfo.src;
        }
        return '/images/food/food-profile/Default.png';
    };

    return (
        <div className='h-basic-body-with-header'>
            <div className='px-5'>
                <div className='pt-6 w-full flex justify-center items-center flex-col gap-6'>
                    <div className='flex flex-col gap-3'>
                        <ProfileImageServer
                            profileImage={getProfileImage()}
                            size={112}
                        />
                        <div className='text-center text-title2 font-bold'>
                            {userInfo.nickname}
                        </div>
                    </div>
                    <Link href={'/edit'}  className='w-[126px] cursor-pointer h-[38px] border border-line-3 flex items-center justify-center text-text-3 text-caption1 font-medium rounded-[8px]'>
                        프로필 관리
                    </Link>
                </div>
                <div className='pt-6'>
                    <SettingList/>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;