'use client'

import {RestaurantDefaultProps} from "@/src/app/types/page/restaurant/restaurant";
import React, {useEffect, useState} from "react";
import FindApi from "@/src/app/api/client/find/find";
import {FindStore} from "@/src/app/types/models/find";
import ResultCard from "@/src/app/component/client/common/restaurantResult/component/ResultCard";
import NnzzSmall from '../../../../../../public/svg/logo/NnzzSmallCharactor.svg'
import UpArrowSmall from '../../../../../../public/svg/items/common/UpArrowSmall.svg'
import DownArrowSmall from '../../../../../../public/svg/items/common/DownArrowSmall.svg'

const RestaurantResult = (props: RestaurantDefaultProps) => {
    const {lat, lng, day, categoryList, name, type, address} = props
    const [restaurants, setRestaurants] = useState<FindStore[]>([])
    const [isUp, setIsUp] = useState(false)
    const [defaultDistance] = useState(750)

    useEffect(() => {
        FindApi.findRestaurants(({
            type: type,
            data: {
                lng: lng,
                lat: lat,
                day: day,
                category: categoryList,
            },
            distance: defaultDistance
        })).then((res) => {
            setRestaurants(res)
            console.log(res)
        })
    }, [])

    return (
        <div
            className={`pb-10 ${isUp ? 'h-restaurant-result-up-height' : 'h-restaurant-result-height'} overflow-y-scroll bg-bg-0`}>
            <header
                className={`w-full max-w-[640px] flex items-center justify-between relative h-header-height bg-common-white px-4`}>
                <div className=" flex-shrink-0 ">
                </div>
                <div
                    className="absolute inset-x-0 text-title2 font-bold text-text-2 flex justify-center max-w-[180px] mx-auto whitespace-nowrap">
                    식당보기
                </div>
                <div className="flex-shrink-0 text-caption1 text-text-2 font-medium">
                    처음으로
                </div>
            </header>
            <div className='flex flex-col gap-4'>
                <div>

                </div>
                <div className='text-body2 font-regular text-text-2 px-4 pt-2'>
                    식당 <span className='font-bold'>{restaurants.length}</span>개를 찾았어요.
                </div>
                <div>
                    {
                        restaurants.map((el, index) => (
                            <ResultCard key={`result-${index}`} {...el}/>
                        ))
                    }
                </div>
            </div>
            <div className='relative'>
                <div
                    style={{display: 'block'}}
                    className="bg-common-white shadow-bottom-sheet-top rounded-t-[12px] fixed bottom-0 z-[60] w-full max-w-[640px] left-1/2 -translate-x-1/2"
                >
                    <div
                        className={`px-5 py-8  max-h-[calc(100vh-80px)] overflow-y-auto`}
                    >
                        <div className={`w-full bg-transparent ${isUp ? 'h-[184px]' : 'h-[82px]'}`}>
                            <div className='flex flex-col gap-4'>
                                <div
                                    className='w-full absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center bg-transparent'>
                                    <button className='bg-bg-9 active:bg-bg-7 active:scale-95 text-common-white h-button-height-md text-caption2 font-regular rounded-[1000px] w-[140px] ' onClick={() => {
                                    }}>
                                        지도로 보기
                                    </button>
                                </div>
                                <div className='bg-bg-0'>
                                    <div className='bg-common-white rounded-t-[16px] px-4 py-4'>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row items-center'>
                                                <NnzzSmall/>
                                                <div className='text-body2 font-regular text-text-1 truncate'>
                                                    {name ? name : address}
                                                </div>
                                            </div>
                                            <div onClick={() => {
                                                setIsUp(!isUp)
                                            }} className='flex flex-row gap-1 items-center'>
                                                <span className='text-body2 font-regular text-text-1'>주변</span>
                                                <div className='text-primary-6 text-body2 font-medium'>
                                                    {defaultDistance}m
                                                </div>
                                                {
                                                    isUp ? <DownArrowSmall/> : <UpArrowSmall/>
                                                }
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantResult