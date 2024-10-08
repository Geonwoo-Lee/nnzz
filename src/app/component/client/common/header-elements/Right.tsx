'use client'

import { useRouter} from "next/navigation";
import Setting from "../../../../../../public/svg/header/Settings.svg";
import {HeaderTypes} from "@/src/app/types/common/header";

import Menu from "../../../../../../public/svg/header/menu.svg";
import Close from "../../../../../../public/svg/header/Close.svg";
import Map from "../../../../../../public/svg/header/Map.svg";
import Square from "../../../../../../public/svg/header/Square.svg";

const Right = ({ map, menu, square, close, setting}: {
    type: HeaderTypes,
    setting?: boolean,
    map?: boolean;
    square?: boolean;
    close?: boolean;
    menu?: boolean;
}) => {
    const router = useRouter()
    const rightIconRenderer = () => {
        console.log(setting, map, menu, square, close)
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

        return
    }

    return (
        <>
            {rightIconRenderer()}
        </>
    )
}

export default Right