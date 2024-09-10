'use client'
import React, { useEffect } from 'react'
import Card from "@/src/app/component/card/Card";
import { useCardSwipe } from "@/src/app/hooks/useCardSwipe";
import { animated } from '@react-spring/web'
import ResultCard from "@/src/app/component/card/ResultCard";

export interface FoodItem {
    id: number;
    imageUrl: string;
    category: string;
    name: string;
    priceRange: string;
}

interface DeckProps {
    cards: FoodItem[];
}

const Deck: React.FC<DeckProps> = ({ cards }) => {
    const { currentCard, props, bind, isFinished, likedCards, dislikedCards, dragStatus } = useCardSwipe(cards);

    useEffect(() => {
        if (isFinished) {
            console.log("All cards have been swiped!");
            console.log("Liked cards:", likedCards);
            console.log("Disliked cards:", dislikedCards);
        }
    }, [isFinished, likedCards, dislikedCards]);



    if (isFinished) {
        return <div className='flex flex-col gap-4'>
            <div className='text-xl font-normal text-black text-center'>
                좋아하는 음식들이에요
            </div>
            <div className="flex flex-row flex-wrap gap-2">
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
        </div>;
    }

    return (
        <div style={{ position: 'relative', width: '300px', height: '400px', margin: '0 auto' }}>
            {currentCard && (
                <animated.div style={{
                    ...props,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    transform: props.rotation.to(r => `rotate(${r}deg)`)
                }}>
                    <Card
                        image={currentCard.imageUrl}
                        category={currentCard.category}
                        name={currentCard.name}
                        priceRange={currentCard.priceRange}
                        bind={bind}
                        dragStatus={dragStatus}
                    />
                </animated.div>
            )}
        </div>
    );
}

export default Deck