import {Suspense} from "react";
import FindLocationClientPage from "@/src/app/component/client/page/find-location/FindLocationClientPage";
import dynamic from "next/dynamic";


const Loading = dynamic(() => import('../../component/client/common/loading/Loading'), {
    ssr: false
})

const FindLocation = () => {
    return <Suspense fallback={<Loading/>}>
       <FindLocationClientPage/>
    </Suspense>
}

export default FindLocation