import Button from "../../../common/button/Button"
import ProgressBar from "@/src/app/component/client/common/progressBar/ProgressBar";
import {FastChoiceButtonProps} from "@/src/app/types/page/fast-choice/fast-choice";


const FastChoiceButton = (props: FastChoiceButtonProps) => {
    const {step, onClick} = props
    return (
        <div className="fixed bottom-0 left-0 right-0 h-[199px] bg-white px-4 max-w-[640px] mx-auto">
            <div className='pt-4'>
                <ProgressBar currentStep={step} totalStep={15} leftCount={true} />
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