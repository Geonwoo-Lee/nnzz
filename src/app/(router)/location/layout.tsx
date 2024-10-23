import BasicLayout from "@/src/app/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/app/types/common/header";
import {ReactNode} from "react";


const LocationLayout = ({children}: {children: ReactNode}) => {
    return <BasicLayout header={true} headerTitle={'현재 위치 설정'}  profileImage={false} logo={false} headerType={HeaderTypes.history} >
        {children}
    </BasicLayout>
}

export default LocationLayout