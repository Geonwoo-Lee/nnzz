import {DragStatus} from "@/src/app/hooks/useCardSwipe";
import {BindType} from "@/src/app/types/hook/cardSwipte";


export interface CardProps {
    image: string;
    category: string;
    name: string;
    priceRange: string;
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
