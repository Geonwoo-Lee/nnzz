import React from "react";
import Image from "next/image";
import MoveButton from "@/src/component/client/page/sign-up/complete/features/MoveButton";
import UserName from "@/src/component/client/page/sign-up/complete/features/UserName";


const SignUpComplete = () => {


    return (
        <div className='p-4 flex flex-col justify-between h-[100vh]'>
            <div className='flex flex-col gap-10'>
                <div className=' w-full flex flex-col items-center py-6 text-title1 font-bold text-text-1'>
                    <UserName/>
                    <div>
                        가입을 축하드려요 !
                    </div>
                </div>
                <div className='relative welcome-image-size px-11'>
                    <Image fill src={'/images/items/welcome.gif'} alt={'welcome'}/>
                </div>
            </div>
            <div className='py-4 w-full'>
                <MoveButton/>
            </div>
        </div>
    )
}

export default SignUpComplete
