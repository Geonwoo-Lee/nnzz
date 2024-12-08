
export interface FoodItemFromServer {
    category: string;
    distance: number;
    represent: string;
    categoryId: string
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