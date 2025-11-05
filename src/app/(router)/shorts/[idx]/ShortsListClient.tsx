'use client'

import { useRef, useState, useEffect } from 'react'
import useShortsQuery from '@/src/hooks/useShortsQuery'
import ShortsPlayer from '@/src/component/client/shorts/ShortsPlayer'

export default function ShortsListClient() {
  const shorts = useShortsQuery()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isReallyDragging, setIsReallyDragging] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const currentY = useRef(0)
  const startTime = useRef(0)
  const hasMoved = useRef(false)

  const headerHeight = 60

  useEffect(() => {
    const updateViewportHeight = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Kindle|Silk|Mobile|Tablet/i.test(navigator.userAgent)

      if (isMobile) {
        const height = window.visualViewport
          ? window.visualViewport.height
          : window.innerHeight
        setViewportHeight(height - headerHeight)
      } else {
        setViewportHeight(window.innerHeight - headerHeight)
      }
    }

    updateViewportHeight()
    setMounted(true)

    window.addEventListener('resize', updateViewportHeight)
    window.addEventListener('orientationchange', updateViewportHeight)

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight)
      window.visualViewport.addEventListener('scroll', updateViewportHeight)
    }

    return () => {
      window.removeEventListener('resize', updateViewportHeight)
      window.removeEventListener('orientationchange', updateViewportHeight)

      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportHeight)
        window.visualViewport.removeEventListener('scroll', updateViewportHeight)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted || shorts.length <= 1) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        goToIndex(currentIndex - 1)
      } else if (e.key === 'ArrowDown' && currentIndex < shorts.length - 1) {
        goToIndex(currentIndex + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, shorts.length, mounted])

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      handleDragMove(e.clientY)
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return
      handleDragEnd(e.clientY)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isReallyDragging, currentIndex, shorts.length, mounted])

  const handleDragStart = (clientY: number) => {
    if (shorts.length <= 1) return

    startY.current = clientY
    currentY.current = clientY
    startTime.current = Date.now()
    hasMoved.current = false
    setIsDragging(true)
    setIsReallyDragging(false)
  }

  const handleDragMove = (clientY: number) => {
    if (!isDragging || shorts.length <= 1) return

    currentY.current = clientY
    const diff = currentY.current - startY.current

    if (Math.abs(diff) > 10 && !isReallyDragging) {
      setIsReallyDragging(true)
      hasMoved.current = true
    }

    if (isReallyDragging) {
      let limitedDiff = diff
      if (currentIndex === 0 && diff > 0) {
        limitedDiff = diff * 0.3
      } else if (currentIndex === shorts.length - 1 && diff < 0) {
        limitedDiff = diff * 0.3
      }

      setDragY(limitedDiff)
    }
  }

  const handleDragEnd = (clientY: number) => {
    if (!isDragging || shorts.length <= 1) return

    const diff = startY.current - clientY
    const timeDiff = Date.now() - startTime.current

    if (!hasMoved.current) {
      setIsDragging(false)
      setIsReallyDragging(false)
      setDragY(0)
      return
    }

    const dragDistance = Math.abs(diff)
    const dragPercent = (dragDistance / viewportHeight) * 100

    const isFastSwipe = timeDiff < 300 && dragDistance > 50
    const isHalfPassed = dragPercent >= 50

    if (isFastSwipe || isHalfPassed) {
      if (diff > 0 && currentIndex < shorts.length - 1) {
        goToIndex(currentIndex + 1)
      } else if (diff < 0 && currentIndex > 0) {
        goToIndex(currentIndex - 1)
      } else {
        resetPosition()
      }
    } else {
      resetPosition()
    }

    setIsDragging(false)
    setIsReallyDragging(false)
    hasMoved.current = false
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    // preventDefault 제거 - touch-action: none으로 대체
    handleDragMove(e.touches[0].clientY)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleDragEnd(e.changedTouches[0].clientY)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('a') || target.closest('.no-drag')) {
      return
    }

    e.preventDefault()
    handleDragStart(e.clientY)
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
    setDragY(0)
  }

  const resetPosition = () => {
    setDragY(0)
  }

  if (!mounted || !shorts.length || viewportHeight === 0) {
    return (
      <div
        className="flex items-center justify-center bg-black"
        style={{ height: 'calc(100vh - 60px)' }}
      >
        <p className="text-white">
          {!mounted ? 'Loading...' : 'No shorts available'}
        </p>
      </div>
    )
  }

  if (shorts.length === 1) {
    return (
      <div
        className="bg-black"
        style={{ height: `${viewportHeight}px` }}
      >
        <ShortsPlayer
          data={shorts[0]}
          isActive={true}
          onVisible={() => {}}
        />
      </div>
    )
  }

  return (
    <div
      className="relative bg-black overflow-hidden"
      style={{
        height: `${viewportHeight}px`,
        cursor: isReallyDragging ? 'grabbing' : 'grab',
        touchAction: 'none', // 이게 핵심!
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{
          transform: `translateY(${-currentIndex * viewportHeight + dragY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          userSelect: isReallyDragging ? 'none' : 'auto',
          WebkitUserSelect: isReallyDragging ? 'none' : 'auto',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {shorts.map((short, index) => (
          <div
            key={short.id}
            className="absolute top-0 left-0 w-full"
            style={{
              transform: `translateY(${index * viewportHeight}px)`,
              height: `${viewportHeight}px`,
              pointerEvents: isReallyDragging ? 'none' : 'auto',
            }}
          >
            <ShortsPlayer
              data={short}
              isActive={currentIndex === index}
              onVisible={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  )
}