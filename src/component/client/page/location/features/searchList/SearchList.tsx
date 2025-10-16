import {CurrentLocation} from "@/src/types/page/location/location";
import React from "react";
import LocationComponent from "@/src/component/client/page/location/features/LocationComponent";


const SearchList = ({places, setLocation}: {places: CurrentLocation[], setLocation: (place: CurrentLocation) => void}) => {
    return <div className='flex flex-col '>
        {
            places.map((el, index) => (
                <LocationComponent.LocationList setLocation={setLocation} isLast={index === places.length -1} place={el} key={`location-list-${index}`}/>
            ))
        }
    </div>
}

export default SearchList