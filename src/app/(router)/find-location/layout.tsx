import BasicLayout from "@/src/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/types/common/header";
import {ReactNode} from "react";


const FindLocationLayout = ({children}: {children: ReactNode}) => {
    return <BasicLayout header={true} headerTitle={'지도에서 위치 확인'}  profileImage={false} logo={false} headerType={HeaderTypes.history} >
        {children}
    </BasicLayout>
}

export default FindLocationLayout