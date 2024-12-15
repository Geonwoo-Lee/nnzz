import React, {useEffect, useState} from "react";
import Lottie from "lottie-react";
import heartBoom from '../../../../../lib/lotties/heart-boom.json'
import FindApi from "@/src/app/api/client/find/find";
import Image from 'next/image'
import Close from "@/public/svg/header/Close.svg";
import {FindStoreType} from "@/src/app/types/models/find";
import foodData from "@/src/app/dummy/dummy";
import RoundFinishCard from "@/src/app/component/client/common/restaurantResult/component/RoundFinishCard";
import MoveToNaverMap from "@/src/app/component/client/common/restaurantResult/component/MoveToNaverMap";

const ResultFinish = ({storeIdx, lng, lat, day, type}: {
    storeIdx?: string,
    lng: number,
    lat: number,
    day: string,
    type: string
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [store, setStore] = useState<FindStoreType>({} as FindStoreType)
    const [categoryImage, setCategoryImage] = useState('')
    const [naverMapLoading, setNaverMapLoading] = useState(false)

    const handleOpenNaverMap = (store: FindStoreType) => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            setNaverMapLoading(true)
        setTimeout(() => {
            setNaverMapLoading(false)
        }, 3000)
        setTimeout(() => {
            if (isMobile) {
                const naverMapAppUrl = `nmap://place?lat=${store.lat}&lng=${store.lng}&name=${encodeURIComponent(store.name)}&appname=your_app_name`;
                const naverMapWebUrl = `https://map.naver.com/v5/search/${encodeURIComponent(store.name)}?c=${store.lng},${store.lat},15,0,0,0,dh`;

                setTimeout(() => {
                    window.location.href = naverMapWebUrl;
                }, 1000);
                window.location.href = naverMapAppUrl;
            } else {
                window.open(`https://map.naver.com/v5/search/${encodeURIComponent(store.name)}?c=${store.lng},${store.lat},15,0,0,0,dh`, '_blank');
            }
        }, 3000)
    };

    useEffect(() => {
        if (storeIdx && storeIdx !== '1') {
            FindApi.FindStores({
                storeId: storeIdx,
                lng: lng,
                lat: lat
            }).then((res) => {
                setStore(res)
                const image = foodData.find((item) => item.categoryId === res.categoryId)
                setCategoryImage(image!.imageUrl!)
                setTimeout(() => {
                    setIsLoading(false)
                }, 500)
            })
        }
    }, [storeIdx]);
    return (
        <div className='h-screen bg-bg-1 flex flex-col'>
            {
                naverMapLoading ?
                    <MoveToNaverMap/>
                    : <>
                        <header
                            className={`w-full max-w-[640px] flex items-center justify-between h-header-height bg-bg-1 px-4`}>
                            <div className="flex-shrink-0"/>
                            <div
                                className="absolute inset-x-0 text-title2 font-bold text-text-2 flex justify-center max-w-[180px] mx-auto whitespace-nowrap"/>
                            <div className="flex-shrink-0 text-caption1 text-text-2 font-medium">
                                <Close onClick={() => window.location.reload()}/>
                            </div>
                        </header>

                        {isLoading && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <Lottie animationData={heartBoom} loop={false}/>
                            </div>
                        )}

                        {!isLoading && (
                            <div className='flex-1 w-full flex flex-col gap-6 items-center justify-center pb-[122px] z-10'>
                                <div className='text-title2 text-text-1 font-medium'>
                                    <span className='text-primary-6'>최종 선택</span> 맛의 짝!
                                </div>
                                <RoundFinishCard handleOpenNaverMap={handleOpenNaverMap} categoryImage={categoryImage}
                                                 store={store} day={day} type={type}/>
                            </div>
                        )}

                        <div className='absolute w-full bottom-0 z-0'>
                            <div className='w-full h-[122px] relative'>
                                <Image fill src='/assets/hearts.png' alt='hearts'/>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default ResultFinish