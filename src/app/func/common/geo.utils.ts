
import {KakaoResult} from "@/src/app/types/models/kakao";
import {KakaoKeywordSearchResult} from "@/src/app/func/common/kakao";
import {Place} from "@/src/app/types/page/location/location";



export async function searchAddressByKeyword(keyword: string): Promise<Array<Place>> {
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



export async function getAddressFromCoords(latitude: number, longitude: number): Promise<Place > {
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

        if (!result) {
            return {
                name: '',
                address: '',
                roadAddress: '',
                latitude: 0,
                longitude: 0
            };
        }

        let address = '';
        let roadAddress = '';
        let name = '';

        if (result.road_address) {
            const road = result.road_address;
            roadAddress = `${road.region_1depth_name} ${road.region_2depth_name} ${road.region_3depth_name} ${road.road_name} ${road.main_building_no}${road.sub_building_no ? '-' + road.sub_building_no : ''} ${road.building_name ? '(' + road.building_name + ')' : ''}`.trim();
            name = road.building_name || '';
        }

        if (result.address) {
            const jibun = result.address;
            address = `${jibun.region_1depth_name} ${jibun.region_2depth_name} ${jibun.region_3depth_name} ${jibun.mountain_yn === 'Y' ? '산 ' : ''}${jibun.main_address_no}${jibun.sub_address_no ? '-' + jibun.sub_address_no : ''}`.trim();
        }

        return {
            name: name,
            address: address,
            roadAddress: roadAddress,
            latitude: latitude,
            longitude: longitude
        };
    } catch (error) {
        console.error('Error fetching address:', error);
        return {
            name: '',
            address: '',
            roadAddress: '',
            latitude: 0,
            longitude: 0
        };
    }
}
