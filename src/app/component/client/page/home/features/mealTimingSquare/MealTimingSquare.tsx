'use client'

import React, { useMemo } from 'react';
import {MealTimingSquareProps, MealType} from "@/src/app/types/page/home/mealTimingSquare";
import LunchIcon from '../../../../../../../../public/svg/items/home/Lunch.svg'
import DinnerIcon from '../../../../../../../../public/svg/items/home/Dinner.svg'
import DinnerDeActivateIcon from '../../../../../../../../public/svg/items/home/DinnerDeactivate.svg'
import LunchDeActivateIcon from '../../../../../../../../public/svg/items/home/LunchDeactivate.svg'

const mealConfig: Record<MealType, {
    activeIcon: React.FC,
    inactiveIcon: React.FC,
    bgColor: string,
    title: string,
    description: string
}> = {
    lunch: {
        activeIcon: LunchIcon,
        inactiveIcon: LunchDeActivateIcon,
        bgColor: 'bg-blue-300',
        title: '점심',
        description: '오후 3시 이전식사'
    },
    dinner: {
        activeIcon: DinnerIcon,
        inactiveIcon: DinnerDeActivateIcon,
        bgColor: 'bg-red-100',
        title: '저녁',
        description: '오후 3시 이후 식사'
    },
};

const MealTimingSquare: React.FC<MealTimingSquareProps> = ({ type, active, callBack }) => {
    const config = useMemo(() => mealConfig[type], [type]);

    const Icon = active ? config.activeIcon : config.inactiveIcon;

    return (
        <div
            className={`${active ? config.bgColor : 'bg-slate-200'} rounded-[16px] w-full`}
            onClick={callBack}
        >
            <div className='p-3.5 flex flex-col gap-[30px]'>
                <Icon />
                <div>
                    <div className={`${active ? 'text-common' : 'text-slate-400'} text-xl font-bold`}>
                        {config.title}
                    </div>
                    <div className={`${active ? 'text-common' : 'text-slate-400'} text-xs font-regular`}>
                        {config.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(MealTimingSquare);