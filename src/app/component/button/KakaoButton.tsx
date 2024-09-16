'use client'
import { useEffect } from 'react'
import KakaoLogo from '../../../../public/svg/logo/KakaoLogo.svg'
import {useRouter} from "next/navigation";

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
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.authorize({
                redirectUri: 'http://localhost:3000/swap'
            });
        } else {
            console.error('Kakao SDK not loaded');
        }
    };

    return (
        <button
            onClick={loginWithKakao}
            className="flex items-center justify-center w-full py-3 px-4 bg-[#FEE500] rounded-xl text-black font-medium text-sm hover:bg-[#FEE500]/90 transition-colors"
        >
            <KakaoLogo width={20} height={20} className="mr-2" />
            카카오로 계속하기
        </button>
    )
}