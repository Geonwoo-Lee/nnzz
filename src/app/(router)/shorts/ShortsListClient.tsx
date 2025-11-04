// app/(router)/shorts/ShortsListClient.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import useShortsQuery from '@/src/hooks/useShortsQuery'
import ShortsPlayer from '@/src/component/client/shorts/ShortsPlayer'

export default function ShortsListClient() {
  const shorts = useShortsQuery()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const startTime = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || shorts.length <= 1) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        scrollToIndex(currentIndex - 1)
      } else if (e.key === 'ArrowDown' && currentIndex < shorts.length - 1) {
        scrollToIndex(currentIndex + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, shorts.length, mounted])

  useEffect(() => {
    if (!mounted || shorts.length <= 1) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const now = Date.now()
      if (now - startTime.current < 500) return
      startTime.current = now

      if (e.deltaY > 0 && currentIndex < shorts.length - 1) {
        scrollToIndex(currentIndex + 1)
      } else if (e.deltaY < 0 && currentIndex > 0) {
        scrollToIndex(currentIndex - 1)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [currentIndex, shorts.length, mounted])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (shorts.length <= 1) return
    startY.current = e.touches[0].clientY
    startTime.current = Date.now()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (shorts.length <= 1) return

    const endY = e.changedTouches[0].clientY
    const diff = startY.current - endY
    const timeDiff = Date.now() - startTime.current

    const isFastSwipe = timeDiff < 300 && Math.abs(diff) > 30
    const isLongSwipe = Math.abs(diff) > 100

    if (isFastSwipe || isLongSwipe) {
      if (diff > 0 && currentIndex < shorts.length - 1) {
        scrollToIndex(currentIndex + 1)
      } else if (diff < 0 && currentIndex > 0) {
        scrollToIndex(currentIndex - 1)
      }
    }
  }

  const scrollToIndex = (index: number) => {
    const container = containerRef.current
    if (!container) return

    const headerHeight = 60
    const targetScroll = index * (window.innerHeight - headerHeight)
    container.scrollTo({ top: targetScroll, behavior: 'smooth' })
    setCurrentIndex(index)
  }

  if (!mounted || !shorts.length) {
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
        style={{ height: 'calc(100vh - 60px)' }}
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
      ref={containerRef}
      className="overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      style={{ height: 'calc(100vh - 60px)' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {shorts.map((short, index) => (
        <ShortsPlayer
          key={short.id}
          data={short}
          isActive={currentIndex === index}
          onVisible={() => setCurrentIndex(index)}
        />
      ))}

    </div>
  )
}