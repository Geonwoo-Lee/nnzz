'use client'

import WayToChoose from "@/src/app/component/client/page/swIpe/features/noChoice/component/WayToChoose";

const  NoChoice = ({type, day} : {type: string, day: string;}) => {
    return (
        <div className='h-screen flex flex-col gap-6 justify-center items-center w-full'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className='text-title-1 font-medium text-text-1'>
                    아직 고른 메뉴가 없어요 🥲
                </div>
                <div className='text-text-2 text-body2 font-regular'>
                    마음에 드는 메뉴가 없으신가요?
                </div>
            </div>
            <div className='px-4 pt-4 pb-12 flex flex-row gap-4 w-full'>
                <WayToChoose mealTiming={type} day={day} type='reStart'/>
                <WayToChoose type='random' day={day} mealTiming={type}/>
            </div>
        </div>
    )
}

export default NoChoice