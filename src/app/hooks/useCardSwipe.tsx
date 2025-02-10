import { useState, useCallback, useEffect  } from 'react'
import { useSpring } from '@react-spring/web'
import {FoodItem} from "@/src/app/types/models/food";
import {BindType} from "@/src/app/types/hook/cardSwipte";

export type DragStatus = 'like' | 'dislike' | 'neutral';

export function useCardSwipe(cards: FoodItem[],) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [props, api] = useSpring(() => ({ x: 0, y: 0, rotation: 0 }))
    const [likedCards, setLikedCards] = useState<FoodItem[]>([])
    const [dislikedCards, setDislikedCards] = useState<FoodItem[]>([])
    const [isFinished, setIsFinished] = useState(false)
    const [dragStatus, setDragStatus] = useState<DragStatus>('neutral')
    const [cardCounts, setCardCounts] = useState({ liked: 0, disliked: 0 })

    useEffect(() => {
        setCardCounts({
            liked: likedCards.length,
            disliked: dislikedCards.length
        })
    }, [likedCards, dislikedCards])

    useEffect(() => {
        if(cards.length === 0) {
            return
        }
        if (currentIndex >= 30) {
            setIsFinished(true)
        }
    }, [currentIndex, cards.length])

    const handleSwipe = useCallback((direction: number) => {
        const currentCard = cards[currentIndex]
        if (direction > 0) {
            setLikedCards(prev => [...prev, currentCard])
        } else {
            setDislikedCards(prev => [...prev, currentCard])
        }
        setCurrentIndex(prevIndex => prevIndex + 1)

        api.start({ x: 0, y: 0, rotation: 0, immediate: true })
        setDragStatus('neutral')
    }, [currentIndex, cards, api])

    const handleButtonSwipe = useCallback((direction: 'left' | 'right') => {
        const currentCard = cards[currentIndex]
        const xMove = direction === 'right' ? 500 : -500

        api.start({
            x: xMove,
            rotation: direction === 'right' ? 15 : -15,
            config: { duration: 300 },
            onRest: () => {
                if (direction === 'right') {
                    setLikedCards(prev => [...prev, currentCard])
                } else {
                    setDislikedCards(prev => [...prev, currentCard])
                }
                setCurrentIndex(prevIndex => prevIndex + 1)
                api.start({ x: 0, y: 0, rotation: 0, immediate: true })
                setDragStatus('neutral')
            }
        })
    }, [currentIndex, cards, api])

    const updateDragStatus = useCallback((x: number) => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        const threshold = isMobile ? 30 : 50;

        if (x > threshold) {
            setDragStatus('like');
        } else if (x < -threshold) {
            setDragStatus('dislike');
        } else {
            setDragStatus('neutral');
        }
    }, []);

    const bind = useCallback((): BindType => ({
        onMouseDown: (e: React.MouseEvent) => {
            const startX = e.clientX
            const startY = e.clientY

            const onMouseMove = (e: MouseEvent) => {
                const dx = e.clientX - startX
                const dy = e.clientY - startY
                const rotation = dx > 0 ? Math.min(15, dx / 10) : Math.max(-15, dx / 10)
                api.start({ x: dx, y: dy, rotation })
                updateDragStatus(dx)
            }

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)

                if (Math.abs(props.x.get()) > 100) {
                    const direction = props.x.get() < 0 ? -1 : 1
                    handleSwipe(direction)
                } else {
                    api.start({
                        x: 0,
                        y: 0,
                        rotation: 0,
                        config: { tension: 200, friction: 20 }
                    })
                    setDragStatus('neutral')
                }
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        },
        onTouchStart: (e: React.TouchEvent) => {
            const target = e.target as HTMLElement;
            const touch = e.touches[0];
            const startX = touch.clientX;
            const startY = touch.clientY;

            const onTouchMove = (e: Event) => {
                e.stopPropagation();
                const touchEvent = e as TouchEvent;
                const touch = touchEvent.touches[0];
                const dx = touch.clientX - startX;
                const dy = touch.clientY - startY;
                const rotation = dx > 0 ? Math.min(15, dx / 10) : Math.max(-15, dx / 10);

                api.start({
                    x: dx,
                    y: dy,
                    rotation,
                    immediate: true
                });
                updateDragStatus(dx);
            };

            const onTouchEnd = (e: Event) => {
                e.stopPropagation();

                target.removeEventListener('touchmove', onTouchMove, { capture: true });
                target.removeEventListener('touchend', onTouchEnd, { capture: true });

                const currentX = props.x.get();

                if (Math.abs(currentX) > 100) {
                    const moveOut = currentX > 0 ? 500 : -500;
                    api.start({
                        x: moveOut,
                        rotation: currentX > 0 ? 15 : -15,
                        config: { duration: 300 },
                        onRest: () => {
                            const direction = currentX > 0 ? 1 : -1;
                            handleSwipe(direction);
                        }
                    });
                } else {
                    api.start({
                        x: 0,
                        y: 0,
                        rotation: 0,
                        config: { tension: 20, friction: 10 }
                    });
                    setDragStatus('neutral');
                }
            };

            target.addEventListener('touchmove', onTouchMove, {
                passive: false,
                capture: true
            });

            target.addEventListener('touchend', onTouchEnd, {
                passive: false,
                capture: true
            });

            return () => {
                target.removeEventListener('touchmove', onTouchMove)
                document.removeEventListener('touchend', onTouchEnd)
            }
        }
    }), [api, props.x, handleSwipe, updateDragStatus])

    return {
        currentIndex,
        props,
        bind,
        isFinished,
        likedCards,
        dislikedCards,
        dragStatus,
        handleButtonSwipe,
        cardCounts
    }
}