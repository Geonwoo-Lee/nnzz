
import {KakaoResult} from "@/src/app/types/common/kakao";
import {KakaoKeywordSearchResult} from "@/src/app/func/common/kakao";



export async function searchAddressByKeyword(keyword: string): Promise<Array<{ name: string; address: string; roadAddress: string; latitude: number; longitude: number }>> {
    try {
        const response = await fetch(
            `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}`,
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
            console.log('No results found for the given keyword');
            return [];
        }

        return data.documents.map((result: KakaoKeywordSearchResult) => ({
            name: result.place_name,
            address: result.address_name,
            roadAddress: result.road_address_name,
            latitude: parseFloat(result.y),
            longitude: parseFloat(result.x)
        }));
    } catch (error) {
        console.error('Error searching address:', error);
        return [];
    }
}



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
