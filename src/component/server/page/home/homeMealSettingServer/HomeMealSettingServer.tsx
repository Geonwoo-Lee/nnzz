import {Suspense} from "react";
import HomeMealSettingSectionSkeleton
    from "@/src/component/server/page/home/skeletons/HomeMealSettingSectionSkeleton";
import HomeMealSettingClient from "@/src/component/client/page/home/HomeMealSettingClient";


const HomeMealSettingServer = () => {
    return (
        <Suspense fallback={<HomeMealSettingSectionSkeleton/>}>
            <HomeMealSettingClient/>
        </Suspense>
    )
}

export default HomeMealSettingServer