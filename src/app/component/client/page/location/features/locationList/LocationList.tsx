import React from "react";
import {Place} from "@/src/app/types/page/location/location";


const LocationList = ({isLast, place} : {isLast: boolean, place: Place}) => {
    return <div
                className={`${isLast ? '' : 'border-b border-line-1'} h-[65px] flex flex-col gap-3 justify-center p-4`}>
        <div className='text-body2 font-regular text-text-2'>
            {place.name}
        </div>
        <div className='text-text-3 text-caption1 font-regular'>
            {place.roadAddress}
        </div>
    </div>
}

export default LocationList