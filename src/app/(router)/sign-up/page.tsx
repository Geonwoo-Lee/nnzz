import {Suspense} from "react";
import SignUpClientPage from "@/src/app/component/client/page/sign-up/SignUpClientPage";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import('../../component/client/common/loading/Loading'), {
    ssr: false
})

const SignupPage = () => {
    return <Suspense fallback={<Loading/>}>
        <SignUpClientPage/>
    </Suspense>
}

export default SignupPage