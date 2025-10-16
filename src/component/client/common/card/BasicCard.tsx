import Image from "next/image";
import LocationPin from "@/public/svg/items/deck/LocationPin.svg";
import React from "react";
import {BasicCardProps} from "@/src/types/page/swape/card";

const BasicCard: React.FC<BasicCardProps> = ({ data }) => {
    return (
        <>
            <div className="w-full p-4 relative" >
                <div className="w-full h-full relative rounded-[16px] overflow-hidden aspect-[49/50]"  >
                    {
                        data.bgType &&
                        <Image
                            src={`/images/bg/${data.bgType}.png`}
                            alt="background"
                            layout="fill"
                            className="rounded-[16px] object-cover"
                            draggable={false}
                        />
                    }
                    <div className="absolute inset-0">
                        <div className=" w-full h-full pt-4 px-8">
                            <Image
                                src={data.imageUrl}
                                alt={data.category}
                                priority
                                quality={75}
                                layout="fill"
                                className="rounded-[16px] object-contain"
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-common px-4 flex flex-col gap-2 pb-4">
                <div className="text-heading3 xs:text-heading1 font-medium">{data.category}</div>
                <div className='flex flex-row items-center'>
                    <LocationPin/>
                    <div className='text-body2 xs:text-body1 font-regular'>
                        가까운 식당 {data.distance}m
                    </div>
                </div>
                <div className='text-body2 xs:text-body1  font-regular'>
                    {data.represent}
                </div>
            </div>
        </>
    )
}

export default BasicCard