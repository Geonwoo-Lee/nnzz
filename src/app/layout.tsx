import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "nnzz",
    description: "배고픈 여러분!🤗 냠냠쩝쩝은 여러분의 점심 고민을 해결해 줄 쩝쩝 박사들의 사이드 프로젝트에요 !",
    openGraph: {
        title: "nnzz",
        description: "배고픈 여러분!🤗 냠냠쩝쩝은 여러분의 점심 고민을 해결해 줄 쩝쩝 박사들의 사이드 프로젝트에요 !",
        url: "https://www.nnzz.today",
        siteName: "nnzz",
        images: [
            {
                url: "/icon/app-icon-330x430.png",
                width: 330,
                height: 430,
                alt: "nnzz 로고",
            },
        ],
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
            { url: "/icon/app-icon-84x108.png", sizes: "84x108", type: "image/png" },
            { url: "/icon/app-icon-124x162.png", sizes: "124x162", type: "image/png" },
            { url: "/icon/app-icon-248x323.png", sizes: "248x323", type: "image/png" },
            { url: "/icon/app-icon-329x429.png", sizes: "329x429", type: "image/png" },
            { url: "/icon/app-icon-330x430.png", sizes: "330x430", type: "image/png" },
        ],
        shortcut: ["/favicon.ico"],
        apple: [
            { url: "/icon/app-icon-330x430.png", sizes: "330x430", type: "image/png" },
        ],
    },
    manifest: "/manifest.json",
    appleWebApp: {
        title: "nnzz",
        statusBarStyle: "default",
        capable: true,
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
            <link rel="icon" href="/favicon.ico" type="image/png" />
        </head>
        <body data-theme="light" className="font-poppins w-full max-w-[640px] mx-auto overflow-hidden">
        {children}
        </body>
        </html>
    );
}