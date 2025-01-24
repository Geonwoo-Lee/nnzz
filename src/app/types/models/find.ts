

export interface RandomStore {
    category: string;
    categoryId: number;
    distance: number;
    represent: string;
}

export interface FindCategoryReq {
    type: string
    data: {
        lng: number;
        lat: number;
        day: string;
    }
}

export interface  FindRestaurantReq {
    type: string
    distance?: number;
    data: {
        lng: number;
        lat: number;
        day: string;
        category: (string | number)[];
    }
}

export interface FindFinalRestaurantReq {
    lng: number;
    lat: number;
    storeId: string;
}

export interface FindStoreRandomReq {
    lng: number;
    lat: number;
    day: string;
}

export interface CategoryList {
    category: string;
    distance: number;
    represent: string;
}

interface Broadcast {
    broadcast_name: string;
    episode: string;
    broadcastDate: Date;
    topic: string;
}

interface Menu {
    menu_name: string;
    description: string;
    price: string;
}

export interface FindStore {
    storeId: string;
    name: string;
    address: string;
    distance: number;
    category: string;
    lat: number;
    lng: number;
    broadcasts: Broadcast[];
    menus: Menu[];
    last?: boolean
}

export interface FindStoreType {
    storeId: string;
    name: string;
    lat: number;
    lng: number;
    address: string;
    distance: number;
    description: string;
    category: string;
    categoryId: number;
    broadcasts: string[];
    menus: {
        price: string;
        menu_name: string;
        description: string;
    }[];
}