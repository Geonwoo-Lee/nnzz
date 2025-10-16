

export type MealType = 'lunch' | 'dinner';

export interface MealTimingSquareProps {
    type: MealType;
    active: boolean;
    callBack: () => void;
}