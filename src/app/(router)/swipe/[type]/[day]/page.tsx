'use client'
import freeFoodData from "@/src/dummy/dummy";
import { use } from 'react'
import {useFunnel} from "@/src/hooks/useFunnel";
import {useEffect, useState} from "react";
import {useGeolocation} from "@/src/hooks/useGeoloaction";
import SwipeClientPage from "@/src/component/client/page/swIpe/SwipeClientPage";
import {FoodItem} from "@/src/types/models/food";
import SwipeComponent from "@/src/component/client/page/swIpe/features/SwipeComponent";
import FindApi from "@/src/api/client/find/find";
import RestaurantResult from "@/src/component/client/common/restaurantResult/RestaurantResult";
import {getUserLocation} from "@/src/func/common/geo.utils";
import Script from "next/script";
import AdBanner from "@/src/component/client/common/adSense/AdBanner";

interface PageProps {
    params: Promise<{
        type: string;
        day: string;
    }>
}


const SwapPage = (props: PageProps) => {
    const params = use(props.params);
    const { type, day } = params;
    const {  requestGeolocation } = useGeolocation();
    const [Funnel, setStep, step] = useFunnel(["0", "1", "2", "3"], "0");
    const [likeCards, setLikeCards] = useState<FoodItem[]>([]);
    const [deletedList, setDeletedList] = useState<FoodItem[]>([]);
    const [cardData, setCardData] = useState<FoodItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const controlLikeCard = (result: FoodItem[]) => {
        setLikeCards(result)
    }


    const controlDeleteList = (card: FoodItem, type: 'add' | 'delete') => {
        if (type === 'delete') {
            setDeletedList(prev => [...prev, card]);
        } else {
            setDeletedList(prev => prev.filter(item => item.categoryId !== card.categoryId));
        }
    }


    useEffect(() => {
        requestGeolocation();
    }, []);

    const categoryList = () => {
        const categoryIds = likeCards.map(card => card.categoryId);
        return categoryIds
    }

    const [shouldMoveToNext, setShouldMoveToNext] = useState(false);

    const nextStep = () => {
        const finalSelectedCards = likeCards.filter(
            card => !deletedList.some(deletedCard => deletedCard.categoryId === card.categoryId)
        );
        setLikeCards(finalSelectedCards);
        setShouldMoveToNext(true);
    }

    useEffect(() => {
        if (shouldMoveToNext) {
            setStep('3');
            setShouldMoveToNext(false);
        }
    }, [likeCards, shouldMoveToNext]);

    useEffect(() => {
        setIsLoading(true);
        FindApi.findCategories({
            type: type,
            data: {
                day: day,
                lat: getUserLocation()?.latitude || 0,
                lng: getUserLocation()?.longitude || 0
            },
            choice: true
        }).then((serverData) => {
            const mergedData = serverData
                .filter(serverItem => {
                    return freeFoodData.some(
                        clientItem => clientItem.categoryId.toString() === serverItem.categoryId.toString()
                    );
                })
                .map(serverItem => {
                    const clientItem = freeFoodData.find(
                        clientItem => clientItem.categoryId.toString() === serverItem.categoryId.toString()
                    );

                    return {
                        ...serverItem,
                        imageUrl: clientItem!.imageUrl,
                        bgType: clientItem!.bgType
                    };
                });

            setCardData(mergedData);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    }, [type, day]);


    return   <>
        {step === "3" && (
            <Script
                id="auto-ads-step3"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        setTimeout(function() {
                            if (!window.__step3AutoAdsLoaded) {
                                try {
                                    (adsbygoogle = window.adsbygoogle || []).push({
                                        google_ad_client: "ca-pub-7391340913390710",
                                        enable_page_level_ads: true
                                    });
                                    window.__step3AutoAdsLoaded = true;
                                } catch (err) {
                                }
                            }
                        }, 500);
                    `
                }}
            />
        )}
        <Funnel>
            <Funnel.Step name="0">
                <SwipeClientPage day={day} type={type} likedCards={likeCards} setLikeCards={controlLikeCard}
                                 cards={cardData} isLoading={isLoading} setStep={setStep}/>
            </Funnel.Step>
            <Funnel.Step name="1">
                <SwipeComponent.CompletePage day={day} type={type} setStep={nextStep} deletedList={deletedList}
                                             setDeletedCards={controlDeleteList} likeCards={likeCards}/>
            </Funnel.Step>
            <Funnel.Step name="2">
                <SwipeComponent.NoChoice day={day} type={type}/>
            </Funnel.Step>
            <Funnel.Step name="3">
                <AdBanner  slot="1022048370" />
                <RestaurantResult name={getUserLocation()?.name || ''} address={getUserLocation()?.address || ''}
                                  day={day} type={type} lat={getUserLocation()?.latitude || 0}
                                  lng={getUserLocation()?.longitude || 0} categoryList={categoryList()}/>
            </Funnel.Step>
        </Funnel>
    </>

}


export default SwapPage