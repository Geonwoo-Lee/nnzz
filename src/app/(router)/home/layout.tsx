import BasicLayout from "@/src/app/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/app/types/common/header";
import {ReactNode} from "react";


const HomeLayout = ({children}: {children: ReactNode}) => {
    return <BasicLayout header={true} headerTitle={''}  setting={true} headerType={HeaderTypes.basic} >
        {children}
    </BasicLayout>
}

export default HomeLayout