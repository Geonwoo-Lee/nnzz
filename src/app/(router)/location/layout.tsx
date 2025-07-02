import BasicLayout from "@/src/app/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/app/types/common/header";
import {ReactNode} from "react";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: '내 위치 설정 - 냠냠쩝쩝',
    description: '지도에서 현재 위치를 확인하거나 원하는 장소를 검색해보세요. 냠냠쩝쩝이 주변 맛집을 추천해드려요!',
    keywords: [
        '냠냠쩝쩝',
        '위치 설정',
        '내 위치',
        '장소 검색',
        '지도',
        '주변 맛집',
        '위치 기반',
        '근처 식당',
        '맛집 찾기',
        'GPS 위치'
    ],

    openGraph: {
        title: '내 위치 설정 - 냠냠쩝쩝',
        description: '지도에서 현재 위치를 확인하거나 원하는 장소를 검색해보세요. 냠냠쩝쩝이 주변 맛집을 추천해드려요!',
        url: 'https://www.nnzz.today/location',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: '내 위치 설정 - 냠냠쩝쩝',
        description: '지도에서 현재 위치를 확인하거나 원하는 장소를 검색해보세요! 📍',
    },

    alternates: {
        canonical: 'https://www.nnzz.today/location',
    },
}

const LocationLayout = ({children}: {children: ReactNode}) => {

    return <BasicLayout header={true} headerTitle={'현재 위치 설정'}  profileImage={false} logo={false} headerType={HeaderTypes.history} >
        {children}
    </BasicLayout>
}

export default LocationLayout