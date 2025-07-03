'use client'
import { useEffect } from "react";

interface AdBannerProps {
    slot: string;
    format?: string;
    style?: React.CSSProperties;
    className?: string;
}

export default function AdBanner({ slot, format = "auto", style, className }: AdBannerProps) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={className}>
            <div className="text-center text-xs text-gray-400">광고</div>
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