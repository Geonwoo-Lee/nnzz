import Button from "../../../common/button/Button"
import ProgressBar from "@/src/component/client/common/progressBar/ProgressBar";
import {FastChoiceButtonProps} from "@/src/types/page/fast-choice/fast-choice";
import DateUtils from "@/src/func/common/date.utils";


const FastChoiceButton = (props: FastChoiceButtonProps) => {
    const {step, onClick, type} = props
    return (
        <div className="fixed bottom-0 left-0 right-0 h-[199px] bg-white px-4 max-w-[640px] mx-auto">
            <div className='pt-4'>
                <ProgressBar minRequired={3}  beforeMinText={'최소 3개 카드를 고르면 메뉴 추천 받을 수 있어요 🙂'} afterMinText={`이제 ${DateUtils.mealRenderer(type)} 메뉴를 추천 받을 수 있어요!`} currentStep={step} totalStep={15} leftCount={true} />
            </div>
            <div className='pt-4 pb-12'>
                <Button type='primary' disabled={step < 3} onClick={onClick} size='lg' style='w-full'>
                    식당 정보 보러가기
                </Button>
            </div>
        </div>
    )
}

export default FastChoiceButton