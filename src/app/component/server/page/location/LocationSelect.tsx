import {Suspense} from "react";
import LocationClientPage from "@/src/app/component/client/page/location/LocationClientPage";


const LocationSelect = () => {
    return <Suspense fallback={<div> 로딩화면 </div>}>
        <LocationClientPage/>
    </Suspense>
}

export default LocationSelect