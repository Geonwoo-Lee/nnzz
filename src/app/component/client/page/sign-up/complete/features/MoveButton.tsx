import Button from "@/src/app/component/client/common/button/Button";
import React from "react";
import {useRouter} from "next/navigation";


const MoveButton = () => {
    const router = useRouter()
    return                <Button onClick={() => {
        router.push('/home')
    }} style='w-full' type='primary' size='lg'>
        냠냠쩝쩝 시작하기
    </Button>
}

export default MoveButton