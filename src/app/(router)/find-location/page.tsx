import {Suspense} from "react";
import FindLocationClientPage from "@/src/app/component/client/page/find-location/FindLocationClientPage";
import Loading from "@/src/app/component/client/common/loading/Loading";



const FindLocation = () => {
    return <Suspense fallback={<Loading/>}>
       <FindLocationClientPage/>
    </Suspense>
}

export default FindLocation