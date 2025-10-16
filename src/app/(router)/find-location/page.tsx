import {Suspense} from "react";
import FindLocationClientPage from "@/src/component/client/page/find-location/FindLocationClientPage";
import Loading from "@/src/component/client/common/loading/Loading";



const FindLocation = () => {
    return <Suspense fallback={<Loading/>}>
       <FindLocationClientPage/>
    </Suspense>
}

export default FindLocation