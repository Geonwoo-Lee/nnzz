import { useRouter } from "next/navigation";
import { useState } from "react"; // useState 추가
import { searchAddressByKeyword, getAddressFromCoords } from "@/src/func/common/geo.utils";

const useLocationBasedNavigation = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    const handleLocationRequest = () => {
        setIsLoading(true); // 로딩 시작
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const userLocation = await getAddressFromCoords(latitude, longitude);
                        if (userLocation) {
                            localStorage.setItem('userLocation', JSON.stringify(userLocation));
                            setIsLoading(false);
                            router.push('/find-location');
                        } else {
                            setDefaultLocation();
                        }
                    } catch (error) {
                        setDefaultLocation();
                    }
                },
                () => {
                    setDefaultLocation();
                }
            );
        } else {
            setDefaultLocation();
        }
    };

    const setDefaultLocation = () => {
        // GPS가 실패해도 이미 저장된 위치가 있으면 그것을 사용
        const existingUserLocation = localStorage.getItem('userLocation');
        if (existingUserLocation) {
            console.log('GPS failed but using existing saved location');
            setIsLoading(false);
            router.push('/find-location');
            return;
        }

        // 저장된 위치가 전혀 없을 때만 강남역을 기본값으로 설정
        searchAddressByKeyword('강남역').then((res) => {
            if (res && res.length > 0) {
                const currentLocations = JSON.parse(localStorage.getItem('currentLocation') || '[]');
                currentLocations.push(res[0]);
                localStorage.setItem('currentLocation', JSON.stringify(currentLocations));
                localStorage.setItem('userLocation', JSON.stringify(res[0]));
            }
        }).catch((error) => {
            console.error('주소 검색 중 오류 발생:', error);
        }).finally(() => {
            setIsLoading(false);
            router.push('/find-location');
        });
    };

    return { handleLocationRequest, isLoading }; // isLoading 상태 함께 반환
};

export default useLocationBasedNavigation;