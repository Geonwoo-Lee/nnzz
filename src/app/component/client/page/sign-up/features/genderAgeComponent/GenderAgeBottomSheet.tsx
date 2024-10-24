import BottomSheet from "@/src/app/component/client/common/bottomSheet/BottomSheet";
import {GenderAgeBottomSheetProps} from "@/src/app/types/page/sign-up/sign-up";
import GenderAgeSelectWrap from "@/src/app/component/client/page/sign-up/features/genderAgeComponent/GenderAgeSelectWrap";
import Close from "@/public/svg/header/Close.svg";
import Button from "../../../../common/button/Button";


const GenderAgeBottomSheet = (props: GenderAgeBottomSheetProps) => {
    const {open, onClose, genderAgeValue, setSelectedValue, setStep, step} = props


    const nextStep = () => {
        if(step ===3) {
            onClose()
        }else {
            setStep(3)
        }
    }
    return (
        <BottomSheet open={open} close={onClose} nonPadding={true}>
            <div>
                <div className='flex flex-col'>
                    <div className='pt-3 px-2 text-center relative text-text-2 font-semibold text-title2 h-[48px]'>
                        성별 ・ 나이대 선택
                        <Close className='absolute right-[8px] top-[12px]' onClick={onClose}/>
                    </div>
                    <GenderAgeSelectWrap type='gender' selectedValue={genderAgeValue.gender}
                                         selectList={['남', '여', '선택안함']}
                                         setSelectedValue={setSelectedValue}/>
                    <GenderAgeSelectWrap type='age' selectedValue={genderAgeValue.age}
                                         selectList={['10대', '20대', '30대', '40대', '50대', '60대 이상']}
                                         setSelectedValue={setSelectedValue}/>
                </div>
                <div className='p-4'>
                    <Button onClick={nextStep} disabled={genderAgeValue.age === '' || genderAgeValue.gender === ''} type={'primary'} size={'lg'} style='w-full' >
                        다음
                    </Button>
                </div>
            </div>
        </BottomSheet>
    )
}

export default GenderAgeBottomSheet