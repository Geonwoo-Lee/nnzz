import FastChoiceClientPage from "@/src/app/component/client/page/fast-choice/FastChoiceClientPage";
import DateUtils from "@/src/app/func/common/date.utils";


const FastChoicePage = ({
                            params,
                        }: {
    params: { type: string, day: string; }
}) => {


    return (
        <div className="relative h-full overflow-y-hidden">
            <FastChoiceClientPage type={params.type} day={params.day} menu={DateUtils.mealRenderer(params.type)}/>
        </div>
    )
}

export default FastChoicePage