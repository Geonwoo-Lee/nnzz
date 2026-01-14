export interface FoodStoreItem {
  storeId: string;
  name: string;
  address: string;
  category: string;
  categoryId: string;
  cardDate: string;
  mealtime: string;
}

export interface FoodStoreItemWithImage extends FoodStoreItem {
  imageUrl: string;
  bgType: string;
}

export interface FoodHistoryGroup {
  createdDate: string;
  items: FoodStoreItem[];
}

export interface FoodCard extends FoodStoreItem {
  createdDate: string;
}

export interface FoodHistoryGroupWithImage {
  createdDate: string;
  items: FoodStoreItemWithImage[];
}

export type FoodHistory = FoodHistoryGroup[];
export type FoodHistoryWithImage = FoodHistoryGroupWithImage[];
