'use client'

import NaverMap, {MapPlace} from "@/src/app/component/client/common/map/NaverMap";
import {useEffect, useState} from "react";
import {Place} from "@/src/app/types/page/location/location";
import {getAddressFromCoords} from "@/src/app/func/common/geo.utils";
import BottomSheet from "@/src/app/component/client/common/bottomSheet/BottomSheet";
import Button from '../../common/button/Button'
import {useRouter} from "next/navigation";

const FindLocationClientPage = () => {
    const router = useRouter();
    const [currentLocation, setCurrentLocation] = useState<MapPlace | null>(null);

    const upDatePin = async (lat: number, lng: number) => {
        const userLocation = await getAddressFromCoords(lat, lng);
        if (userLocation) {
            setCurrentLocation({
                name: userLocation.name,
                lat: userLocation.latitude,
                lng: userLocation.longitude
            });
        }
    };

    const getLocation = localStorage.getItem('userLocation');

    const locationRenderer = () => {
        if(currentLocation?.lng && currentLocation.lng) {
            const location = getAddressFromCoords(currentLocation.lat, currentLocation.lng).then((res) => {
                return `${res?.address} ${res?.name}`
            })
            return location
        }else {
            return '위치를 설정해주세요'
        }
    }

    const setLocation = (location: MapPlace) => {
        if(location) {
            window.localStorage.setItem('pinedLocation', JSON.stringify(location));
            router.push('/home')
        }else {
            return
        }
    }

    useEffect(() => {
        if (getLocation) {
            const location = JSON.parse(getLocation) as Place;
            setCurrentLocation({
                name: location.name,
                lat: location.latitude,
                lng: location.longitude
            });
        }
    }, [getLocation]);

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
                            setLocation(currentLocation as MapPlace)
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