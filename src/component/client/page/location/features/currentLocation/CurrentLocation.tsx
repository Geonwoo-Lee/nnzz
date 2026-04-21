'use client'
import React from "react";
import {CurrentLocation} from "@/src/types/page/location/location";
import LocationComponent from "@/src/component/client/page/location/features/LocationComponent";

const CurrentLocationList = ({place}: {place: CurrentLocation[]}) => {

    return <div >
        <div className='text-body2 font-bold text-text-2 px-4'>
            최근 설정한 위치
        </div>
        <div>
            {
                place.map((el, index) =>
                    <LocationComponent.LocationList isLast={index === place.length - 1} place={el}
                                                    key={`location-list-${index}`}/>)
            }
        </div>
    </div>
}

export default CurrentLocationList
