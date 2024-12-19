'use client'
import Header from "@/src/app/component/server/common/header/Header";
import {HeaderTypes} from "@/src/app/types/common/header";
import RandomCard from "@/src/app/component/client/common/card/RandomCard";
import Button from "@/src/app/component/client/common/button/Button";
import {useEffect, useRef, useState} from "react";
import FindApi from "@/src/app/api/client/find/find";
import {getUserLocation} from "@/src/app/func/common/geo.utils";
import {RandomStore} from "@/src/app/types/models/find";
import foodData from "@/src/app/dummy/dummy";
import Loading from "@/src/app/component/client/common/loading/Loading";
import {useFunnel} from "@/src/app/hooks/useFunnel";
import RestaurantResult from "@/src/app/component/client/common/restaurantResult/RestaurantResult";

const RandomPage = ({params}: { params: { type: string, day: string } }) => {
    const [randomData, setRandomData] = useState<RandomStore>({} as RandomStore);
    const [Funnel, setStep] = useFunnel(['random', 'list'], "random");
    const [isLoading, setIsLoading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const handleKakaoShare = async () => {
        if (!cardRef.current) {
            console.log('카드 요소를 찾을 수 없습니다');
            return;
        }

        try {
            const htmlToImage = await import('html-to-image');

            await Promise.all(
                Array.from(cardRef.current.querySelectorAll('img'))
                    .filter(img => !img.complete)
                    .map(img => new Promise(resolve => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    }))
            );

            const dataUrl = await htmlToImage.toPng(cardRef.current, {
                quality: 1.0,
                pixelRatio: 2
            });
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `random-menu-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (err) {
            console.error('Image capture error:', err);
            alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        setIsLoading(true);
        FindApi.RandomStores(params.type, {
            lat: getUserLocation()?.latitude || 0,
            lng: getUserLocation()?.longitude || 0,
            day: params.day
        }).then((res) => {
            setRandomData(res);
            setIsLoading(false);
        })
    }, []);

    return (
        <Funnel>
            <Funnel.Step name='random'>
                <section className='h-random-height overflow-y-hidden bg-bg-1 flex flex-col'>
                    {
                        isLoading ? (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <Loading/>
                            </div>
                        ) : <>
                            <div className="pl-4 pr-4">
                                <Header.HeaderLayout
                                    headerBg='bg-bg-1'
                                    close={true}
                                    type={HeaderTypes.close}
                                    title={'랜덤 뽑기'}
                                />
                            </div>
                            <div className='flex-1 flex justify-center items-center'>
                                <div className='w-[80%] max-w-[400px]' ref={cardRef}>
                                    <RandomCard data={
                                        {
                                            categoryId: randomData.categoryId,
                                            imageUrl: foodData.find((el) => el.categoryId === randomData.categoryId)?.imageUrl || "",
                                            category: randomData.category,
                                            represent: randomData.represent,
                                            distance: randomData.distance
                                        }
                                    }/>
                                </div>
                            </div>
                            <div
                                className='px-4 max-w-[640px] pb-12 h-[180px] pt-4 w-full bg-bg-1 fixed bottom-0 flex flex-col gap-4'>
                                <Button type='primary' size='lg' style='w-full' onClick={handleKakaoShare}>
                                    이미지 저장하기
                                </Button>
                                <Button type='outlined' size='lg' style='w-full' onClick={() => {
                                    setStep('list')
                                }}>
                                    식당리스트 확인하기
                                </Button>
                            </div>
                        </>
                    }
                </section>
            </Funnel.Step>
            <Funnel.Step name='list'>
                <RestaurantResult name={getUserLocation()?.name || ''} address={getUserLocation()?.address || ''} day={params.day} type={params.type} lat={ getUserLocation()?.latitude || 0} lng={ getUserLocation()?.longitude || 0} categoryList={[randomData.categoryId]} />
            </Funnel.Step>
        </Funnel>
    )
}

export default RandomPage