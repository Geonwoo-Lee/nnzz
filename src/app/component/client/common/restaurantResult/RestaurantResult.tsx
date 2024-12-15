'use client'

import {RestaurantDefaultProps} from "@/src/app/types/page/restaurant/restaurant";
import React, {useEffect, useState} from "react";
import FindApi from "@/src/app/api/client/find/find";
import {FindStore} from "@/src/app/types/models/find";
import NnzzSmall from '../../../../../../public/svg/logo/NnzzSmallCharactor.svg'
import UpArrowSmall from '../../../../../../public/svg/items/common/UpArrowSmall.svg'
import DownArrowSmall from '../../../../../../public/svg/items/common/DownArrowSmall.svg'
import RangeSlider from "@/src/app/component/client/common/rangeSlider/RangeSlider";
import Button from "../button/Button";
import {useFunnel} from "@/src/app/hooks/useFunnel";
import ResultList from "@/src/app/component/client/common/restaurantResult/component/ResultList";
import RestaurantMap from "@/src/app/component/client/common/map/RestaurantMap";
import ResultFinish from "@/src/app/component/client/common/restaurantResult/component/ResultFinish";

const RestaurantResult = (props: RestaurantDefaultProps) => {
    const {lat, lng, day, categoryList, name, type, address} = props
    const [restaurants, setRestaurants] = useState<FindStore[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isUp, setIsUp] = useState(false)
    const [defaultDistance, setDefaultDistance] = useState(750)
    const [Funnel, setStep, step] = useFunnel(["list", "map", "result"], "list");
    const [selectedStore, setSelectedStore] = useState<FindStore >(restaurants[0]);

    const changeDistance = (distance: number) => {
        setDefaultDistance(distance)
    }

    const pageRequest = async () => {
        setIsLoading(true)
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
            setIsLoading(false)
        })
    }

    const changeSelectedStore = (store: FindStore) => {
        setSelectedStore(store)
    }

    useEffect(() => {
        pageRequest()
    }, [])

    useEffect(() => {
        console.log(selectedStore)
    }, [selectedStore]);


    return (
        <div className='absolute w-full max-w-[640px]'>
            <Funnel>
                <Funnel.Step name='list'>
                    <ResultList setSelectedStore={changeSelectedStore} setStep={setStep} restaurants={restaurants} isUp={isUp} isLoading={isLoading}/>
                </Funnel.Step>
                <Funnel.Step name='map'>
                    <div >
                        <RestaurantMap step={step} setStep={setStep} onStoreSelect={changeSelectedStore} selectedStore={selectedStore} isUp={isUp} places={restaurants}  />
                    </div>
                </Funnel.Step>
                <Funnel.Step name='result'>
                    <ResultFinish
                        lng={lng}
                        lat={lat}
                        storeIdx={selectedStore ? selectedStore.storeId : '1'}
                        day={day}
                        type={type}
                    />
                </Funnel.Step>
            </Funnel>
            {
                step !== 'result' && (
                    <div className='relative'>
                        <div
                            style={{display: 'block'}}
                            className="bg-common-white shadow-bottom-sheet-top rounded-t-[12px] fixed bottom-0 z-[60] w-full max-w-[640px] left-1/2 -translate-x-1/2"
                        >
                            <div
                                className={`px-5 py-5  max-h-[calc(100vh-80px)] overflow-y-auto`}
                            >
                                <div className={`w-full bg-transparent ${isUp ? 'h-[164px]' : 'h-[72px]'}`}>
                                    <div className='flex flex-col gap-4'>
                                        {
                                            step === 'list' && <div
                                                className='w-full absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center bg-transparent'>
                                                <button
                                                    className='bg-bg-9 active:bg-bg-7 active:scale-95 text-common-white h-button-height-md text-caption2 font-regular rounded-[1000px] w-[140px] '
                                                    onClick={() => {
                                                        setStep('map')
                                                    }}>
                                                    지도로 보기
                                                </button>
                                            </div>
                                        }
                                        <div className='bg-bg-0'>
                                            <div className='bg-common-white rounded-t-[16px] px-4 py-4 flex flex-col gap-4'>
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
                                                {
                                                    isUp && <div className='flex flex-col gap-4'>
                                                        <RangeSlider defaultValue={defaultDistance} max={750}
                                                                     changeDistance={changeDistance}
                                                                     steps={[250, 500, 750]}/>
                                                        <Button type='primary' size='lg' onClick={pageRequest}>
                                                            적용하기
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default RestaurantResult