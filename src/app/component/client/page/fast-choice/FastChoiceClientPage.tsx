'use client'

import {foodDetailData} from "@/src/app/dummy/dummy";
import {FastChoiceComponent} from "@/src/app/component/client/page/fast-choice/features/FastChoiceComponent";
import {FoodChoiceCard} from "@/src/app/types/page/fast-choice/fast-choice";
import {useState} from "react";
import FastChoiceButton from "@/src/app/component/client/page/fast-choice/features/FastChoiceButton";

const FastChoiceClientPage = () => {
    const [selectedList,setSelectedList] = useState<FoodChoiceCard[]>([])

    const handleSelect = (card: FoodChoiceCard) => {
        setSelectedList((prevList) => {
            if (prevList.includes(card)) {
                return prevList.filter((item) => item !== card);
            } else {
                return [...prevList, card];
            }
        });
    };

    return (
        <div className='grid-rows-3 grid grid-cols-3 w-full gap-3'>
            {
                foodDetailData.map((card, index) => (
                    <FastChoiceComponent.FoodCard key={`fast-card-${index}`} selected={selectedList.includes(card)}
                                                  data={card} setSelected={handleSelect}/>
                ))
            }
            <FastChoiceButton step={selectedList.length} onClick={() => {}}/>
        </div>
    )
}

export default FastChoiceClientPage