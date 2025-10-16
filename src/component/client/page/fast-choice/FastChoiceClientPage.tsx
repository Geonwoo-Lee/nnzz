'use client'

import freeFoodData from "@/src/dummy/dummy";
import React, { useEffect, useState} from "react";
import {useToast} from "@/src/core/ToastProvider";
import {ToastAlign, ToastPosition} from "@/src/types/common/toast";
import FindApi from "@/src/api/client/find/find";
import {FoodItem} from "@/src/types/models/food";
import {useFunnel} from "@/src/hooks/useFunnel";
import FastCardChoice from "@/src/component/client/page/fast-choice/features/FastCardChoice";
import RestaurantResult from "@/src/component/client/common/restaurantResult/RestaurantResult";
import {getUserLocation} from "@/src/func/common/geo.utils";

const FastChoiceClientPage = ({type, day, menu}: {type: string, day: string, menu: string}) => {
    const [selectedList,setSelectedList] = useState<FoodItem[]>([])
    const [cardData, setCardData] = useState<FoodItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const showToast = useToast()
    const [Funnel, setStep] = useFunnel(["choice", "result"], "choice");

    const handleSelect = (card: FoodItem) => {
        setSelectedList((prevList) => {
            if (prevList.some(item => item.categoryId === card.categoryId)) {
                return prevList.filter((item) => item.categoryId !== card.categoryId);
            }

            if (prevList.length >= 15) {
                showToast('최대 15개까지 선택할 수 있습니다.', ToastPosition.BOTTOM, ToastAlign.CENTER);
                return prevList;
            }

            return [...prevList, card];
        });
    };


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
                    };
                });

            setCardData(mergedData);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    }, [type, day]);

    const categoryList = () => {
        const categoryIds = selectedList.map(card => card.categoryId);
        return categoryIds
    }

    return (
        <div>
            <Funnel>
                <Funnel.Step name='choice'>
                    <FastCardChoice type={type} setStep={setStep} isLoading={isLoading} menu={menu} cardData={cardData}
                                    handleSelect={handleSelect} selectedList={selectedList}/>
                </Funnel.Step>
                <Funnel.Step name='result'>
                    <RestaurantResult name={getUserLocation()?.name || ''} address={getUserLocation()?.address || ''}
                                      day={day} type={type} lat={getUserLocation()?.latitude || 0}
                                      lng={getUserLocation()?.longitude || 0} categoryList={categoryList()}/>
                </Funnel.Step>
            </Funnel>
        </div>
    )
}

export default FastChoiceClientPage