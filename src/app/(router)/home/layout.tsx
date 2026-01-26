import {HeaderTypes} from "@/src/types/common/header";
import {ReactNode} from "react";
import {Metadata} from "next";
import BottomMenuLayout from "@/src/component/layout/BottomMenuLayout";


export const metadata: Metadata = {
    title: '메뉴 선택하기 - 냠냠쩝쩝',
    description: '날짜, 시간, 장소를 선택하고 완벽한 메뉴를 추천받아보세요! 냠냠쩝쩝에서 맞춤형 식사 추천을 경험해보세요.',
    keywords: [
        '냠냠쩝쩝',
        '메뉴 선택',
        '맞춤 추천',
        '날짜 선택',
        '시간 선택',
        '장소 선택',
        '개인화 메뉴',
        '직장인 식사',
        '점심 시간',
        '저녁 시간'
    ],

    openGraph: {
        title: '메뉴 선택하기 - 냠냠쩝쩝',
        description: '날짜, 시간, 장소를 선택하고 완벽한 메뉴를 추천받아보세요! 냠냠쩝쩝에서 맞춤형 식사 추천을 경험해보세요.',
        url: 'https://www.nnzz.today/home',
        type: 'website',
        siteName: '냠냠쩝쩝',
        locale: 'ko_KR',
        images: [
            {
                url: '/icon/OgImage.png',
                width: 1200,
                height: 630,
                alt: '냠냠쩝쩝 메뉴 선택',
            }
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: '메뉴 선택하기 - 냠냠쩝쩝',
        description: '날짜, 시간, 장소를 선택하고 완벽한 메뉴를 추천받아보세요! 🍽️',
        images: ['/icon/OgImage.png'],
    },

    alternates: {
        canonical: 'https://www.nnzz.today/home',
    },
}

const HomeLayout = ({children}: {children: ReactNode}) => {
    return <BottomMenuLayout headerBg='#ff334c' header={true} headerTitle={''}  profileImage={true} logo={true} headerType={HeaderTypes.basic} >
        {children}
    </BottomMenuLayout>
}

export default HomeLayout