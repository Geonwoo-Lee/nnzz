'use client'
import { use } from 'react'
import FastChoiceClientPage from "@/src/component/client/page/fast-choice/FastChoiceClientPage";
import DateUtils from "@/src/func/common/date.utils";

const FastChoicePage = ({
                            params,
                        }: {
    params: Promise<{ type: string, day: string }>
}) => {
    const { type, day } = use(params);

    return (
        <div className="relative h-full overflow-y-hidden">
            <FastChoiceClientPage
                type={type}
                day={day}
                menu={DateUtils.mealRenderer(type)}
            />
        </div>
    )
}

export default FastChoicePage