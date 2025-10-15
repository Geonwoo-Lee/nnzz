import {Suspense} from "react";
import LocationClientPage from "@/src/app/component/client/page/location/LocationClientPage";
import Loading from "@/src/app/component/client/common/loading/Loading";



const LocationSelect = () => {
    return <Suspense fallback={<Loading/>}>
        <LocationClientPage/>
    </Suspense>
}

export default LocationSelect