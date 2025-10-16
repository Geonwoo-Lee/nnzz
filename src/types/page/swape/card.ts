import {DragStatus} from "@/src/hooks/useCardSwipe";
import {BindType} from "@/src/types/hook/cardSwipte";
import {FoodItem} from "@/src/types/models/food";
import {DefaultCardProps} from "@/src/types/common/card";


export interface BasicCardProps extends DefaultCardProps{
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
