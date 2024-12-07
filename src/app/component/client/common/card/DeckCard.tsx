import React from 'react'
import {CardProps} from "@/src/app/types/page/swape/card";
import LikeButton from '../../../../../../public/svg/items/deck/LikeButton.svg'
import DisLikeButton from '../../../../../../public/svg/items/deck/DisLikeButton.svg'
import BasicCard from "@/src/app/component/client/common/card/BasicCard";

const DeckCard: React.FC<CardProps> = ({ data,  bind, dragStatus, className }) => {
    const statusCard = () => {
        if (dragStatus === 'like') {
            return <div {...(bind || {})} className='w-full h-full bg-[#0F172AD1] flex items-center justify-center'>
                <LikeButton/>
            </div>
        } else {
            return <div {...(bind || {})} className='w-full h-full bg-[#0F172AD1] flex items-center justify-center'>
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
                       <BasicCard data={data}/>
                    </>
            }
        </div>
    )
}

export default DeckCard