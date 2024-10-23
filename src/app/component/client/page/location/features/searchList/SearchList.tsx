import {Place} from "@/src/app/types/page/location/location";
import React from "react";
import LocationComponent from "@/src/app/component/client/page/location/features/LocationComponent";


const SearchList = ({places}: {places: Place[]}) => {
    return <div className='flex flex-col '>
        {
            places.map((el, index) => (
                <LocationComponent.LocationList isLast={index === places.length -1} place={el} key={`location-list-${index}`}/>
            ))
        }
    </div>
}

export default SearchList