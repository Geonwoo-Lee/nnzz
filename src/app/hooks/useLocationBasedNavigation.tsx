import { useRouter } from "next/navigation";
import { useState } from "react"; // useState 추가
import { searchAddressByKeyword, getAddressFromCoords } from "@/src/app/func/common/geo.utils";

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
                            setIsLoading(false); // 로딩 종료
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
            setIsLoading(false); // 로딩 종료
            router.push('/find-location');
        });
    };

    return { handleLocationRequest, isLoading }; // isLoading 상태 함께 반환
};

export default useLocationBasedNavigation;