import {Suspense} from "react";
import SignUpClientPage from "@/src/app/component/client/page/sign-up/SignUpClientPage";


const SignupPage = () => {
    return <Suspense fallback={<div>로딩중</div>}>
        <SignUpClientPage/>
    </Suspense>
}

export default SignupPage