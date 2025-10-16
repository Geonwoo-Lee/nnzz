import {Controller} from "react-hook-form";
import Input from "@/src/component/client/common/input/Input";
import React, {useState} from "react";
import DownArrow from '../../../../../../../public/svg/items/common/DownArrow.svg'
import {GenderAgePageProps, genderAgeType} from "@/src/types/page/sign-up/sign-up";
import GenderAgeBottomSheet from "@/src/component/client/page/sign-up/features/genderAgeComponent/GenderAgeBottomSheet";


const GenderAgePage = (props: GenderAgePageProps) => {
    const {genderAgeValue, control, step, setStep, setValue} = props
    const [open, setOpen] = useState(false)

    const setGenderAge = (value: string | genderAgeType['gender'], type: 'gender' | 'age') => {
        const currentValue = control._getWatch('genderAge');
        setValue('genderAge', {
            ...currentValue,
            [type]: value
        });
    }

    const closeModal = () => {
        setOpen(false)
    }

    const openModal = () => {
        setOpen(true)
    }

    return <div className='p-4 flex flex-col'>
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-8'>
                    <Controller
                        name="genderAge.age"
                        control={control}
                        render={({field}) => (
                            <Input
                                {...field}
                                autoFocus
                                style="w-full"
                                placeHolder="성별과 나이대를 선택해주세요"
                                label='성별 · 나이대'
                                selectVersion
                                onClick={openModal}
                                value={genderAgeValue.age || genderAgeValue.gender ? `${genderAgeValue.gender} ・ ${genderAgeValue.age}` : ''}
                                right={<DownArrow/>}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
        <GenderAgeBottomSheet stepAble={true} setSelectedValue={setGenderAge} setStep={setStep} step={step} control={control}
                              open={open} onClose={closeModal} genderAgeValue={genderAgeValue}/>
    </div>
}

export default GenderAgePage