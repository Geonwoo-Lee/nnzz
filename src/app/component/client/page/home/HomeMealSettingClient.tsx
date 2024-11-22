'use client'

import {useEffect, useState} from "react";
import DateUtils from "@/src/app/func/common/date.utils";
import {DayInfo, MealTimingType} from "@/src/app/types/page/home/homeSelect";
import {useRouter} from "next/navigation";
import HomeMealSettingComponent from "@/src/app/component/client/page/home/features/HomeMealSettingComponent";

const HomeMealSettingClient = () => {
    const router = useRouter()
    const [selectedLocation, setSelectedLocation] = useState('현재 위치');
    const [mealTime] = useState<DayInfo[]>(DateUtils.getWeekDates());
    const [selectedMealTime, setSelectedMealTime] = useState<DayInfo>(mealTime[0]);
    const [mealTiming, setMealTiming] = useState<MealTimingType>();
    const [wayToFind, setWayToFind] = useState('');
    const [wayBottomSheet, setWayBottomSheet] = useState(false);
    const [mealTimingBottomSheet, setMealTimingBottomSheet] = useState(false);
    const location = localStorage.getItem('pinedLocation');

    const moveToMap = () => {
        router.push('/location')
    }

    const selectDate = (data: DayInfo) => {
        setSelectedMealTime(data);
    }

    const closeScheduleBottomSheet = () => {
        setMealTimingBottomSheet(false)

        if(wayToFind === '') {
            setWayBottomSheet(true)
        }else {
            return
        }
    }

    const mealTimingController = (timing: MealTimingType) => {
        setMealTiming(timing)
    }


    const onChangeWay = (way: '빠르게' | '꼼꼼히') => {
        setWayToFind(way)
        setWayBottomSheet(false)
        if(selectedLocation && selectedMealTime) {
            if(way === '꼼꼼히') {
                router.push('/swipe')
            }else {
                const mealTimingToEng = () => {
                    if(mealTiming === '저녁'){
                        return 'dinner'
                    }else {
                        return 'lunch'
                    }
                 }
                router.push(`/fast-choice/${mealTimingToEng()}`)
            }
        }
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

    useEffect(() => {
        if(location) {
            const locationData = JSON.parse(location);
            if(!locationData.name) {
                setSelectedLocation(locationData.address)
            }else {
                setSelectedLocation(locationData.name)
            }

        }
    }, [location]);

    return (
        <div className='flex flex-col gap-4 px-4'>
            <div className='font-medium text-heading4'>
                김냠냠님,
            </div>
            <div className='flex flex-row gap-1 items-center font-medium text-title1 whitespace-nowrap'>
                <HomeMealSettingComponent.HomeSelect selected={false} callBack={moveToMap} data={selectedLocation}/> 주변에서
            </div>
            <div className='font-medium text-title1 flex flex-row gap-1 items-center'>
                <HomeMealSettingComponent.HomeSelect selected={!!selectedMealTime} data={`${selectedMealTime.day} ${mealTiming}`} callBack={() => {
                    setMealTimingBottomSheet(true)
                }}/>에
            </div>
            <div className='font-medium text-title1 flex flex-row gap-1 items-center'>
               먹을 음식 <HomeMealSettingComponent.HomeSelect selected={wayToFind !== ''} data={wayToFind === '' ? '어떻게' : wayToFind} callBack={() => {
                   setWayBottomSheet(true)
                }}/>
                고를까요?
            </div>
           <HomeMealSettingComponent.FoodieScheduleBottomSheet
                closeModal={closeScheduleBottomSheet}
                modalOpen={mealTimingBottomSheet}
                mealTiming={mealTiming}
                mealTime={mealTime}
                selectDate={selectDate}
                selectedMealTime={selectedMealTime}
                setMealTiming={mealTimingController}
           />
            <HomeMealSettingComponent.FoodieWayBottomSheet
                closeModal={() => setWayBottomSheet(false)}
                modalOpen={wayBottomSheet}
                onChangeWay={onChangeWay}
            />
        </div>

    )

}


export default HomeMealSettingClient