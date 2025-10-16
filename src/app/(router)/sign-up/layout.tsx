import BasicLayout from "@/src/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/types/common/header";
import {ReactNode} from "react";


const SignUpLayout = ({children}: {children: ReactNode}) => {
    return <BasicLayout header={false} headerTitle={''}  profileImage={false} logo={false} headerType={HeaderTypes.history} >
        {children}
    </BasicLayout>
}

export default SignUpLayout