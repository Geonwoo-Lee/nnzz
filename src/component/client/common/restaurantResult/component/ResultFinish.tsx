import React, {useEffect, useState} from "react";
import Lottie from "lottie-react";
import heartBoom from '@/src/lib/lotties/heart-boom.json'
import FindApi from "@/src/app/api/client/find/find";
import Image from 'next/image'
import Close from "@/public/svg/header/Close.svg";
import {FindStoreType} from "@/src/types/models/find";
import foodData from "@/src/dummy/dummy";
import RoundFinishCard from "@/src/component/client/common/restaurantResult/component/RoundFinishCard";
import MoveToNaverMap from "@/src/component/client/common/restaurantResult/component/MoveToNaverMap";
import CardApi from "@/src/app/api/client/card/card";
import DateUtils from "@/src/func/common/date.utils";
import {useRouter} from "next/navigation";

const ResultFinish = ({storeIdx, lng, lat, day, type, setStep}: {
    storeIdx?: string,
    lng: number,
    lat: number,
    day: string,
    type: string,
    setStep: (step: 'map' | 'list' | 'result') => void
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [store, setStore] = useState<FindStoreType>({} as FindStoreType)
    const [categoryImage, setCategoryImage] = useState('')
    const [naverMapLoading, setNaverMapLoading] = useState(false)

    const handleOpenNaverMap = async () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        setNaverMapLoading(true);

        if (isMobile) {
            const naverMapAppUrl = `nmap://place?id=${storeIdx}`;
            const naverMapWebUrl = `https://map.naver.com/p/entry/place/${storeIdx}`;

            const openApp = new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    resolve(false);
                }, 1000);

                window.location.href = naverMapAppUrl;

                window.addEventListener('blur', () => {
                    clearTimeout(timeout);
                    resolve(true);
                });
            });

            const appOpened = await openApp;
            if (!appOpened) {
                window.location.href = naverMapWebUrl;
            }
        } else {
            window.open(`https://map.naver.com/p/entry/place/${storeIdx}`, '_blank');
        }

        setNaverMapLoading(false);

        setTimeout(() => {
            router.push('/home');
        }, 2500);
    };

    useEffect(() => {
        if (!storeIdx || storeIdx === '1' || !day || !type) {
            console.error('Missing required parameters:', { storeIdx, day, type });
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem('nnzz_token');

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

                if (token && storeIdx && day && type) {
                    CardApi.SaveLocation({
                        id: storeIdx,
                        date: day,
                        day: DateUtils.mealRenderer(type),
                        authorization: token
                    }).catch(error => {
                        console.error('SaveLocation failed:', error);
                    });
                } else {
                    console.warn('Cannot save location: missing token or params');
                }
            }, 500)
        }).catch(error => {
            console.error('FindStores failed:', error);
            setIsLoading(false);
        })
    }, [storeIdx, day, type, lng, lat]);

    return (
        <div className='h-basic-menu-body bg-bg-1 flex flex-col'>
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
                                <Close onClick={() => {
                                    setStep('list')
                                }}/>
                            </div>
                        </header>

                        {isLoading && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <Lottie animationData={heartBoom} loop={false}/>
                            </div>
                        )}

                        {!isLoading && (
                            <div
                                className='flex-1  w-full flex flex-col gap-6 items-center overflow-y-hidden pb-[122px]   z-10'>
                                <div className='text-title2 text-text-1 font-medium'>
                                    <span className='text-primary-6'>최종 선택</span> 맛의 짝!
                                </div>
                                <RoundFinishCard handleOpenNaverMap={handleOpenNaverMap} categoryImage={categoryImage}
                                                 store={store} day={day} type={type}/>
                            </div>
                        )}

                        <div className='absolute w-full bottom-0 z-0'>
                            <div className='w-full h-[122px] relative'>
                                <Image
                                    fill src='/assets/hearts.png' priority quality={75} alt='hearts'/>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default ResultFinish