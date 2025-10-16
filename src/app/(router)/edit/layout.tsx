import BasicLayout from "@/src/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/types/common/header";
import {ReactNode} from "react";


const SettingLayout = ({children}: {children: ReactNode}) => {
    return <BasicLayout header={true} headerTitle={'프로필 관리'}  headerType={HeaderTypes.history} >
        {children}
    </BasicLayout>
}

export default SettingLayout