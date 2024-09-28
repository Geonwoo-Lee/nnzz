import {KakaoResult} from "@/src/app/types/common/kakao";


export async function getAddressFromCoords(latitude: number, longitude: number): Promise<string> {
    try {
        const response = await fetch(
            `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
            {
                headers: {
                    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const result: KakaoResult = data.documents[0];

        if (result.road_address) {
            const road = result.road_address;
            return `${road.region_1depth_name} ${road.region_2depth_name} ${road.region_3depth_name} ${road.road_name} ${road.main_building_no}${road.sub_building_no ? '-' + road.sub_building_no : ''} ${road.building_name ? '(' + road.building_name + ')' : ''}`.trim();
        } else {
            const jibun = result.address;
            return `${jibun.region_1depth_name} ${jibun.region_2depth_name} ${jibun.region_3depth_name} ${jibun.mountain_yn === 'Y' ? '산 ' : ''}${jibun.main_address_no}${jibun.sub_address_no ? '-' + jibun.sub_address_no : ''}`.trim();
        }
    } catch (error) {
        console.error('Error fetching address:', error);
        return '주소를 찾을 수 없습니다.';
    }
}

interface KakaoSearchResult {
    address_name: string;
    y: string;  // 위도
    x: string;  // 경도
    address_type: string;
    address: {
        address_name: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
        mountain_yn: string;
        main_address_no: string;
        sub_address_no: string;
    };
    road_address: {
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
    } | null;
}

export async function searchAddressToCoords(address: string): Promise<{ latitude: number; longitude: number; fullAddress: string } | null> {
    try {
        const response = await fetch(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
            {
                headers: {
                    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.documents.length === 0) {
            console.log('No results found for the given address');
            return null;
        }

        const result: KakaoSearchResult = data.documents[0];

        return {
            latitude: parseFloat(result.y),
            longitude: parseFloat(result.x),
            fullAddress: result.road_address ? result.road_address.address_name : result.address.address_name
        };
    } catch (error) {
        console.error('Error searching address:', error);
        return null;
    }
}

// 사용 예시
// searchAddressToCoords("서울특별시 강남구 테헤란로 152").then(result => console.log(result));