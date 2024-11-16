import dynamic from "next/dynamic";
import {Suspense} from "react";
import FastChoiceClientPage from "@/src/app/component/client/page/fast-choice/FastChoiceClientPage";

const FastChoicePage = ({
                            params,
                        }: {
    params: { meal: string }
}) => {
    const mealRenderer = () => {
        switch (params.meal) {
            case 'lunch' : return '점심'
            case 'dinner': return '저녁'
        }
    }

    const Loading = dynamic(() => import('../../../component/client/common/loading/Loading'), {
        ssr: false,
        loading: () => <div>Loading...</div>
    })


    return (
        <div className="relative h-screen">
            <div className="h-fast-choice-height overflow-auto">
                <div className='px-4 pt-4 pb-9 flex flex-col items-center justify-center gap-4'>
                    <div className='text-text-1 font-semibold text-title2'>
                        냠냠님의 오늘의 {mealRenderer()}픽은?
                    </div>
                    <div className='text-text-3 font-medium text-body1'>
                        오늘 왠지 끌리는 음식을 골라봐요.
                    </div>
                    <Suspense fallback={<Loading/>} >
                        <FastChoiceClientPage/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default FastChoicePage