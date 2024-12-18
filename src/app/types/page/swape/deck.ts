import {FoodItem} from "@/src/app/types/models/food";
import {Dispatch, SetStateAction} from "react";

export interface DeckProps {
    cards: FoodItem[];
    setStep: Dispatch<SetStateAction<"0" | "1" | "2" | "3" >>;
    setLikeCards: (result: FoodItem[]) => void;
    isLoading?: boolean
    likedCards: FoodItem[]
    day: string;
    type: string;
}
export interface CompleteBaseProps {
    likeCards: FoodItem[];
    day: string;
    type: string;
    deletedList: FoodItem[]
}

export interface CompletePageProps extends CompleteBaseProps{
    setDeletedCards: (result: FoodItem, type: 'add' | 'delete') => void;
    setStep: () => void;
}

