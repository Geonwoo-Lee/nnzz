import {HeaderTypes} from "@/src/types/common/header";
import {ReactNode} from "react";
import {Metadata} from "next";
import BottomMenuLayout from "@/src/component/layout/BottomMenuLayout";

export const metadata: Metadata = {
  title: '냠냠쩝쩝',
  description: '직장인을 위한 진짜 맛집 리뷰! 점심 메뉴 고민 끝, 주변 맛집 추천과 솔직한 후기를 확인하세요.',
  keywords: [
    '맛집',
    '맛집 추천',
    '맛집 리뷰',
    '점심 메뉴',
    '저녁 메뉴',
    '직장인 맛집',
    '근처 맛집',
    '음식점 추천',
    '냠냠쩝쩝',
    '식당 리뷰',
    '오늘 뭐 먹지',
    '점심 추천',
    '회사 근처 맛집'
  ],
  openGraph: {
    title: '맛집 리뷰 - 냠냠쩝쩝',
    description: '직장인을 위한 진짜 맛집 리뷰! 점심 메뉴 고민 끝, 주변 맛집 추천과 솔직한 후기를 확인하세요.',
    url: 'https://www.nnzz.today/blog/list',
    type: 'website',
    siteName: '냠냠쩝쩝',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://www.nnzz.today/og-blog-image.png',
        width: 1200,
        height: 630,
        alt: '냠냠쩝쩝 맛집 리뷰',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '맛집 리뷰 - 냠냠쩝쩝',
    description: '직장인을 위한 진짜 맛집 리뷰! 오늘 점심 뭐 먹지? 🍽️',
    images: ['https://www.nnzz.today/og-blog-image.png'],
  },
  alternates: {
    canonical: 'https://www.nnzz.today/blog/list',
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
}

const BlogLayout = ({children}: {children: ReactNode}) => {
  return <BottomMenuLayout header={true} headerTitle={''}  profileImage={true} logo={false} logoBlack={true} headerType={HeaderTypes.basic} >
    {children}
  </BottomMenuLayout>
}

export default BlogLayout