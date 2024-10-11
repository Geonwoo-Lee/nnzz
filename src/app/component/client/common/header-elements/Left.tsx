'use client'

import HistoryBack from "../../../../../../public/svg/header/LeftArrow.svg";
import NnzzHeaderLogo from '../../../../../../public/svg/header/NnzzHeaderLogo.svg'
import { useRouter} from "next/navigation";
import {HeaderTypes} from "@/src/app/types/common/header";

const Left = ({type, logo}: {
    type: HeaderTypes,
    setting?: boolean,
    logo?: boolean
}) => {
    const router = useRouter()
    const historyBack = () => {
            router.back();
    }

    const leftIRenderer = () => {
        if(logo) {
            return <NnzzHeaderLogo/>
        }
        if (type === "history") {
            return <HistoryBack onClick={historyBack}/>
        }
        if (type === "basic") {
            return <></>
        }
    }
    return (
        <>
            {leftIRenderer()}
        </>
    )
}
export default Left