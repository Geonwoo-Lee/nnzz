import {DayInfo, MealTimingType} from "@/src/app/types/page/home/homeSelect";


export interface HomeModalProps {
    modalOpen: boolean;
    closeModal: () => void;
}

export interface FoodieSettingModalProps extends HomeModalProps {
    mealTime: DayInfo[];
    selectDate: (data: DayInfo) => void;
    mealTiming?: string;
    setMealTiming: (data: MealTimingType) => void;
    selectedMealTime: DayInfo;
}

export interface FoodieWayModalProps extends HomeModalProps {
    onChangeWay: (way: '빠르게' | '꼼꼼히') => void
}