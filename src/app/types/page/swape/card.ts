import {DragStatus} from "@/src/app/hooks/useCardSwipe";
import {BindType} from "@/src/app/types/hook/cardSwipte";
import {FoodItem} from "@/src/app/types/models/food";


export interface CardProps {
    data: FoodItem
    bind: BindType | undefined;
    dragStatus: DragStatus;
    className?: string;
}

export interface ResultCardProps {
    image: string;
    category: string;
    name: string;
    priceRange: string;
    index: number;
}
