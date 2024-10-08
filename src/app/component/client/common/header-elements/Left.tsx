'use client'

import HistoryBack from "../../../../../../public/svg/header/LeftArrow.svg";
import { useRouter} from "next/navigation";
import {HeaderTypes} from "@/src/app/types/common/header";

const Left = ({type}: {
    type: HeaderTypes,
    setting?: boolean
}) => {
    const router = useRouter()
    const historyBack = () => {
            router.back();
    }

    const leftIRenderer = () => {
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