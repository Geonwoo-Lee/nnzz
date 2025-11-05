'use client'

import {useEffect, useState} from "react";
import DateUtils from "@/src/func/common/date.utils";
import {DayInfo, MealTimingType} from "@/src/types/page/home/homeSelect";
import {useRouter} from "next/navigation";
import HomeMealSettingComponent from "@/src/component/client/page/home/features/HomeMealSettingComponent";
import AuthUtils from "@/src/func/common/auth.utils";
import ShortsListView from "@/src/app/(router)/shorts/list/ShortsListView";

const ShortsHomeTest = () => {
  const router = useRouter()
  const [selectedLocation, setSelectedLocation] = useState('현재 위치');
  const [mealTime] = useState<DayInfo[]>(DateUtils.getWeekDates());
  const [selectedMealTime] = useState<DayInfo>(mealTime[0]);
  const [mealTiming, setMealTiming] = useState<MealTimingType>();
  const [wayToFind] = useState('');
  const location = localStorage.getItem('pinedLocation');
  const userName = AuthUtils.getUserInfo()?.nickname

  const moveToMap = () => {
    router.push('/location')
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
        setSelectedLocation(locationData.address);
      } else {
        setSelectedLocation(locationData.name);
      }
    }
  }, [location]);

  return (
    <div className='flex flex-col gap-10 h-full'>
      <div className='flex flex-col gap-4 px-4'>
        <div className='font-medium text-heading4'>
          {userName}님,
        </div>
        <div className='flex flex-row gap-1 items-center font-medium text-title1 whitespace-nowrap'>
          <HomeMealSettingComponent.HomeSelect selected={selectedLocation !== '현재 위치'} callBack={moveToMap} data={selectedLocation}/> 주변에서
        </div>
        <div className='font-medium text-title1 flex flex-row gap-1 items-center'>
          <HomeMealSettingComponent.HomeSelect
            selected={!!selectedMealTime}
            data={`${selectedMealTime.day} ${mealTiming}`}
            callBack={() => {}}
          />에
        </div>
        <div className='font-medium text-title1 flex flex-row gap-1 items-center'>
          먹을 음식 <HomeMealSettingComponent.HomeSelect selected={wayToFind !== ''} data={wayToFind === '' ? '어떻게' : wayToFind} callBack={() => {
        }}/>
          고를까요?
        </div>
      </div>
      <ShortsListView />
    </div>
  )

}


export default ShortsHomeTest