import {DragStatus} from "@/src/app/hooks/useCardSwipe";
import {BindType} from "@/src/app/types/hook/cardSwipte";
import {FoodItem} from "@/src/app/types/models/food";


export interface BasicCardProps {
    data: FoodItem;
    className?: string;
}

export interface CardProps extends BasicCardProps{
    bind: BindType | undefined;
    dragStatus: DragStatus;
}

export interface ResultCardProps extends BasicCardProps {
    handleDeleteCard: (result: FoodItem, type: 'add' | 'delete') => void;
    deleted: boolean;
}
