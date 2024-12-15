import React from "react";
import {CurrentLocation} from "@/src/app/types/page/location/location";


const LocationList = ({isLast, place, setLocation} : {isLast: boolean, place: CurrentLocation , setLocation?: (place: CurrentLocation) => void}) => {
    return <div onClick={() => {
        if(setLocation) {
            setLocation(place)
        }
        return
    }}
                className={`${isLast ? '' : 'border-b border-line-1'} h-[65px] flex flex-col gap-3 justify-center p-4`}>
        <div className='text-body2 font-regular text-text-2'>
            {place.buildingName}
        </div>
        <div className='text-text-3 text-caption1 font-regular'>
            {place.address}
        </div>
    </div>
}

export default LocationList