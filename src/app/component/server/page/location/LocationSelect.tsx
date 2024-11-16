import {Suspense} from "react";
import LocationClientPage from "@/src/app/component/client/page/location/LocationClientPage";
import dynamic from "next/dynamic";


const Loading = dynamic(() => import('../../../client/common/loading/Loading'), {
    ssr: false
})

const LocationSelect = () => {
    return <Suspense fallback={<Loading/>}>
        <LocationClientPage/>
    </Suspense>
}

export default LocationSelect