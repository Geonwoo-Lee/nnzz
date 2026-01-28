'use client'
import React, {useEffect, useRef} from 'react'
import DeckCard from "@/src/component/client/common/card/DeckCard";
import { useCardSwipe } from "@/src/hooks/useCardSwipe";
import { animated, to } from '@react-spring/web'
import { DeckProps } from "@/src/types/page/swape/deck";
import LikeButton from '../../../../../../../public/svg/items/deck/LikeButton.svg'
import DisLikeButton from '../../../../../../../public/svg/items/deck/DisLikeButton.svg'
import ImageSkeleton from "@/src/component/client/page/swIpe/features/ImageSkeleton";

const Deck: React.FC<DeckProps> = React.memo(({ cards, setStep, setLikeCards, isLoading }) => {
    const deckRef = useRef<HTMLDivElement>(null);
    const {
        currentIndex,
        props,
        bind,
        isFinished,
        likedCards,
        dragStatus,
        handleButtonSwipe,
        imagesLoaded
    } = useCardSwipe(cards);

    if (isFinished) {
        if(setStep) {
            if(likedCards.length > 0) {
                setTimeout(() => {
                    setStep('1')
                    setLikeCards(likedCards)
                }, 10)
            }else {
                setTimeout(() => {
                    setStep('2')
                }, 10)
            }
        }
    }

    useEffect(() => {
        setLikeCards(likedCards)
    }, [likedCards]);

    return (
        <div className="flex w-full flex-col flex-1 min-h-0 gap-4 bg-common-white">
            <div ref={deckRef} className="w-full flex-1 min-h-0 relative">
                <div className="grid grid-cols-1 grid-rows-1 w-full h-full">
                    {
                        (isLoading || !imagesLoaded) && (
                           <ImageSkeleton/>
                        )
                    }

                    {
                        (!isLoading && imagesLoaded) && cards.slice(currentIndex, currentIndex + 2).map((card, i) => {
                            const isTop = i === 0;
                            return (
                                <animated.div
                                    key={card.categoryId}
                                    className={`
                                        px-[50px] 
                                        col-start-1 
                                        col-end-2 
                                        row-start-1 
                                        row-end-2
                                        flex 
                                        justify-center 
                                        items-center
                                        touch-none
                                    `}
                                    style={{
                                        zIndex: isTop ? 2 : 1,
                                        touchAction: 'none',
                                        transform: to(
                                            [props.x, props.y, props.rotation],
                                            (x, y, r) => `translate3d(${isTop ? x : 0}px,${isTop ? y : 15}px,0) rotate(${isTop ? r : 0}deg) scale(${isTop ? 1 : 0.98})`
                                        ),
                                    }}
                                >
                                    <DeckCard
                                        data={card}
                                        bind={isTop ? bind() : undefined}
                                        dragStatus={isTop ? dragStatus : 'neutral'}
                                        className="w-full h-full bg-common-white"
                                    />
                                </animated.div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="flex justify-center space-x-4 shrink-0">
                <DisLikeButton className="active:scale-95" onClick={() => handleButtonSwipe('left')}/>
                <LikeButton className="active:scale-95" onClick={() => handleButtonSwipe('right')}/>
            </div>
        </div>
    );
});

Deck.displayName = 'Deck';

export default Deck;