'use client'
import { useEffect, useRef } from "react";

type AdType = 'display' | 'in-article';

interface AdBannerProps {
  slot: string;
  type?: AdType;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdBanner({
                                   slot,
                                   type = 'display',
                                   style,
                                   className
                                 }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (isAdPushed.current) return;

    const pushAd = () => {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isAdPushed.current = true;
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    };

    const timer = setTimeout(pushAd, 100);

    return () => {
      clearTimeout(timer);
      isAdPushed.current = false;
    };
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          minHeight: type === 'in-article' ? '100px' : '70px'
        }}
      >
        Ad Placeholder ({type === 'in-article' ? '기사 내' : '수평형'})
      </div>
    );
  }

  if (type === 'in-article') {
    return (
      <ins
        ref={adRef}
        className={`adsbygoogle ${className || ''}`}
        style={{ display: 'block', textAlign: 'center', ...style }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-7391340913390710"
        data-ad-slot={slot}
      />
    );
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className || ''}`}
      style={{ display: 'block', ...style }}
      data-ad-client="ca-pub-7391340913390710"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}