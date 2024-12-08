import { useState, useEffect } from 'react';
import {getAddressFromCoords} from "@/src/app/func/common/geo.utils";
import {LocationType} from "@/src/app/types/models/geo";


export function useGeolocation() {
    const [location, setLocation] = useState<LocationType | null>(null);

    useEffect(() => {
        const storedLocation = localStorage.getItem('userLocation');
        if (storedLocation) {
            setLocation(JSON.parse(storedLocation));
        }
    }, []);

    const requestGeolocation = () => {
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
                    console.log('Location:', newLocation);
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