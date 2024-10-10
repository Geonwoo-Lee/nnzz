'use client'

import {useEffect, useState} from "react";
import DateUtils from "@/src/app/func/common/date.utils";
import {DayInfo, MealTimingType} from "@/src/app/types/page/home/homeSelect";
import HomeSelect from "@/src/app/component/client/page/home/homeMealSetting/component/HomeSelect";
import {useRouter} from "next/navigation";
import BottomSheet from "@/src/app/component/client/common/bottomSheet/BottomSheet";
import DateCircle from "@/src/app/component/client/page/home/dateCircle/DateCircle";
import MealTimingSquare from "@/src/app/component/client/page/home/mealTimingSquare/MealTimingSquare";

const HomeMealSettingClient = () => {
    const router = useRouter()
    const [selectedLocation] = useState('어디');
    const [mealTime] = useState<DayInfo[]>(DateUtils.getWeekDates());
    const [selectedMealTime, setSelectedMealTime] = useState<DayInfo>(mealTime[0]);
    const [mealTiming, setMealTiming] = useState<MealTimingType>();
    const [wayToFind] = useState('어떻게 고를까요?');
    const [mealTimingModal, setMealTimingModal] = useState(false);

    const moveToMap = () => {
        router.push('/map')
    }

    const selectDate = (data: DayInfo) => {
        setSelectedMealTime(data);
    }

    useEffect(() => {
        if (!selectedMealTime) return;

        const now = new Date();
        const currentHour = now.getHours();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const selectedDate = DateUtils.parseDateString(selectedMealTime.date);

        if (selectedDate && selectedDate.getTime() === today.getTime()) {
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
                <HomeSelect selected={false} callBack={moveToMap} data={selectedLocation}/> 에서
            </div>
            <div className='font-medium text-xxl flex flex-row gap-1 items-center'>
                <HomeSelect selected={!!selectedMealTime} data={`${selectedMealTime.day} ${mealTiming}`} callBack={() => {
                    setMealTimingModal(true)
                }}/>에
            </div>
            <div className='font-medium text-xxl flex flex-row gap-1 items-center'>
               먹을 음식 <HomeSelect selected={wayToFind !== '어떻게 고를까요?'} data={wayToFind} callBack={() => {
                }}/>
            </div>
            <BottomSheet open={mealTimingModal} backdrop={false} close={() => {
                setMealTimingModal(false)
            }}>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col gap-3'>
                        <div className='text-lg font-bold'>
                            언제 시작하시나요?
                        </div>
                        <div className='text-base font-regular'>
                            식사하는 시간대를 선택해주세요.
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <div className="flex flex-nowrap gap-2 w-max">
                            {mealTime.map((el, index) => (
                                <div key={index} className="flex-shrink-0">
                                    <DateCircle
                                        data={el}
                                        callBack={selectDate}
                                        selected={el === selectedMealTime}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-row gap-4 w-full'>
                        <MealTimingSquare type={'lunch'} callBack={() => {
                            setMealTiming('점심')
                        }} active={mealTiming === '점심'}/>
                        <MealTimingSquare type={'dinner'} callBack={() => {
                            setMealTiming('저녁')
                        }} active={mealTiming === '저녁'}/>
                    </div>
                </div>
            </BottomSheet>
        </div>

    )

}


export default HomeMealSettingClient