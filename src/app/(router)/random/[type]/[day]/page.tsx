'use client'
import Header from "@/src/component/server/common/header/Header";
import {HeaderTypes} from "@/src/types/common/header";
import RandomCard from "@/src/component/client/common/card/RandomCard";
import Button from "@/src/component/client/common/button/Button";
import {use, useEffect, useRef, useState} from "react";
import FindApi from "@/src/app/api/client/find/find";
import {getUserLocation} from "@/src/func/common/geo.utils";
import { RandomStore} from "@/src/types/models/find";
import foodData from "@/src/dummy/dummy";
import Loading from "@/src/component/client/common/loading/Loading";
import {useFunnel} from "@/src/hooks/useFunnel";
import RestaurantResult from "@/src/component/client/common/restaurantResult/RestaurantResult";
import * as htmlToImage from 'html-to-image';
import HeightUnitWrapper from "@/src/component/client/common/heightWrapper/HeightWrapper";

const RandomPage = (props: { params: Promise<{ type: string, day: string }> }) => {
    const params = use(props.params);
    const [randomData, setRandomData] = useState<RandomStore>({} as RandomStore);
    const [Funnel, setStep] = useFunnel(['random', 'list'], "random");
    const [isLoading, setIsLoading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const DEFAULT_FOOD_IMAGE = "/images/items/RandomFind.png";

    const handleCardImageShare = async () => {
        if (!cardRef.current) {
            alert('카드를 찾을 수 없습니다.');
            return;
        }

        if (!randomData || !randomData.categoryId) {
            alert('데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
            return;
        }

        try {
            setIsCapturing(true);

            const dataUrl = await htmlToImage.toPng(cardRef.current, {
                quality: 1.0,
                pixelRatio: 2,
                cacheBust: true,
            });

            showCardImageModal(dataUrl);
        } catch (error) {
            console.error('이미지 생성 실패:', error);
            alert('이미지 생성에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsCapturing(false);
        }
    };

    const showCardImageModal = (imageUrl: string): void => {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.75)';
        modal.style.zIndex = '9999';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.padding = '20px';

        const imgContainer = document.createElement('div');
        imgContainer.style.width = '85%';
        imgContainer.style.maxWidth = '320px';
        imgContainer.style.display = 'flex';
        imgContainer.style.flexDirection = 'column';
        imgContainer.style.alignItems = 'center';

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = '랜덤 카드';
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.borderRadius = '12px';
        img.style.boxShadow = '0 8px 28px 0 rgba(0,0,0,0.2)';
        imgContainer.appendChild(img);

        modal.appendChild(imgContainer);

        const helpText = document.createElement('p');
        helpText.textContent = '이미지를 길게 누르면 저장할 수 있습니다';
        helpText.style.color = 'white';
        helpText.style.margin = '16px 0 0 0';
        helpText.style.fontSize = '14px';
        helpText.style.textAlign = 'center';
        imgContainer.appendChild(helpText);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.width = '100%';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '닫기';
        closeBtn.style.padding = '12px 24px';
        closeBtn.style.backgroundColor = '#e74c3c';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '8px';
        closeBtn.style.fontSize = '16px';
        closeBtn.style.fontWeight = '500';
        closeBtn.style.cursor = 'pointer';

        closeBtn.onclick = () => document.body.removeChild(modal);

        buttonContainer.appendChild(closeBtn);
        imgContainer.appendChild(buttonContainer);

        document.body.appendChild(modal);
    };

    const getImageUrl = () => {
        if (!randomData.categoryId) return DEFAULT_FOOD_IMAGE;

        const foodItem = foodData.find((el) => el.categoryId === randomData.categoryId);
        return foodItem?.imageUrl || DEFAULT_FOOD_IMAGE;
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
        }).catch((error) => {
            console.error('RandomStores failed:', error);
            setIsLoading(false);
        })
    }, [params.type, params.day]);

    return (
        <HeightUnitWrapper>
            <Funnel>
                <Funnel.Step name='random'>
                    <section className='h-random-height overflow-y-hidden bg-bg-1 flex flex-col'>
                        {
                            isLoading ? (
                                <Loading/>
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
                                        {randomData.categoryId && (
                                            <RandomCard data={
                                                {
                                                    categoryId: randomData.categoryId,
                                                    imageUrl: getImageUrl(),
                                                    category: randomData.category,
                                                    represent: randomData.represent,
                                                    distance: randomData.distance
                                                }
                                            }/>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className='px-4 max-w-[640px] pb-6 h-[180px] pt-4 w-full bg-bg-1 fixed bottom-0 flex flex-col gap-4'>
                                    <Button
                                        type='primary'
                                        size='lg'
                                        style='w-full'
                                        onClick={handleCardImageShare}
                                        disabled={isCapturing || !randomData.categoryId}
                                    >
                                        {isCapturing ? '이미지 저장 중...' : '이미지 저장하기'}
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
                    <RestaurantResult
                        name={getUserLocation()?.name || ''}
                        address={getUserLocation()?.address || ''}
                        day={params.day}
                        type={params.type}
                        lat={getUserLocation()?.latitude || 0}
                        lng={getUserLocation()?.longitude || 0}
                        categoryList={[randomData.categoryId]}
                    />
                </Funnel.Step>
            </Funnel>
        </HeightUnitWrapper>
    )
}

export default RandomPage