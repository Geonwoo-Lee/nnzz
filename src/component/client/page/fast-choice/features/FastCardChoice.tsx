import Loading from "@/src/component/client/common/loading/Loading";
import {FastChoiceComponent} from "@/src/component/client/page/fast-choice/features/FastChoiceComponent";
import FastChoiceButton from "@/src/component/client/page/fast-choice/features/FastChoiceButton";
import UserName from "@/src/component/client/common/userName/UserName";
import {FastChoicePageProps} from "@/src/types/page/fast-choice/fast-choice";
import ArrowLeft from "@/public/svg/header/LeftArrow.svg";
import React from "react";
import {useRouter} from "next/navigation";


const FastCardChoice = (props: FastChoicePageProps) => {
    const {isLoading, cardData, selectedList, handleSelect,type, menu, setStep} = props
    const router = useRouter()
    return (
        <>
            <header
                className={`w-full max-w-[640px] flex items-center justify-between relative h-header-height bg-common-white px-4`}>
                <div className=" flex-shrink-0 ">
                    <ArrowLeft className="cursor-pointer " onClick={() => {
                        router.back()
                    }}/>
                </div>
                <div
                    className="absolute inset-x-0 text-title2 font-bold text-text-2 flex justify-center max-w-[180px] mx-auto whitespace-nowrap">
                    식당 찾기
                </div>
                <div className="flex-shrink-0 text-caption1 text-text-2 font-medium">

                </div>
            </header>
            <div className="h-fast-choice-height overflow-auto">
                <div className='px-4 pt-4 pb-16 flex flex-col items-center justify-center gap-4'>
                    <div className='text-text-1 font-medium text-title2 flex flex-row gap-1'>
                        <UserName style='text-text-1 font-medium text-title2'/>님의 오늘의 {menu}픽은?
                    </div>
                    <div className='text-text-3 font-medium text-body1'>
                        오늘 왠지 끌리는 음식을 골라봐요.
                    </div>
                    <div className='grid-rows-3 grid grid-cols-3 w-full gap-3'>
                        {
                            isLoading &&
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <Loading/>
                            </div>
                        }
                        {
                            cardData.map((card, index) => (
                                <FastChoiceComponent.FoodCard key={`fast-card-${index}`}
                                                              index={index}
                                                              selected={selectedList.includes(card)}
                                                              data={card} setSelected={handleSelect}/>
                            ))
                        }
                        <FastChoiceButton type={type} step={selectedList.length} onClick={() => {
                            setStep('result')
                        }}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FastCardChoice