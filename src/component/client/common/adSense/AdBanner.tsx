'use client'
import { useEffect, useState, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdBanner({ slot, format = "auto", style, className }: AdBannerProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const [shouldShow, setShouldShow] = useState(!isDevelopment);
  const adRef = useRef<HTMLDivElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    if (isDevelopment) {
      setShouldShow(false);
      return;
    }

    if (isAdPushed.current) return;

    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        const ins = adRef.current?.querySelector('ins');
        const adStatus = ins?.getAttribute('data-adsbygoogle-status');

        if (adStatus === 'done') {
          isAdPushed.current = true;
          return;
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;

        const checkTimer = setTimeout(() => {
          const ins = adRef.current?.querySelector('ins');
          const status = ins?.getAttribute('data-adsbygoogle-status');

          if (!status || status === 'unfilled') {
            console.log('Ad failed to load, hiding banner');
            setShouldShow(false);
          }
        }, 3000);

        return () => clearTimeout(checkTimer);
      } else {
        setShouldShow(false);
      }
    } catch (err) {
      console.error('AdSense error:', err);
      setShouldShow(false);
    }

    return () => {
      isAdPushed.current = false;
    };
  }, [isDevelopment]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-7391340913390710"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}