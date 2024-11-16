

export interface FoodChoiceCard {
    id: number;
    imageUrl: string;
    name: string;
}

export interface FastChoiceCardProps {
    selected: boolean;
    data: FoodChoiceCard;
    setSelected: (card: FoodChoiceCard) => void;
}

export interface FastChoiceButtonProps {
    step: number;
    onClick: () => void;
}