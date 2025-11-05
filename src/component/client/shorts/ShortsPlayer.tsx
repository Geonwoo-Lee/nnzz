'use client'

import { useRef, useEffect, useState } from 'react'
import { TShorts } from '@/src/types/common/notion'
import { Play, Pause, Volume2, VolumeX, Share2 } from 'lucide-react'

interface ShortsPlayerProps {
  data: TShorts
  isActive: boolean
  onVisible: () => void
}

function getYouTubeVideoId(url: string): string | null {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function getVideoType(url?: string): 'youtube' | 'other' {
  if (!url) return 'other'
  return url.includes('youtube.com') || url.includes('youtu.be') ? 'youtube' : 'other'
}

function checkMobile(): boolean {
  if (typeof window === 'undefined') return false

  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Kindle|Silk|Mobile|Tablet/i
  const isMobileUA = mobileRegex.test(navigator.userAgent)
  const isSmallScreen = window.innerWidth <= 768

  return isMobileUA && isSmallScreen
}

export default function ShortsPlayer({ data, isActive, onVisible }: ShortsPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playPauseTimerRef = useRef<NodeJS.Timeout>()

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const videoType = getVideoType(data.videoUrl)
  const youtubeVideoId = videoType === 'youtube' ? getYouTubeVideoId(data.videoUrl || '') : null

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkMobile())
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            onVisible()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [onVisible])

  useEffect(() => {
    if (videoType !== 'youtube' || !iframeRef.current || !youtubeVideoId) return

    const command = isActive ? 'playVideo' : 'pauseVideo'

    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: command,
          args: ''
        }),
        '*'
      )
    }, 100)

    setIsPlaying(isActive)
  }, [isActive, videoType, youtubeVideoId])

  useEffect(() => {
    if (videoType !== 'other' || !videoRef.current) return

    if (isActive) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isActive, videoType])

  const togglePlay = () => {
    if (videoType === 'youtube' && iframeRef.current) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo'
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: command,
          args: ''
        }),
        '*'
      )
      setIsPlaying(!isPlaying)
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }

    setShowPlayPauseIcon(true)
    setIsAnimatingOut(false)

    if (playPauseTimerRef.current) {
      clearTimeout(playPauseTimerRef.current)
    }

    playPauseTimerRef.current = setTimeout(() => {
      setIsAnimatingOut(true)
      setTimeout(() => {
        setShowPlayPauseIcon(false)
        setIsAnimatingOut(false)
      }, 300)
    }, 700)
  }

  const toggleMute = () => {
    if (videoType === 'youtube' && iframeRef.current) {
      const command = isMuted ? 'unMute' : 'mute'
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: command,
          args: ''
        }),
        '*'
      )
      setIsMuted(!isMuted)
    } else if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const heightUnit = isMobile ? 'dvh' : 'vh'
  const containerHeight = `calc(100${heightUnit} - 60px)`

  return (
    <div
      ref={containerRef}
      className="relative w-full snap-start snap-always bg-black overflow-hidden"
      style={{
        height: containerHeight,
        minHeight: containerHeight,
      }}
    >
      {videoType === 'youtube' && youtubeVideoId ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* 9:16 비율 비디오 컨테이너 */}
          <div
            className="relative"
            style={{
              aspectRatio: '9 / 16',
              height: '100%',
              minWidth: '100%',
            }}
          >
            <iframe
              ref={iframeRef}
              className="absolute inset-0"
              style={{
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
              }}
              src={`https://www.youtube.com/embed/${youtubeVideoId}?
                enablejsapi=1
                &autoplay=${isActive ? 1 : 0}
                &mute=1
                &controls=0
                &disablekb=1
                &fs=0
                &iv_load_policy=3
                &modestbranding=1
                &rel=0
                &showinfo=0
                &playsinline=1
                &loop=1
                &playlist=${youtubeVideoId}
                &origin=${typeof window !== 'undefined' ? window.location.origin : ''}
              `.replace(/\s/g, '')}
              allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={data.videoUrl}
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          loop
          playsInline
          muted={isMuted}
          preload="metadata"
        />
      )}

      <div
        className="absolute inset-0 z-10"
        onClick={togglePlay}
      />

      {showPlayPauseIcon && (
        <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none ${isAnimatingOut ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
          <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white" />
            ) : (
              <Play className="w-10 h-10 text-white ml-1" />
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 pb-4 px-4 pt-16 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20 pointer-events-none">
        <h2 className="text-white text-lg font-bold mb-1 line-clamp-2">
          {data.title}
        </h2>
        {data.summary && (
          <p className="text-white/90 text-sm line-clamp-2 mb-2">
            {data.summary}
          </p>
        )}
        {data.category && data.category.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {data.category.map((cat, idx) => (
              <span
                key={idx}
                className="text-xs text-white/80 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="absolute right-3 bottom-24 flex flex-col gap-6 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleMute()
          }}
          className="flex flex-col items-center gap-1 pointer-events-auto group"
        >
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-all group-hover:bg-black/60 group-hover:scale-110">
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </div>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="flex flex-col items-center gap-1 pointer-events-auto group"
        >
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-all group-hover:bg-black/60 group-hover:scale-110">
            <Share2 className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>
    </div>
  )
}