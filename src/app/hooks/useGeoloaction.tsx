import { useState, useEffect } from 'react';
import { getAddressFromCoords } from "@/src/app/func/common/geo.utils";
import { LocationType } from "@/src/app/types/models/geo";

export function useGeolocation() {
    const [location, setLocation] = useState<LocationType | null>(null);

    const checkStoredLocations = () => {
        const pinedLocation = localStorage.getItem('pinedLocation');
        const storedLocation = localStorage.getItem('userLocation');

        if (pinedLocation) {
            setLocation(JSON.parse(pinedLocation));
        } else if (storedLocation) {
            setLocation(JSON.parse(storedLocation));
        }
    };

    useEffect(() => {
        checkStoredLocations();

        // localStorage 변경 이벤트 감지
        const handleStorageChange = () => {
            checkStoredLocations();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const requestGeolocation = async () => {
        const pinedLocation = localStorage.getItem('pinedLocation');
        if (pinedLocation) {
            const parsedPinedLocation = JSON.parse(pinedLocation);
            setLocation(parsedPinedLocation);
            return;
        }

        if (typeof window !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const address = await getAddressFromCoords(latitude, longitude);

                    const newLocation: LocationType = {
                        latitude,
                        longitude,
                        address: address?.address || '',
                        name: address.name,
                    };
                    setLocation(newLocation);
                    localStorage.setItem('userLocation', JSON.stringify(newLocation));
                },
                (error) => {
                    console.error('Geolocation error:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    return { location, requestGeolocation };
}