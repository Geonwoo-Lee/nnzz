export type DayInfo = {
    date: string;
    day: string;
};

export interface HomeSelectProps {
    data: string,
    callBack: () => void
    selected: boolean
}

export type MealTimingType = '점심' | '저녁' | ''