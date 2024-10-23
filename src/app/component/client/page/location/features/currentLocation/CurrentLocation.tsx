'use client'
import React, {useEffect, useState} from "react";
import {Place} from "@/src/app/types/page/location/location";
import LocationComponent from "@/src/app/component/client/page/location/features/LocationComponent";

const CurrentLocation = () => {
    const [currentLocation, setCurrentLocation] = useState<Place[]>([]);

    useEffect(() => {
        const getLocation = window.localStorage.getItem('currentLocation');
        setCurrentLocation(JSON.parse(getLocation || '[]'));
    }, []);


    return <div >
        <div className='text-body2 font-bold text-text-2 px-4'>
            최근 설정한 위치
        </div>
        <div>
            {
                currentLocation.map((el, index) =>
                    <LocationComponent.LocationList isLast={index === currentLocation.length - 1} place={el}
                                                    key={`location-list-${index}`}/>)
            }
        </div>
    </div>
}

export default CurrentLocation