

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
        category: number[] | string[]
    }
}

export interface CategoryList {
    category: string;
    distance: number;
    represent: string;
}

interface Broadcast {
    broadcastName: string;
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
    broadcasts: Broadcast[];
    menus: Menu[];
    last?: boolean
}