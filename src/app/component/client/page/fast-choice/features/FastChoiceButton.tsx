import Button from "../../../common/button/Button"
import ProgressBar from "@/src/app/component/client/common/progressBar/ProgressBar";
import {FastChoiceButtonProps} from "@/src/app/types/page/fast-choice/fast-choice";


const FastChoiceButton = (props: FastChoiceButtonProps) => {
    const {step, onClick} = props
    return (
        <div className="fixed bottom-0 left-0 right-0 h-[199px] bg-white px-4 max-w-[640px] mx-auto">
            <div className='pt-4'>
                <ProgressBar minRequired={5}  beforeMinText={'최소 5개 카드를 고르면 메뉴 추천 받을 수 있어요 🙂'} afterMinText={'이제 점심 메뉴를 추천 받을 수 있어요!'} currentStep={step} totalStep={15} leftCount={true} />
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