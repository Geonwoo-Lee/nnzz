import SwipeComponent from "@/src/component/client/page/swIpe/features/SwipeComponent";
import {DeckProps} from "@/src/types/page/swape/deck";
import Loading from "@/src/component/client/common/loading/Loading";
import React  from "react";
import ProgressBar from "@/src/component/client/common/progressBar/ProgressBar";
import Button from "../../common/button/Button";
import UserName from "@/src/component/client/common/userName/UserName";
import DateUtils from "@/src/func/common/date.utils";
import Header from "@/src/component/server/common/header/Header";
import {HeaderTypes} from "@/src/types/common/header";
import HeightUnitWrapper from "@/src/component/client/common/heightWrapper/HeightWrapper";


const SwipeClientPage = (props :DeckProps ) => {
    const {cards, setStep, setLikeCards, isLoading, likedCards, day, type} = props

    return (
        <HeightUnitWrapper className='flex flex-col overflow-hidden'>
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
            <div className='flex flex-col gap-8 flex-1 min-h-0'>
                <div className='flex flex-col gap-8 shrink-0'>
                    <SwipeComponent.SwipeDescription type={type}/>
                    <div className='px-4'>
                        {
                            !isLoading && cards.length === 0 ?
                                <div className='font-medium text-common text-body2'>선택 할 수 있는 카드가 없어요 😭</div> :
                                <ProgressBar leftCount minRequired={3} beforeMinText="최소 3개 카드를 고르면 메뉴 추천 받을 수 있어요 🙂"
                                             afterMinText={`이제 ${DateUtils.mealRenderer(type)} 메뉴를 추천 받을 수 있어요!`}
                                             currentStep={likedCards.length} totalStep={cards.length}/>
                        }
                    </div>
                </div>
                <div className='bg-common-white flex flex-col flex-1 min-h-0 pb-4 gap-4'>
                    <SwipeComponent.Deck isLoading={isLoading} type={type} day={day} likedCards={likedCards} setLikeCards={setLikeCards}
                                         cards={cards} setStep={setStep}/>
                    <div className='flex w-full items-center justify-center px-4 shrink-0'>
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
        </HeightUnitWrapper>
    )
}

export default SwipeClientPage