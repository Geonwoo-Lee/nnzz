import {FoodItem} from "@/src/app/types/models/food";
import {Dispatch, SetStateAction} from "react";

export interface DeckProps {
    cards: FoodItem[];
    setStep: Dispatch<SetStateAction<"0" | "1" | "2" | "3" >>;
    setLikeCards: (result: FoodItem[]) => void;
    isLoading?: boolean
    likedCards: FoodItem[]
}

export interface CompletePageProps {
    likeCards: FoodItem[];
    setDeletedCards: (result: FoodItem, type: 'add' | 'delete') => void;
    deletedList: FoodItem[]
    setStep: () => void;
}