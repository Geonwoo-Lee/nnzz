import {Metadata} from "next";
import {ReactNode} from "react";


export const metadata: Metadata = {
    title: '랜덤 메뉴 추천 - 냠냠쩝쩝',
    description: '고민하지 마세요! 냠냠쩝쩝이 랜덤으로 완벽한 메뉴를 추천해드려요. 오늘은 어떤 놀라운 메뉴를 만나게 될까요?',
    keywords: [
        '냠냠쩝쩝',
        '랜덤 메뉴',
        '메뉴 추천',
        '랜덤 추천',
        '오늘 뭐먹지',
        '운에 맡기기',
        '메뉴 선택',
        '깜짝 메뉴',
        '랜덤 선택',
        '메뉴 고민 해결'
    ],

    openGraph: {
        title: '랜덤 메뉴 추천 - 냠냠쩝쩝',
        description: '고민하지 마세요! 냠냠쩝쩝이 랜덤으로 완벽한 메뉴를 추천해드려요. 오늘은 어떤 놀라운 메뉴를 만나게 될까요?',
        url: 'https://www.nnzz.today/random',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: '랜덤 메뉴 추천 - 냠냠쩝쩝',
        description: '고민하지 마세요! 랜덤으로 완벽한 메뉴를 추천해드려요! 🎲',
    },

    alternates: {
        canonical: 'https://www.nnzz.today/random',
    },
}


const RandomLayout = ({children}: {children: ReactNode}) => {
    return < >
        {children}
    </>
}

export default RandomLayout