'use client'

import NaverMap, {MapPlace} from "@/src/component/client/common/map/NaverMap";
import {useEffect, useState} from "react";
import {Place} from "@/src/types/page/location/location";
import {getAddressFromCoords} from "@/src/func/common/geo.utils";
import BottomSheet from "@/src/component/client/common/bottomSheet/BottomSheet";
import Button from '../../common/button/Button'
import {useLocationStore} from "@/src/stores/locationStore";
import {useSetPinedLocation} from "@/src/hooks/useSetPinedLocation";

const FindLocationClientPage = () => {
    const [currentLocation, setCurrentLocation] = useState<MapPlace | null>(null);
    const setLocation = useSetPinedLocation();

    const upDatePin = async (lat: number, lng: number) => {
        const userLocation = await getAddressFromCoords(lat, lng);
        if (userLocation) {
            setCurrentLocation({
                name: userLocation.name,
                lat: userLocation.latitude,
                lng: userLocation.longitude,
                address: userLocation.address
            });
        }
    };

    const locationRenderer = () => {
        if(currentLocation?.address) {
            return `${currentLocation.address} ${currentLocation.name || ''}`.trim()
        }
        return '위치를 설정해주세요'
    }

    const onRegister = (location: MapPlace) => {
        setLocation({
            buildingName: location.name,
            lat: location.lat,
            lng: location.lng,
            address: location.address ?? "",
        });
    }

    useEffect(() => {
        const storedLocation = useLocationStore.getState().userLocation as Place | null;
        if (storedLocation) {
            setCurrentLocation({
                name: storedLocation.name,
                address: storedLocation.address,
                lat: storedLocation.latitude,
                lng: storedLocation.longitude,
            });
        }
    }, []);



    return (
        <div>
            {currentLocation && (
                <NaverMap
                    pinAble={true}
                    onPinUpdated={(lat, lng) => upDatePin(lat, lng)}
                    places={[currentLocation]}
                />
            )}
            <BottomSheet open={true} close={() => {}} nonPadding={true} backdrop={false} noBackdrop={true} >
                <div className='px-5 py-6 flex flex-col gap-[54px]'>
                    <div className='text-common text-title2 font-medium'>
                        {locationRenderer()}
                    </div>
                    <div>
                        <Button style='w-full' onClick={() => {
                            if (currentLocation) onRegister(currentLocation);
                        }} size='lg' type={'primary'}>
                            이 위치로 등록
                        </Button>
                    </div>
                </div>
            </BottomSheet>
        </div>
    );
};

export default FindLocationClientPage;
