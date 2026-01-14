'use client'
import ProfileImageServer from "@/src/component/server/common/ProfileImage/ProfileImage";
import AuthUtils from "@/src/func/common/auth.utils";
import SettingList from "@/src/component/server/page/setting/settingList/SettingList";
import { useEffect, useMemo, useState } from "react";
import {FoodProfileType, SignInType} from "@/src/types/page/sign-up/sign-up";
import Link from "next/link";
import LogoutApi from "@/src/app/api/client/logout/logout";
import { useLoginBottomSheet } from "@/src/core/LoginBottomSheetProvider";
import InstagramIcon from "@/public/svg/items/home/instagramIcon.svg";
import YoutubeIcon from "@/public/svg/items/home/youtubeIcon.svg";

const SettingPage = () => {
  const { showLoginSheet } = useLoginBottomSheet();
    const userInfo = useMemo<SignInType>(() => {
        return AuthUtils.getUserInfo() || {} as SignInType;
    }, []);

    const token = AuthUtils.getToken();
    const [profileInfo, setProfileInfo] = useState<FoodProfileType | null>(null);

    const loginRequest = () => {
      showLoginSheet()
    }
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
                AuthUtils.removeLocation();
                window.location.href = '/';
            })
        }
    }

    const isLogin = AuthUtils.isLoggedIn()

    return (
        <div className='h-basic-body-with-header'>
            <div className='px-5'>
                <div className='pt-6 w-full flex justify-center items-center flex-col gap-6'>
                    <div className='flex flex-col gap-3'>
                      { isLogin ?
                        <ProfileImageServer
                          profileImage={getProfileImage()}
                          size={112}
                        /> : <div className="text-center text-title2 font-bold text-text-1 flex flex-col gap-6 justify-center ">
                          로그인 해주세요
                          <div onClick={loginRequest} className="border rounded-[8px] w-[118px] h-[38px] flex items-center justify-center text-caption1  border-line-3 text-text-3 font-medium">
                            로그인 · 회원가입
                          </div>
                        </div>
                      }
                    </div>
                  {
                    isLogin &&                     <Link
                      href={'/edit'}
                      className='w-[126px] cursor-pointer h-[38px] border border-line-3 flex items-center justify-center text-text-3 text-caption1 font-medium rounded-[8px]'
                    >
                      프로필 관리
                    </Link>
                  }
                </div>
                <div className='pt-6'>
                    <SettingList isLogin={isLogin}/>
                </div>
                <div className='py-6 border-t border-line-2'>
                    <div className='flex items-center gap-4'>
                        <a
                            href="https://www.instagram.com/nnzz.today?igsh=MTZ4dW93ZzN6NHR0aA=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className='flex items-center justify-center'
                        >
                            <InstagramIcon />
                        </a>
                        <a
                            href="https://www.youtube.com/channel/UCNV6TRZixTAZeXX9O6CzMzA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='flex items-center justify-center'
                        >
                            <YoutubeIcon />
                        </a>
                    </div>
                </div>
                <div onClick={logout} className='h-[56px] flex items-center text-body1 font-medium text-primary-6 w-full cursor-pointer'>
                    로그아웃
                </div>
            </div>
        </div>
    );
};

export default SettingPage;