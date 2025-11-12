'use client'
import { useEffect, useRef, useState } from "react";

type AdType = 'display' | 'in-article';

interface AdBannerProps {
  slot: string;
  type?: AdType;
  style?: React.CSSProperties;
  className?: string;
  timeout?: number;
}

export default function AdBanner({
                                   slot,
                                   type = 'display',
                                   style,
                                   className,
                                   timeout = 3000
                                 }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      setIsLoading(false);
      return;
    }

    if (isAdPushed.current) return;

    let checkInterval: NodeJS.Timeout;

    const pushAd = () => {
      try {
        if (typeof window === 'undefined' || !adRef.current) {
          setIsLoading(false);
          return;
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;

        checkInterval = setInterval(() => {
          if (adRef.current) {
            const adStatus = adRef.current.getAttribute('data-adsbygoogle-status');
            const ins = adRef.current.querySelector('ins');

            if (adStatus === 'done' && ins && ins.innerHTML !== '') {
              setShouldShow(true);
              setIsLoading(false);
              clearInterval(checkInterval);
            }
            else if (adStatus === 'done' && (!ins || ins.innerHTML === '')) {
              setShouldShow(false);
              setIsLoading(false);
              clearInterval(checkInterval);
            }
          }
        }, 500);

      } catch (err) {
        console.error('AdSense error:', err);
        setShouldShow(false);
        setIsLoading(false);
      }
    };

    const initTimer = setTimeout(pushAd, 100);

    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        setShouldShow(false);
        setIsLoading(false);
        clearInterval(checkInterval);
      }
    }, timeout);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(loadTimeout);
      clearInterval(checkInterval);
      isAdPushed.current = false;
    };
  }, [timeout, isLoading]);

  if (process.env.NODE_ENV !== 'production' || !shouldShow) {
    return null;
  }

  if (type === 'in-article') {
    return (
      <div className="ad-container">
        <ins
          ref={adRef}
          className={`adsbygoogle ${className || ''}`}
          style={{ display: 'block', textAlign: 'center', ...style }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-7391340913390710"
          data-ad-slot={slot}
        />
      </div>
    );
  }

  return (
    <div className="ad-container">
      <ins
        ref={adRef}
        className={`adsbygoogle ${className || ''}`}
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-7391340913390710"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}