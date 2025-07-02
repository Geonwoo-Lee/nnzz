import {Metadata} from "next";
import {ReactNode} from "react";
import BasicLayout from "@/src/app/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/app/types/common/header";


export const metadata: Metadata = {
    title: '새 장소 요청하기 - 냠냠쩝쩝',
    description: '아직 지원하지 않는 지역이 있나요? 냠냠쩝쩝에 새로운 장소를 요청해주세요! 빠르게 서비스 지역을 확장해나가겠습니다.',
    keywords: [
        '냠냠쩝쩝',
        '장소 요청',
        '새 지역',
        '서비스 확장',
        '지역 추가',
        '요청하기',
        '미지원 지역',
        '서비스 개선',
        '피드백',
        '건의사항'
    ],

    openGraph: {
        title: '새 장소 요청하기 - 냠냠쩝쩝',
        description: '아직 지원하지 않는 지역이 있나요? 냠냠쩝쩝에 새로운 장소를 요청해주세요! 빠르게 서비스 지역을 확장해나가겠습니다.',
        url: 'https://www.nnzz.today/location-request',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: '새 장소 요청하기 - 냠냠쩝쩝',
        description: '아직 지원하지 않는 지역이 있나요? 새로운 장소를 요청해주세요! 🗺️',
    },

    alternates: {
        canonical: 'https://www.nnzz.today/location-request',
    },
}

const LocationRequestLayout = ({children}: {children: ReactNode}) => {

    return <>
        {children}
    </>
}

export default LocationRequestLayout