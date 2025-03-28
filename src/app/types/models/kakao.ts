export interface KakaoAddress {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
}

export interface KakaoRoadAddress {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
}

export interface KakaoResult {
    address: KakaoAddress;
    road_address: KakaoRoadAddress | null;
}


declare global {
    interface Navigator {
        standalone?: boolean;
    }
}