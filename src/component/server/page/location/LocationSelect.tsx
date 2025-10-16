import {Suspense} from "react";
import LocationClientPage from "@/src/component/client/page/location/LocationClientPage";
import Loading from "@/src/component/client/common/loading/Loading";



const LocationSelect = () => {
    return <Suspense fallback={<Loading/>}>
        <LocationClientPage/>
    </Suspense>
}

export default LocationSelect