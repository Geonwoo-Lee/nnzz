'use client'

import { useRouter } from "next/navigation";
import Setting from "../../../../../../public/svg/header/Settings.svg";
import { HeaderTypes } from "@/src/app/types/common/header";
import Image from "next/image";
import Menu from "../../../../../../public/svg/header/Menu.svg";
import Close from "../../../../../../public/svg/header/Close.svg";
import Map from "../../../../../../public/svg/header/Map.svg";
import Square from "../../../../../../public/svg/header/Square.svg";
import Link from "next/link";
import AuthUtils from "@/src/app/func/common/auth.utils";
import { FoodProfileType } from "@/src/app/types/page/sign-up/sign-up";
import { useEffect, useState } from "react";

const Right = ({
                   map = false,
                   menu = false,
                   square = false,
                   close = false,
                   setting = false,
                   profileImage = false
               }: {
    type: HeaderTypes;
    setting?: boolean;
    map?: boolean;
    square?: boolean;
    close?: boolean;
    menu?: boolean;
    profileImage?: boolean;
}) => {
    const [profileInfo, setProfileInfo] = useState<FoodProfileType | null>(null);
    const router = useRouter();
    const userInfo = AuthUtils.getUserInfo();

    useEffect(() => {
        if (profileImage && userInfo?.profileImage) {
            setProfileInfo(userInfo.profileImage);
        }
    }, []);

    const renderProfileImage = () => {
        if (!profileImage) return null;

        if (userInfo?.profileImage && profileInfo?.src) {
            return (
                <Link href="/setting">
                    <div className="relative w-8 h-8 rounded-full bg-slate-200 border border-1 border-line-1">
                        <Image
                            src={profileInfo.src}
                            layout="fill"
                            alt="profile"
                            className="rounded-full"
                        />
                    </div>
                </Link>
            );
        }

        return (
            <Link href="/setting">
                <div className="w-8 h-8 rounded-full bg-slate-200" />
            </Link>
        );
    };

    const rightIconRenderer = () => {
        if (map) return <Map onClick={() => {}} />;
        if (menu) return <Menu onClick={() => {}} />;
        if (square) return <Square onClick={() => {}} />;
        if (close) return <Close onClick={() => router.push('/home')} />;
        if (setting) return <Setting onClick={() => {}} />;
        if (profileImage) return renderProfileImage();
        return null;
    };

    return rightIconRenderer();
};

export default Right;