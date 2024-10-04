interface KakaoKeywordSearchResult {
    place_name: string;
    address_name: string;
    road_address_name: string;
    y: string;  // 위도
    x: string;  // 경도
}

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

// 사용 예시
// searchAddressByKeyword("서초대로").then(results => console.log(results));