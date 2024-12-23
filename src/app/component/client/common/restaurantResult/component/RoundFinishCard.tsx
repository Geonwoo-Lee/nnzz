import LikeIcon from "@/public/svg/items/deck/LikeSmall.svg";
import Clock from "@/public/svg/items/common/Clock.svg";
import DateUtils from "@/src/app/func/common/date.utils";
import MapPin from "@/public/svg/items/common/MapPin.svg";
import React from "react";
import {FindStoreType} from "@/src/app/types/models/find";
import Image from "next/image";


const RoundFinishCard = ({store, day, type, categoryImage, handleOpenNaverMap}: { store: FindStoreType, day: string, type: string, categoryImage: string, handleOpenNaverMap: (store: FindStoreType) => void}) => {
    return (
        <div className='px-8 w-full'>
            <div className='w-full flex flex-col shadow-top-sides gap-2 rounded-t-[12px] bg-bg-0 px-4'>
                <div className='pt-4 flex flex-col gap-2 items-center justify-center'>
                    <Image src={categoryImage} alt='category' width={116} height={116}/>
                </div>
                <div className='py-2 flex items-center justify-center text-text-1 text-title2 font-bold'>
                    {store.category}
                </div>
                <div className='text-caption2 font-regular text-text-2 text-center'>
                    {store.description}
                </div>
                <div className='pb-8 pt-6'>
                    <div className='relative w-full rounded-[12px] border border-red-200'>
                        <LikeIcon className='absolute -top-20 left-1/2 -translate-x-1/2'/>
                        <div className='pt-6 pb-4 px-4 flex flex-col gap-6'>
                            <div className='flex flex-col gap-3'>
                                <div className='text-caption1 font-medium text-primary-5'>
                                    데이트 정보
                                </div>
                                <div className='text-body1 font-medium text-text-1'>
                                    {store.name}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div
                                    className='flex text-caption2 font-regular text-text-2 flex-row gap-[3px] items-center'>
                                    <Clock/>
                                    {`${DateUtils.formatDateToKorean(day)} ${DateUtils.mealRenderer(type)}`}
                                </div>
                                <div
                                    className='flex flex-row text-caption2 font-regular text-text-2 gap-[3px] items-center'>
                                    <MapPin/>
                                    {
                                        store.address
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col gap-[14px]'>
                                {store.menus?.slice(0, 3).map((menu, index) => (
                                    <div key={index} className='flex flex-row justify-between'>
                                        <div className='text-caption2  text-text-3 font-regular'>
                                            {menu.menu_name}
                                        </div>
                                        <div className='text-caption2 text-text-2 font-medium'>
                                            {menu.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                onClick={() => {
                    handleOpenNaverMap(store)
                }}
                className='bg-primary-6 text-common-white text-caption1 font-medium w-full h-[46px] rounded-b-[12px] flex items-center justify-center'>
                네이버 지도에서 확인하기
            </div>
        </div>
    )
}

export default RoundFinishCard