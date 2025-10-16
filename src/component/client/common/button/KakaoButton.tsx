'use client'
import {useEffect} from 'react'
import KakaoLogo from '../../../../../public/svg/logo/KakaoLogo.svg'
import {useRouter} from "next/navigation";
import SignInApi from "@/src/api/client/sign-in/sign-in";
import FoodProfileDummy from "@/src/dummy/sign-up";
import AuthUtils from "@/src/func/common/auth.utils";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Kakao) {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY as string);
            }
        }
    }, [router]);

    const loginWithKakao = () => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY as string);
        }
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.login({
                success: function() {
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                        success: function(response: any) {
                            const kakaoAccount = response.kakao_account;
                            AuthUtils.setUserInfo({
                                email: kakaoAccount.email,
                                profileImage: {
                                    id: 0,
                                    name: 'default',
                                    src: ''
                                },
                                nickname: '',
                                gender: '',
                                age: ''
                            })
                            SignInApi.login(kakaoAccount.email).then((res) => {
                                const profile = FoodProfileDummy.find(el => el.id === Number(res.user.profileImage))
                                AuthUtils.removeUserInfo();
                                AuthUtils.removeToken()
                                AuthUtils.setUserInfo({
                                    ...res.user,
                                    email: kakaoAccount.email,
                                    profileImage: profile!,
                                    nickname: res.user.nickname
                                })
                                AuthUtils.setToken(res.token)
                                router.push('/home');
                            }).catch(() => {
                                router.push('/sign-up');
                            })
                        },
                        fail: function() {
                            router.push('/sign-up');
                        },
                    });
                },
                fail: function(err: any) {
                    console.error(err);
                },
                scope: 'account_email'
            } as any);
        } else {
            console.error('Kakao SDK not loaded');
        }
    };
    const handleLogin = () => {
        loginWithKakao();
    };

    // const handleKakaoCallback = async (code:string) => {
    //     try {
    //         const tokenResponse = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&redirect_uri='http://localhost:3000/swap'&code=${code}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //         const tokenData = await tokenResponse.json()
    //
    //         if (!tokenResponse.ok) {
    //             throw new Error(tokenData.message || 'Failed to get access token')
    //         }
    //
    //         const userInfoResponse = await fetch('/api/kakao/user-info', {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${tokenData.access_token}`,
    //             },
    //         })
    //         const userData = await userInfoResponse.json()
    //
    //         if (!userInfoResponse.ok) {
    //             throw new Error(userData.message || 'Failed to get user info')
    //         }
    //
    //         setUserInfo(userData)
    //     } catch (err) {
    //         console.error('Error in Kakao login process:', err)
    //     }
    // }

    // useEffect(() => {
    //
    //     if (code) {
    //         handleKakaoCallback(code)
    //     }
    // }, [code]);

    return (
        <button
            onClick={handleLogin}
            className="flex items-center justify-center w-full py-3 px-4 bg-[#FEE500] rounded-xl text-black font-medium text-sm hover:bg-[#FEE500]/90 transition-colors"
        >
            <KakaoLogo width={20} height={20} className="mr-2" />
            카카오로 계속하기
        </button>
    )
}