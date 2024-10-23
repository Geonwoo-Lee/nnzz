'use client'
import React from "react";
import dynamic from "next/dynamic";


const CompletePage = () => {

    const MoveButton = dynamic(() => import('./features/MoveButton'), {ssr: false})

    return (
        <div className='p-4 flex flex-col justify-between h-[100vh]'>
            <div className=' w-full flex flex-col items-center py-6 text-title1 font-bold text-text-1'>
                <div>
                    냠냠쩝쩝님
                </div>
                <div>
                    가입을 축하드랴요 !
                </div>
            </div>
            <div className='py-4 w-full'>
                <MoveButton/>
            </div>
        </div>
    )
}

export default CompletePage