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
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
      >
        {children}
      </body>
    </html>
  );
}
