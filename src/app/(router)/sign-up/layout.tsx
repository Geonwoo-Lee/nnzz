import BasicLayout from "@/src/app/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/app/types/common/header";
import {ReactNode} from "react";


const SignUpLayout = ({children}: {children: ReactNode}) => {
    return <BasicLayout header={false} headerTitle={''}  profileImage={false} logo={false} headerType={HeaderTypes.history} >
        {children}
    </BasicLayout>
}

export default SignUpLayout