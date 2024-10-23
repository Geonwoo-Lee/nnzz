import { useRouter } from "next/navigation";
import { searchAddressByKeyword, getAddressFromCoords } from "@/src/app/func/common/geo.utils";

const useLocationBasedNavigation = () => {
    const router = useRouter();

    const handleLocationRequest = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const userLocation = await getAddressFromCoords(latitude, longitude);
                        if (userLocation) {
                            localStorage.setItem('userLocation', JSON.stringify(userLocation));
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
        });
    };

    return handleLocationRequest;
};

export default useLocationBasedNavigation;