'use client'
import freeFoodData from "@/src/app/dummy/dummy";
import {useFunnel} from "@/src/app/hooks/useFunnel";
import {useEffect, useState} from "react";
import {useGeolocation} from "@/src/app/hooks/useGeoloaction";
import SwipeClientPage from "@/src/app/component/client/page/swIpe/SwipeClientPage";
import {FoodItem} from "@/src/app/types/models/food";
import SwipeComponent from "@/src/app/component/client/page/swIpe/features/SwipeComponent";

const SwapPage = () => {
    const {  requestGeolocation } = useGeolocation();

    const [Funnel, setStep] = useFunnel(["0", "1"], "0");
    const [likeCards, setLikeCards] = useState<FoodItem[]>([]);
    const [deletedList, setDeletedList] = useState<FoodItem[]>([]);

    const controlLikeCard = (result: FoodItem[]) => {
        setLikeCards(result)
    }

    // const deleteList = (item: FoodItem) => {
    //     const filteredList = likeCards.filter((card) => card.id !== item.id);
    //     setLikeCards(filteredList);
    // }

    const controlDeleteList = (card: FoodItem, type: 'add' | 'delete') => {
        if (type === 'delete') {
            setDeletedList(prev => [...prev, card]);
        } else {
            setDeletedList(prev => prev.filter(item => item.id !== card.id));
        }
    }

    useEffect(() => {
        requestGeolocation();
    }, []);

    useEffect(() => {
        console.log('rel', deletedList)
    }, [deletedList]);

    return   <Funnel>
        <Funnel.Step name="0">
            <SwipeClientPage setLikeCards={controlLikeCard} cards={freeFoodData} setStep={setStep}/>
        </Funnel.Step>
        <Funnel.Step name="1">
           <SwipeComponent.CompletePage deletedList={deletedList} setDeletedCards={controlDeleteList} likeCards={likeCards}/>
        </Funnel.Step>
    </Funnel>
}


export default SwapPage