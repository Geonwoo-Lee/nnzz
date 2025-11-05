'use client'

import HistoryBack from "../../../../../public/svg/header/LeftArrow.svg";
import NnzzHeaderLogo from '../../../../../public/svg/header/NnzzHeaderLogo.svg'
import { useRouter} from "next/navigation";
import {HeaderTypes} from "@/src/types/common/header";

const Left = ({type, logo, back}: {
    type: HeaderTypes,
    setting?: boolean,
    logo?: boolean
  back?: boolean,
}) => {
    const router = useRouter()
    const historyBack = () => {
            router.back();
    }

    const leftIRenderer = () => {
        if(logo) {
            return <NnzzHeaderLogo className='cursor-pointer' onClick={() => router.push('/home')}/>
        }
        if(back) {
          return <div onClick={historyBack} className='font-medium font-pretendard text-[rgba(126,126,126,1)] cursor-pointer'>
            ← Back
          </div>
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