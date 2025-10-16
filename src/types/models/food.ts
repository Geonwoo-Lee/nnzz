
export interface FoodItemFromServer {
    category: string;
    distance: number | string;
    represent: string;
    categoryId: string | number
}

export interface FoodItemFromClient {
    categoryId: number;
    imageUrl: string;
    bgType?: string
}

export interface FoodItem extends FoodItemFromServer {
    imageUrl: string;
    bgType?: string
}