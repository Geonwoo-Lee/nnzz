import {FoodItem} from "@/src/types/models/food";


export interface FoodChoiceCard {
    id: number;
    imageUrl: string;
    name: string;
}

export interface FastChoiceCardProps {
    selected: boolean;
    data: FoodItem;
    setSelected: (card: FoodItem) => void;
    index: number
}

export interface FastChoiceButtonProps {
    step: number;
    onClick: () => void;
    type: string
}

export interface FastChoicePageProps  {
    setStep: (step: 'result' | 'choice') => void;
    isLoading: boolean;
    menu:string;
    cardData: FoodItem[];
    handleSelect: (card: FoodItem) => void;
    selectedList: FoodItem[]
    type: string;
}