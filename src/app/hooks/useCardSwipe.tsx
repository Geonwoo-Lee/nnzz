import { useState, useCallback, useEffect } from 'react'
import { useSpring } from '@react-spring/web'
import { FoodItem } from '../component/deck/Deck'

export type DragStatus = 'like' | 'dislike' | 'neutral';

export function useCardSwipe(cards: FoodItem[]) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [props, api] = useSpring(() => ({ x: 0, y: 0, rotation: 0 }))
    const [likedCards, setLikedCards] = useState<FoodItem[]>([])
    const [dislikedCards, setDislikedCards] = useState<FoodItem[]>([])
    const [isFinished, setIsFinished] = useState(false)
    const [dragStatus, setDragStatus] = useState<DragStatus>('neutral')

    useEffect(() => {
        if (currentIndex === cards.length) {
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
    }, [currentIndex, cards])

    const updateDragStatus = useCallback((x: number) => {
        const threshold = 50; // 이 값을 조정하여 like/dislike 구간의 민감도를 변경할 수 있습니다
        if (x > threshold) {
            setDragStatus('like')
        } else if (x < -threshold) {
            setDragStatus('dislike')
        } else {
            setDragStatus('neutral')
        }
    }, [])

    const bind = useCallback(() => ({
        onMouseDown: (e: React.MouseEvent) => {
            e.preventDefault();
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
                    api.start({
                        x: direction * 500,
                        y: 0,
                        rotation: direction * 15
                    })
                    setTimeout(() => {
                        handleSwipe(direction)
                        api.start({ x: 0, y: 0, rotation: 0, immediate: true })
                        setDragStatus('neutral')
                    }, 200)
                } else {
                    api.start({ x: 0, y: 0, rotation: 0 })
                    setDragStatus('neutral')
                }
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        },
        onTouchStart: (e: React.TouchEvent) => {
            e.preventDefault();
            const touch = e.touches[0]
            const startX = touch.clientX
            const startY = touch.clientY

            const onTouchMove = (e: TouchEvent) => {
                e.preventDefault();
                const touch = e.touches[0]
                const dx = touch.clientX - startX
                const dy = touch.clientY - startY

                const rotation = dx > 0 ? Math.min(15, dx / 10) : Math.max(-15, dx / 10)
                api.start({ x: dx, y: dy, rotation })
                updateDragStatus(dx)
            }

            const onTouchEnd = () => {
                document.removeEventListener('touchmove', onTouchMove)
                document.removeEventListener('touchend', onTouchEnd)

                if (Math.abs(props.x.get()) > 100) {
                    const direction = props.x.get() < 0 ? -1 : 1
                    api.start({
                        x: direction * 500,
                        y: 0,
                        rotation: direction * 15
                    })
                    setTimeout(() => {
                        handleSwipe(direction)
                        api.start({ x: 0, y: 0, rotation: 0, immediate: true })
                        setDragStatus('neutral')
                    }, 200)
                } else {
                    api.start({ x: 0, y: 0, rotation: 0 })
                    setDragStatus('neutral')
                }
            }

            document.addEventListener('touchmove', onTouchMove, { passive: false })
            document.addEventListener('touchend', onTouchEnd)
        }
    }), [api, props.x, handleSwipe, updateDragStatus])

    return {
        currentCard: currentIndex < cards.length ? cards[currentIndex] : null,
        props,
        bind,
        isFinished,
        likedCards,
        dislikedCards,
        dragStatus
    }
}