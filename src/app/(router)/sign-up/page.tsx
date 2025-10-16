import {Suspense} from "react";
import SignUpClientPage from "@/src/component/client/page/sign-up/SignUpClientPage";
import Loading from "@/src/component/client/common/loading/Loading";

const SignupPage = () => {
    return <Suspense fallback={<Loading/>}>
        <SignUpClientPage/>
    </Suspense>
}

export default SignupPage