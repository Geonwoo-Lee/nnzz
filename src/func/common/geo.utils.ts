import {KakaoResult} from "@/src/types/models/kakao";
import {KakaoKeywordSearchResult} from "@/src/func/common/kakao";
import {Place} from "@/src/types/page/location/location";

export async function searchAddressByKeyword(keyword: string): Promise<Array<Place>> {
    try {
        const keywordResponse = await fetch('/api/kakao/search-keyword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword }),
        });

        if (!keywordResponse.ok) {
            throw new Error(`HTTP error! status: ${keywordResponse.status}`);
        }

        const keywordData = await keywordResponse.json();
        let results: Place[] = [];

        // 키워드 검색 결과 처리
        if (keywordData.documents && keywordData.documents.length > 0) {
            results = keywordData.documents.map((result: KakaoKeywordSearchResult) => ({
                name: result.place_name,
                address: result.address_name,
                roadAddress: result.road_address_name,
                latitude: parseFloat(result.y),
                longitude: parseFloat(result.x)
            }));
        }

        if (results.length === 0) {
            const addressResponse = await fetch('/api/kakao/search-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ keyword }),
            });

            if (!addressResponse.ok) {
                throw new Error(`HTTP error! status: ${addressResponse.status}`);
            }

            const addressData = await addressResponse.json();

            if (addressData.documents && addressData.documents.length > 0) {
                results = addressData.documents.map((doc: any) => {
                    let name = '';

                    // 건물명이 있으면 사용
                    if (doc.road_address && doc.road_address.building_name) {
                        name = doc.road_address.building_name;
                    } else if (doc.address && doc.address_name) {
                        // 건물명이 없으면 주소명을 이름으로 사용
                        name = doc.address_name;
                    }

                    return {
                        name: name,
                        address: doc.address ? doc.address.address_name || doc.address_name : '',
                        roadAddress: doc.road_address ? doc.road_address.address_name || '' : '',
                        latitude: parseFloat(doc.y),
                        longitude: parseFloat(doc.x)
                    };
                });
            }
        }

        if (results.length === 0) {
            console.log('No results found for the given keyword or address');
        }

        return results;
    } catch (error) {
        console.error('Error searching address:', error);
        return [];
    }
}

export const getUserLocation = () => {
    const locationString = localStorage.getItem('userLocation');
    const pinedLocation = localStorage.getItem('pinedLocation');

    if (pinedLocation) {
        const pinedData = JSON.parse(pinedLocation);
        return {
            latitude: pinedData.lat,
            longitude: pinedData.lng,
            address: pinedData.address,
            name: pinedData.name
        };
    }

    return locationString ? JSON.parse(locationString) : null;
}

export async function getAddressFromCoords(latitude: number, longitude: number): Promise<Place> {
    try {
        const response = await fetch('/api/kakao/coord-to-address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
        });

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