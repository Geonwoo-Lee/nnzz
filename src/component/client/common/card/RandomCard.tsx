import {DefaultCardProps} from "@/src/types/common/card";
import Image from 'next/image'
import LocationPin from "@/public/svg/items/deck/LocationPin.svg";
import React from "react";

const RandomCard = ({data}: DefaultCardProps) => {
    return (
        <div className='w-full aspect-[4/5] bg-common-white rounded-[12px] shadow-[0_8px_28px_0_rgba(0,0,0,0.2)] border border-line-1'>
            <div className='h-full flex flex-col p-8 gap-4'>
                <div className='text-title1 font-medium text-text-1'>
                    오늘 <br/>
                    {data.category} 어때요?
                </div>
                <div className='flex-1 relative'>
                    <div className='border-l border-line-2 h-full absolute left-0'></div>
                    <div className='h-full'>
                        <Image unoptimized src={data.imageUrl} priority alt='random' fill className='object-contain' />
                    </div>
                </div>
                <div className="text-common flex flex-col gap-2 ">
                    <h2 className="text-title1 font-medium">{data.category}</h2>
                    <div className='flex flex-row items-center'>
                        <LocationPin/>
                        <div className='text-text-1 text-caption1 font-regular'>
                            가까운 식당 {data.distance}m
                        </div>
                    </div>
                    <div className='text-caption1 font-regular'>
                        {data.represent}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RandomCard