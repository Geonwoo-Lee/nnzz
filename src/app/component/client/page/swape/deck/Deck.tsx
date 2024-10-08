'use client'
import React, {  useRef } from 'react'
import Card from "@/src/app/component/client/common/card/Card";
import { useCardSwipe } from "@/src/app/hooks/useCardSwipe";
import { animated, to } from '@react-spring/web'
import ResultCard from "@/src/app/component/client/common/card/ResultCard";
import {DeckProps} from "@/src/app/types/component/swape/deck";



const Deck: React.FC<DeckProps> = ({ cards, setStep }) => {
    const deckRef = useRef<HTMLDivElement>(null);
    const { currentIndex, props, bind, isFinished, likedCards, dragStatus, handleButtonSwipe } = useCardSwipe(cards);

    if (isFinished) {
        if(setStep) {
            setTimeout(() => {
                setStep('2')
            }, 10)
        }
        return (
            <div className='flex flex-col gap-4 w-full overflow-y-scroll'>
                <div className='text-xl font-normal text-black text-center'>
                    좋아하는 음식들이에요
                </div>
                <div className="flex flex-row flex-wrap gap-2 justify-center">
                    {likedCards.map((el, index) => (
                        <ResultCard
                            image={el.imageUrl}
                            category={el.category}
                            name={el.name}
                            priceRange={el.priceRange}
                            key={`liked-${index}`}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div ref={deckRef} className="relative w-full h-full">
                {cards.slice(currentIndex, currentIndex + 2).map((card, i) => {
                    const isTop = i === 0;
                    return (
                        <animated.div
                            key={card.id}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: isTop ? 2 : 1,
                                transform: to(
                                    [props.x, props.y, props.rotation],
                                    (x, y, r) => `translate3d(${isTop ? x : 0}px,${isTop ? y : 0}px,0) rotate(${isTop ? r : 0}deg)`
                                ),
                            }}
                        >
                            <Card
                                image={card.imageUrl}
                                category={card.category}
                                name={card.name}
                                priceRange={card.priceRange}
                                bind={isTop ? bind() : undefined}
                                dragStatus={isTop ? dragStatus : 'neutral'}
                                className="w-full h-full max-w-[100vw] max-h-[100vh] md:max-w-[80vw] md:max-h-[60vh] bg-white"
                            />
                        </animated.div>
                    );
                })}
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 z-10">
                <button
                    className="bg-white text-white px-4 py-2 rounded-full text-xl font-bold shadow-lg transition-colors"
                    onClick={() => handleButtonSwipe('left')}
                >
                    💔
                </button>
                <button
                    className="bg-white text-white px-4 py-2 rounded-full text-xl font-bold shadow-lg  transition-colors"
                    onClick={() => handleButtonSwipe('right')}
                >
                    ❤️
                </button>
            </div>
        </div>
    );
}

export default Deck