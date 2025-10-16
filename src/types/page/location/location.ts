export interface locationSearch {
    address: string
}

export interface Place {
    name: string;
    address: string;
    roadAddress: string;
    latitude: number;
    longitude: number
}

export interface CurrentLocation  {
    locationId?: number,
    userId?: number,
    lat: number,
    lng: number,
    address: string,
    buildingName: string,
    createdAt?: string
}