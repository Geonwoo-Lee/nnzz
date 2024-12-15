import {FoodItem} from "@/src/app/types/models/food";


export interface FoodChoiceCard {
    id: number;
    imageUrl: string;
    name: string;
}

export interface FastChoiceCardProps {
    selected: boolean;
    data: FoodItem;
    setSelected: (card: FoodItem) => void;
}

export interface FastChoiceButtonProps {
    step: number;
    onClick: () => void;
}

export interface FastChoicePageProps  {
    setStep: (step: 'result' | 'choice') => void;
    isLoading: boolean;
    menu:string;
    cardData: FoodItem[];
    handleSelect: (card: FoodItem) => void;
    selectedList: FoodItem[]
}