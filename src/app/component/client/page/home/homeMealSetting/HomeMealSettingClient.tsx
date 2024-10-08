'use client'

import {useEffect, useState} from "react";
import DateUtils from "@/src/app/func/common/date.utils";
import {DayInfo, MealTimingType} from "@/src/app/types/component/home/homeSelect";
import HomeSelect from "@/src/app/component/client/page/home/homeMealSetting/component/HomeSelect";
import {useRouter} from "next/navigation";

const HomeMealSettingClient = () => {
    const router = useRouter()
    const [selectedLocation] = useState('어디');
    const [mealTime] = useState<DayInfo[]>(DateUtils.getWeekDates());
    const [selectedMealTime] = useState<DayInfo>(mealTime[0]);
    const [mealTiming, setMealTiming] = useState<MealTimingType>();
    const [wayToFind] = useState('어떻게 고를까요?');

    const moveToMap = () => {
        router.push('/map')
    }

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();
        const todayDateString = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;

        if (selectedMealTime.date === todayDateString) {
            setMealTiming(currentHour < 15 ? '점심' : '저녁');
        } else {
            setMealTiming('');
        }
    }, [selectedMealTime]);

    return (
        <div className='flex flex-col gap-4 px-4'>
            <div className='font-medium text-xxl'>
                김냠냠님,
            </div>
            <div className='flex flex-row gap-1 items-center font-medium text-xxl'>
                <HomeSelect callBack={moveToMap} data={selectedLocation}/> 에서
            </div>
            <div className='font-medium text-xxl flex flex-row gap-1 items-center'>
                <HomeSelect data={`${selectedMealTime.day} ${mealTiming}`} callBack={() => {
                }}/>에
            </div>
            <div className='font-medium text-xxl flex flex-row gap-1 items-center'>
               먹을 음식 <HomeSelect data={wayToFind} callBack={() => {
                }}/>
            </div>
        </div>
    )

}


export default HomeMealSettingClient