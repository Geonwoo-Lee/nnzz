import React from 'react'
import Image from 'next/image'
import {CardProps} from "@/src/app/types/page/swape/card";
import LocationPin from '../../../../../../public/svg/items/deck/LocationPin.svg'
import LikeButton from '../../../../../../public/svg/items/deck/LikeButton.svg'
import DisLikeButton from '../../../../../../public/svg/items/deck/DisLikeButton.svg'

const Card: React.FC<CardProps> = ({ data,  bind, dragStatus, className }) => {
    const statusCard = () => {
        if (dragStatus === 'like') {
            return <div    {...(bind || {})} className=' w-full h-full bg-[#0F172AD1] flex items-center justify-center'>
                <LikeButton/>
            </div>
        } else {
            return <div    {...(bind || {})} className=' w-full h-full bg-[#0F172AD1] flex items-center justify-center'>
                <DisLikeButton/>
            </div>
        }
    }
    return (
        <div
            {...(bind || {})}
            className={`overflow-hidden relative shadow-card flex flex-col cursor-grab touch-none border border-line-1 rounded-[12px] ${className}`}
        >
            {
                dragStatus !== 'neutral' ?
                    statusCard() : <>
                        <div className="w-full p-4 relative card-image-size">
                            <div className="w-full h-full relative rounded-[16px] overflow-hidden">
                                <Image
                                    src={`/images/bg/${data.bgType}.png`}
                                    alt="background"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-[16px]"
                                    draggable={false}
                                />
                                <div className="absolute inset-0">
                                    <Image
                                        src={data.imageUrl}
                                        alt={data.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-[16px]"
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-common px-4 pb-10">
                            <h2 className="text-xl">{data.name}</h2>
                            <div className='flex flex-row items-center'>
                                <LocationPin/>
                                <div>
                                    가까운 식당 232m
                                </div>
                            </div>
                            <div>
                                {data.representativeMenu}
                            </div>
                        </div>
                    </>

            }
        </div>
    )
}

export default Card