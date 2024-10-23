import {Suspense} from "react";
import FindLocationClientPage from "@/src/app/component/client/page/find-location/FindLocationClientPage";


const FindLocation = () => {
    return <Suspense fallback={<div>
        로딩중
    </div>}>
       <FindLocationClientPage/>
    </Suspense>
}

export default FindLocation