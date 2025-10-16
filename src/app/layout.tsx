import type {Metadata, Viewport} from "next";
import "./globals.css";
import {GoogleAnalytics} from '@next/third-parties/google'
import Script from "next/script";
import React from "react";
import {pretendard} from "@/src/utils/font/font";
import process from "process";
import ClientProviders from "@/src/provider/ClientProvider";
import SplashScreen from "@/src/component/client/page/splash/SplashScreen";

export const viewport: Viewport = {
    themeColor: '#fff',
    userScalable: false,
};

const ga4Id = process.env.GA_ID;

export const metadata: Metadata = {
    manifest: "/manifest.json",
    title: '냠냠쩝쩝 - 직장인 점심 저녁 메뉴 고민 해결',
    description: '냠냠쩝쩝에서 직장인들의 점심, 저녁 메뉴 고민을 함께 해결해드려요! 매일 다양한 메뉴 추천으로 식사 고민 끝! 🧚‍♀️',
    keywords: [
        '냠냠쩝쩝',
        '점심 메뉴',
        '저녁 메뉴',
        '직장인 식사',
        '메뉴 추천',
        '오늘 뭐먹지',
        '식사 고민',
        'NNZZ',
        '메뉴 고민',
        '점심 추천',
        '저녁 추천'
    ],
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ||
            'http://localhost:3000'
    ),
    openGraph: {
        title: "냠냠쩝쩝",
        description: "맛있는 솔루션",
        url: 'https://www.nnzz.today',
        type: 'website',
        siteName: "냠냠쩝쩝",
        images: [
            {
                url: "/icon/app-icon-512x512.png",
                width: 512,
                height: 512,
                alt: "nnzz 로고",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '냠냠쩝쩝 - 직장인 점심 저녁 메뉴 고민 해결',
        description: '냠냠쩝쩝에서 직장인들의 점심, 저녁 메뉴 고민을 함께 해결해드려요! 🧚‍♀️',
        images: ["/icon/app-icon-512x512.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://www.nnzz.today',
    },
    icons: {
        icon: [
            {url: "/favicon.ico", sizes: "any"},
            {url: "/icon/app-icon-24x24.png", sizes: "24x24", type: "image/png"},
            {url: "/icon/app-icon-48x48.png", sizes: "48x48", type: "image/png"},
            {url: "/icon/app-icon-72x72.png", sizes: "72x72", type: "image/png"},
            {url: "/icon/app-icon-96x96.png", sizes: "96x96", type: "image/png"},
            {url: "/icon/app-icon-128x128.png", sizes: "128x128", type: "image/png"},
            {url: "/icon/app-icon-192x192.png", sizes: "192x192", type: "image/png"},
            {url: "/icon/app-icon-384x384.png", sizes: "384x384", type: "image/png"},
            {url: "/icon/app-icon-512x512.png", sizes: "512x512", type: "image/png"},
        ],
        apple: [
            {url: "/icon/app-icon-192x192.png", sizes: "192x192", type: "image/png"},
        ],
    },
    appleWebApp: {
        title: "냠냠쩝쩝",
        statusBarStyle: "default",
        capable: true,
    },

    applicationName: "냠냠쩝쩝",
    formatDetection: {
        telephone: false,
    },
    other: {
        "apple-mobile-web-app-capable": "yes",
        "mobile-web-app-capable": "yes",
    },
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="ko">
        <head>
            <Script id="fb-pixel" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '1741376476675737');
                    fbq('track', 'PageView');
                `}
            </Script>
            <Script
                id="schema-org"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "nnzz",
                        "url": "https://www.nnzz.today",
                        "description": "맛있는 솔루션",
                    })
                }}
            />
            <meta name="naver-site-verification" content="dde16215ae14b67451a5c33bbb6bf1f4491cabad"/>
            <meta name="google-site-verification" content="YMuxFpB_F05-z5Qnkz3P__CZUTm8JTXHXi3qkXdqtWM"/>
            <meta name="google-adsense-account" content="ca-pub-7391340913390710"/>
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{display: 'none'}}
                    src="https://www.facebook.com/tr?id=1741376476675737&ev=PageView&noscript=1"
                    alt=""
                />
            </noscript>
        </head>
        <body
            data-theme="light"
            className={`${pretendard.variable} font-pretendard bg-common-white w-full max-w-[640px] mx-auto overflow-hidden"`}
        >
        <ClientProviders>
                    {children}
        </ClientProviders>

        <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="lazyOnload"
        />
        <GoogleAnalytics gaId={ga4Id ? ga4Id : ""}/>
        </body>
        </html>
    );
}