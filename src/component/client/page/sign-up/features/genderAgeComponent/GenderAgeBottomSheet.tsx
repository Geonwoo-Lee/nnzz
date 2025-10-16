import BottomSheet from "@/src/component/client/common/bottomSheet/BottomSheet";
import {GenderAgeBottomSheetProps} from "@/src/types/page/sign-up/sign-up";
import GenderAgeSelectWrap from "@/src/component/client/page/sign-up/features/genderAgeComponent/GenderAgeSelectWrap";
import Close from "@/public/svg/header/Close.svg";
import Button from "../../../../common/button/Button";

const GenderAgeBottomSheet = (props: GenderAgeBottomSheetProps) => {
    const {open, onClose, genderAgeValue, setSelectedValue, stepAble, step, setStep, callback} = props

    const nextStep = () => {
        if (stepAble && setStep) {
            step === 3 ? onClose() : setStep(3)
            return
        }

        callback?.()
    }

    const isButtonDisabled = genderAgeValue.age === '' || genderAgeValue.gender === ''

    return (
        <BottomSheet open={open} close={onClose} nonPadding={true}>
            <div>
                <div className='flex flex-col'>
                    <div className='pt-3 px-2 text-center relative text-text-2 font-medium text-title2 h-[48px]'>
                        성별 ・ 나이대 선택
                        <Close className='absolute right-[8px] top-[12px]' onClick={onClose}/>
                    </div>
                    <GenderAgeSelectWrap
                        type='gender'
                        selectedValue={genderAgeValue.gender}
                        selectList={['남', '여', '선택안함']}
                        setSelectedValue={setSelectedValue}
                    />
                    <GenderAgeSelectWrap
                        type='age'
                        selectedValue={genderAgeValue.age}
                        selectList={['10대', '20대', '30대', '40대', '50대', '60대 이상']}
                        setSelectedValue={setSelectedValue}
                    />
                </div>
                <div className='p-4'>
                    <Button
                        onClick={nextStep}
                        disabled={isButtonDisabled}
                        type={'primary'}
                        size={'lg'}
                        style='w-full'
                    >
                        다음
                    </Button>
                </div>
            </div>
        </BottomSheet>
    )
}

export default GenderAgeBottomSheet