import {Suspense} from "react";
import HomeMealSettingSectionSkeleton
    from "@/src/app/component/server/page/home/skeletons/HomeMealSettingSectionSkeleton";
import HomeMealSettingClient from "@/src/app/component/client/page/home/homeMealSetting/HomeMealSettingClient";


const HomeMealSettingServer = () => {
    return (
        <Suspense fallback={<HomeMealSettingSectionSkeleton/>}>
            <HomeMealSettingClient/>
        </Suspense>
    )
}

export default HomeMealSettingServer