'use client'

import { useRouter} from "next/navigation";
import Setting from "../../../../../../public/svg/header/Settings.svg";
import {HeaderTypes} from "@/src/app/types/common/header";
import Image from "next/image";

import Menu from "../../../../../../public/svg/header/menu.svg";
import Close from "../../../../../../public/svg/header/Close.svg";
import Map from "../../../../../../public/svg/header/Map.svg";
import Square from "../../../../../../public/svg/header/Square.svg";
import Link from "next/link";
import AuthUtils from "@/src/app/func/common/auth.utils";

const Right = ({ map, menu, square, close, setting, profileImage}: {
    type: HeaderTypes,
    setting?: boolean,
    map?: boolean;
    square?: boolean;
    close?: boolean;
    menu?: boolean;
    profileImage?: boolean;
}) => {
    const router = useRouter()
    const rightIconRenderer = () => {
        if (map) {
            return <Map onClick={() => {

            }}/>
        }

        if (menu) {
            return <Menu onClick={() => {

            }}/>
        }

        if (square) {
            return <Square onClick={() => {

            }}/>
        }

        if (close) {
            return <Close onClick={() => {
                router.back();
            }}/>
        }
        if (setting) {
            return <Setting onClick={() => {
            }}/>
        }

        if(profileImage) {
            const userInfo = AuthUtils.getUserInfo()
            if(userInfo?.profileImage) {
                return <Link href='/setting' >
                    <div className='relative w-8 h-8 rounded-full bg-slate-200 border border-1 border-line-1' >
                        <Image src={userInfo.profileImage.src} layout='fill' alt='profile' className='w-8 h-8 rounded-full bg-slate-200'/>
                    </div>
                </Link>
            }else {
            return <Link href='/setting' >
                <div className='w-8 h-8 rounded-full bg-slate-200'>
                </div>
            </Link>
            }
        }

        return
    }

    return (
        <>
            {rightIconRenderer()}
        </>
    )
}

export default Right