import SwipeComponent from "@/src/app/component/client/page/swIpe/features/SwipeComponent";
import {DeckProps} from "@/src/app/types/page/swape/deck";


const SwipeClientPage = (props :DeckProps ) => {
    const {cards, setStep, setLikeCards} = props

    return (
        <div className='h-[100vh] flex flex-col justify-between overflow-y-scroll'>
            <SwipeComponent.SwipeDescription/>
            <SwipeComponent.Deck setLikeCards={setLikeCards} cards={cards} setStep={setStep} />
        </div>
    )
}

export default SwipeClientPage