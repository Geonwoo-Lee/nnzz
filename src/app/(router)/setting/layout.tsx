import BasicLayout from "@/src/app/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/app/types/common/header";
import {ReactNode} from "react";


const SettingLayout = ({children}: {children: ReactNode}) => {
    return <BasicLayout header={true} headerTitle={'설정'}  headerType={HeaderTypes.history} >
        {children}
    </BasicLayout>
}

export default SettingLayout