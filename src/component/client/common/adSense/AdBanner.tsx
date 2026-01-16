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
  const [shouldShow, setShouldShow] = useState(true); // 기본값을 true로 변경

  useEffect(() => {
    // 클라이언트에서 프로덕션 환경 확인
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isProduction = !isDev;

    console.log(`[AdBanner v3 slot:${slot}] hostname: ${window.location.hostname}, isDev: ${isDev}, isProduction: ${isProduction}`);

    if (!isProduction) {
      console.log(`[AdBanner v3 slot:${slot}] 개발 환경이므로 광고 표시 안함`);
      setShouldShow(false);
      return;
    }

    if (isAdPushed.current) {
      console.log(`[AdBanner v3 slot:${slot}] 이미 push됨, 스킵`);
      return;
    }

    let checkInterval: NodeJS.Timeout;
    let checkCount = 0;
    const maxChecks = 10; // 최대 5초 체크 (500ms * 10)

    const pushAd = () => {
      try {
        if (typeof window === 'undefined') {
          console.log(`[AdBanner v3 slot:${slot}] window 없음`);
          setShouldShow(false);
          return;
        }

        if (!adRef.current) {
          console.log(`[AdBanner v3 slot:${slot}] adRef 없음`);
          setShouldShow(false);
          return;
        }

        console.log(`[AdBanner v3 slot:${slot}] 광고 push 시작`);
        console.log(`[AdBanner v3 slot:${slot}] adRef innerHTML:`, adRef.current.innerHTML.substring(0, 100));

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;

        checkInterval = setInterval(() => {
          checkCount++;

          if (adRef.current) {
            const adStatus = adRef.current.getAttribute('data-adsbygoogle-status');
            const hasContent = adRef.current.innerHTML !== '';
            const childCount = adRef.current.children.length;

            console.log(`[AdBanner v3 slot:${slot}] 체크 ${checkCount}/${maxChecks} - status:${adStatus}, hasContent:${hasContent}, childCount:${childCount}, innerHTML length:${adRef.current.innerHTML.length}`);

            if (adStatus === 'done') {
              if (hasContent && childCount > 0) {
                console.log(`[AdBanner v3 slot:${slot}] ✅ 광고 로드 성공`);
                setShouldShow(true);
              } else {
                console.log(`[AdBanner v3 slot:${slot}] ❌ 광고 로드 실패 - 빈 콘텐츠 (AdSense가 광고를 채우지 못함)`);
                setShouldShow(false);
              }
              clearInterval(checkInterval);
            } else if (checkCount >= maxChecks) {
              console.log(`[AdBanner v3 slot:${slot}] ⏱️ 최대 체크 횟수 도달 - 광고 로드 실패`);
              setShouldShow(false);
              clearInterval(checkInterval);
            }
          }
        }, 500);

      } catch (err) {
        console.error(`[AdBanner v3 slot:${slot}] ❌ error:`, err);
        setShouldShow(false);
      }
    };

    const initTimer = setTimeout(pushAd, 100);

    const loadTimeout = setTimeout(() => {
      console.log(`[AdBanner v3 slot:${slot}] ⏱️ 전체 타임아웃 도달`);
      if (checkInterval) clearInterval(checkInterval);
    }, timeout);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(loadTimeout);
      if (checkInterval) clearInterval(checkInterval);
      isAdPushed.current = false;
    };
  }, [slot, timeout]);

  if (!shouldShow) {
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