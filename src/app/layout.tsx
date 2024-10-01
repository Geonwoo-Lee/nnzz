// src/app/layout.tsx
import type {Metadata, Viewport} from "next";
import "./globals.css";
import Script from "next/script";
import dynamic from "next/dynamic";
import React from "react";
import {pretendard} from "@/src/app/utils/font/font";

export const viewport: Viewport = {
    themeColor: '#fff',
}

export const metadata: Metadata = {
    manifest: "/manifest.json",
    title: "nnzz",
    description: "맛있는 솔루션",
    themeColor: "#ffffff",
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
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon/app-icon-24x24.png", sizes: "24x24", type: "image/png" },
            { url: "/icon/app-icon-48x48.png", sizes: "48x48", type: "image/png" },
            { url: "/icon/app-icon-72x72.png", sizes: "72x72", type: "image/png" },
            { url: "/icon/app-icon-96x96.png", sizes: "96x96", type: "image/png" },
            { url: "/icon/app-icon-128x128.png", sizes: "128x128", type: "image/png" },
            { url: "/icon/app-icon-192x192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon/app-icon-384x384.png", sizes: "384x384", type: "image/png" },
            { url: "/icon/app-icon-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [
            { url: "/icon/app-icon-192x192.png", sizes: "192x192", type: "image/png" },
        ],
    },
    appleWebApp: {
        title: "nnzz",
        statusBarStyle: "default",
        capable: true,
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const ReactQueryProvider = dynamic(() => import('../app/provider/ReactQueryProvider'), {ssr: false});
    const SplashScreen = dynamic(() => import('../app/component/page/splash/SplashScreen'), {ssr: false});
    return (
        <html lang="ko">
        <body data-theme="light" className={`${pretendard.variable} font-pretendard w-full max-w-[640px] mx-auto overflow-hidden"`}>
        <ReactQueryProvider>
            <SplashScreen>
            {children}
            </SplashScreen>
        </ReactQueryProvider>
        <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="lazyOnload"
        />
        </body>
        </html>
    );
}