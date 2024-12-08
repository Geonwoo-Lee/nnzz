import SwipeComponent from "@/src/app/component/client/page/swIpe/features/SwipeComponent";
import {DeckProps} from "@/src/app/types/page/swape/deck";
import Loading from "@/src/app/component/client/common/loading/Loading";
import React  from "react";
import ProgressBar from "@/src/app/component/client/common/progressBar/ProgressBar";
import Button from "../../common/button/Button";


const SwipeClientPage = (props :DeckProps ) => {
    const {cards, setStep, setLikeCards, isLoading, likedCards} = props

    return (
        <div className='h-[100vh] flex flex-col justify-between overflow-y-scroll'>
            {
                isLoading && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Loading/>
                    </div>
                )
            }
            <div className='flex flex-col gap-4 '>
                <div className='flex flex-col gap-4'>
                    <SwipeComponent.SwipeDescription/>
                    <div className='px-4'>
                        <ProgressBar leftCount minRequired={5} beforeMinText="최소 5개 카드를 고르면 메뉴 추천 받을 수 있어요 🙂" afterMinText='이제 점심 메뉴를 추천 받을 수 있어요!' currentStep={likedCards.length} totalStep={15} />
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <SwipeComponent.Deck likedCards={likedCards} setLikeCards={setLikeCards} cards={cards} setStep={setStep} />
                    <div className='flex w-full items-center justify-center  px-4'>
                        <Button type='muted' size='lg' style='w-[80%]' disabled={likedCards.length < 5} onClick={() => {
                            setTimeout(() => {
                                setStep('1')
                                setLikeCards(likedCards)
                            }, 10)
                        }}>
                            냠냠쩝쩝이 고른 메뉴보기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwipeClientPage