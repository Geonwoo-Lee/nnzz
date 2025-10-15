import {Suspense} from "react";
import SignUpClientPage from "@/src/app/component/client/page/sign-up/SignUpClientPage";
import Loading from "@/src/app/component/client/common/loading/Loading";

const SignupPage = () => {
    return <Suspense fallback={<Loading/>}>
        <SignUpClientPage/>
    </Suspense>
}

export default SignupPage