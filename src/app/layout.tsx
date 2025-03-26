// src/app/layout.tsx
import type {Metadata, Viewport} from "next";
import "./globals.css";
import {GoogleAnalytics} from '@next/third-parties/google'
import Script from "next/script";
import dynamic from "next/dynamic";
import React from "react";
import {pretendard} from "@/src/app/utils/font/font";
import process from "process";

export const viewport: Viewport = {
    themeColor: '#fff',
    userScalable: false,
};

const ga4Id = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
    manifest: "/manifest.json",
    title: "nnzz",
    description: "맛있는 솔루션",
    openGraph: {
        title: "nnzz",
        description: "맛있는 솔루션",
        url: "https://www.nnzz.today",
        siteName: "nnzz",
        images: [
            {
                url: "/icon/app-icon-512x512.png",
                width: 512,
                height: 512,
                alt: "nnzz 로고",
            },
        ],
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
        title: "nnzz",
        statusBarStyle: "default",
        capable: true,
    },

    applicationName: "nnzz",
    keywords: ["맛있는", "솔루션", "점심", "저녁", "메뉴", "고민"],
    formatDetection: {
        telephone: false,
    },
    other: {
        "apple-mobile-web-app-capable": "yes",
        "mobile-web-app-capable": "yes",
    },
};

const ToastProvider = dynamic(() => import('./core/ToastProvider'))

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const ReactQueryProvider = dynamic(
        () => import("../app/provider/ReactQueryProvider"),
        {ssr: false}
    );
    const SplashScreen = dynamic(
        () => import("@/src/app/component/client/page/splash/SplashScreen"),
        {ssr: false}
    );


    const AuthProvider = dynamic(() => import('@/src/app/provider/AuthProvider'), {ssr: false});

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
            <meta name="naver-site-verification" content="b8b44acfbf4b794834769776d1b9b8cb37b41721"/>
            <meta name="google-site-verification" content="1QKRvTlM8LTU89RcO5TjN7IrwiUGdj8OT5QFmps9dKU"/>
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
        <ReactQueryProvider>
            <ToastProvider>
                <AuthProvider>
                    <SplashScreen>{children}</SplashScreen>
                </AuthProvider>
            </ToastProvider>
        </ReactQueryProvider>
        <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="lazyOnload"
        />
        <GoogleAnalytics gaId={ga4Id ? ga4Id : ""}/>
        </body>
        </html>
    );
}