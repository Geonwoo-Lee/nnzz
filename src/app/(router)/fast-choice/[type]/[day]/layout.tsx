import BasicLayout from "@/src/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/types/common/header";
import {ReactNode} from "react";


const FastChoiceLayout = ({children}: {children: ReactNode}) => {
    return <BasicLayout header={false} headerTitle={'식당 찾기'}  profileImage={false} logo={false} headerType={HeaderTypes.history} >
        {children}
    </BasicLayout>
}

export default FastChoiceLayout