import React from "react";


const ImageSkeleton = () => {

    return (
            <div className='px-[50px] relative'>
                <div className='bg-bg-1 border flex flex-col gap-4 justify-end px-4 shadow-card skeleton rounded-[12px] w-full h-full'>
                    <div className='aspect-[49/50] w-full'></div>
                    <div className='flex flex-col gap-4 pb-4'>
                        <div className="skeleton w-[90px] h-[40px]"></div>
                        <div className='skeleton w-[150px] h-[20px]'></div>
                        <div className='skeleton w-[240px] h-[20px]'></div>
                    </div>
                </div>
            </div>
    )
}

export default ImageSkeleton