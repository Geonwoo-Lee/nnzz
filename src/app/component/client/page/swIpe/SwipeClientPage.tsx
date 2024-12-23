import SwipeComponent from "@/src/app/component/client/page/swIpe/features/SwipeComponent";
import {DeckProps} from "@/src/app/types/page/swape/deck";
import Loading from "@/src/app/component/client/common/loading/Loading";
import React  from "react";
import ProgressBar from "@/src/app/component/client/common/progressBar/ProgressBar";
import Button from "../../common/button/Button";
import UserName from "@/src/app/component/client/common/userName/UserName";
import DateUtils from "@/src/app/func/common/date.utils";
import Header from "@/src/app/component/server/common/header/Header";
import {HeaderTypes} from "@/src/app/types/common/header";


const SwipeClientPage = (props :DeckProps ) => {
    const {cards, setStep, setLikeCards, isLoading, likedCards, day, type} = props

    return (
        <div className='h-[100vh] flex flex-col justify-between overflow-y-scroll'>
            {
                isLoading && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Loading/>
                    </div>
                )
            }
            <div className="pl-4 pr-4">
                <Header.HeaderLayout
                    headerBg='bg-bg-1'
                    type={HeaderTypes.history}
                    title={''}
                />
            </div>
            <div className='flex flex-col gap-4 '>
                <div className='flex flex-col gap-8'>
                    <SwipeComponent.SwipeDescription type={type}/>
                    <div className='px-4'>
                        {
                            cards.length === 0 ?
                                <div className='font-medium text-common text-body2'>선택 할 수 있는 카드가 없어요 😭</div> :
                                <ProgressBar leftCount minRequired={3} beforeMinText="최소 3개 카드를 고르면 메뉴 추천 받을 수 있어요 🙂"
                                             afterMinText={`이제 ${DateUtils.mealRenderer(type)} 메뉴를 추천 받을 수 있어요!`}
                                             currentStep={likedCards.length} totalStep={15}/>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-6 pb-10'>
                    <SwipeComponent.Deck type={type} day={day} likedCards={likedCards} setLikeCards={setLikeCards}
                                         cards={cards} setStep={setStep}/>
                    <div className='flex w-full items-center justify-center  px-4'>
                        <Button fullRound type='muted' size='ml' style='w-[80%]' disabled={likedCards.length < 3}
                                onClick={() => {
                                    setTimeout(() => {
                                        setStep('1')
                                        setLikeCards(likedCards)
                                    }, 10)
                                }}>
                            <div className='flex flex-row items-center justify-center'>
                                <UserName style=''/>님이 고른 메뉴보기
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwipeClientPage