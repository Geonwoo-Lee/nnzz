'use client'
import ProfileImageServer from "@/src/app/component/server/common/ProfileImage/ProfileImage";
import AuthUtils from "@/src/app/func/common/auth.utils";
import SettingList from "@/src/app/component/server/page/setting/settingList/SettingList";
import { useEffect, useMemo, useState } from "react";
import {FoodProfileType, SignInType} from "@/src/app/types/page/sign-up/sign-up";
import Link from "next/link";
import LogoutApi from "@/src/app/api/client/logout/logout";

const SettingPage = () => {
    const userInfo = useMemo<SignInType>(() => {
        return AuthUtils.getUserInfo() || {} as SignInType;
    }, []);

    const token = AuthUtils.getToken();
    const [profileInfo, setProfileInfo] = useState<FoodProfileType | null>(null);

    useEffect(() => {
        if (userInfo?.profileImage) {
            setProfileInfo(userInfo.profileImage);
        }
    }, [userInfo.profileImage]);

    const getProfileImage = () => {
        if (userInfo?.profileImage && profileInfo?.src) {
            return profileInfo.src;
        }
        return '/images/food/food-profile/Default.png';
    };

    const logout = () => {
        if (userInfo && token) {
            LogoutApi.logout(token.accessToken).then(() => {
                AuthUtils.removeToken();
                AuthUtils.removeUserInfo();
                window.location.href = '/';
            })
        }
    }

    return (
        <div className='h-basic-body-with-header'>
            <div className='px-5'>
                <div className='pt-6 w-full flex justify-center items-center flex-col gap-6'>
                    <div className='flex flex-col gap-3'>
                        <ProfileImageServer
                            profileImage={getProfileImage()}
                            size={112}
                        />
                    </div>
                    <Link
                        href={'/edit'}
                        className='w-[126px] cursor-pointer h-[38px] border border-line-3 flex items-center justify-center text-text-3 text-caption1 font-medium rounded-[8px]'
                    >
                        프로필 관리
                    </Link>
                </div>
                <div className='pt-6'>
                    <SettingList/>
                </div>
                <div onClick={logout} className='h-[56px] flex items-center text-body1 font-medium text-primary-6 w-full cursor-pointer'>
                    로그아웃
                </div>
            </div>
        </div>
    );
};

export default SettingPage;