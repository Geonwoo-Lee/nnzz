export type DayInfo = {
    date: string;
    day: string;
};

export interface HomeSelectProps {
    data: string,
    callBack: () => void
}

export type MealTimingType = '점심' | '저녁' | ''