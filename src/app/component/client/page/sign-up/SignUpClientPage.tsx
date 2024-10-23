'use client'

import {useForm} from "react-hook-form";
import {SignUpController} from "@/src/app/types/page/sign-up/sign-up";
import SignUpComponent from "@/src/app/component/client/page/sign-up/features/SignUpComponent";
import {useNestedFunnel} from "@/src/app/hooks/useNestedFunnel";
import React, { useState} from "react";
import Button from "@/src/app/component/client/common/button/Button";
import {useRouter} from "next/navigation";

const SignUpClientPage = () => {
    const router = useRouter()
    const {
        Funnel,
        currentStep,
        nextStep,
        goToStep
    } = useNestedFunnel(1);
    const [validateError, setValidateError] = useState(false);

    const {control,  watch, setValue} = useForm<SignUpController>({
        defaultValues: {
            nickName: '',
            genderAge: {
                gender: '',
                age: ''
            }
        }
    });

    const setError = (errState: boolean) => {
        setValidateError(errState)
    }


    const nickNameValue = watch('nickName')
    const genderAgeValue = watch('genderAge')

    const setStep = (step: number) => {
        goToStep(step)
    }

    const disableNextStep = () => {
        if(currentStep === 1){
            return false
        }
        if(currentStep === 2){
            if(genderAgeValue.age.length === 0) {
                return true
            }else {
                return false
            }
        }
        if(currentStep === 3){
            return false
        }
    }

    const headerRenderer = () => {
        switch (currentStep) {
            case 1:
                return <div className=' w-full flex flex-col items-center py-6 text-title1 font-bold text-text-1'>
                    <div>
                        냠냠쩝쩝
                    </div>
                    <div>
                        닉네임을 만들어주세요!
                    </div>
                </div>
            case 2:
                return <div className=' w-full flex flex-col items-center py-6 text-title1 font-bold text-text-1'>
                    성별과 나이대를 알려주세요.
                </div>
            case 3: return <div className=' w-full flex flex-col items-center py-6 text-title1 font-bold text-text-1'>
                    프로필 이미지를 선택해주세요!
                </div>
        }
    }

    return (
        <main className='p-4 flex flex-col justify-between h-[100vh]'>
            <div>
                {headerRenderer()}
                <Funnel reverse={true}>
                    <Funnel.Step>
                        <SignUpComponent.NickNamePage
                            setValue={setValue}
                            nickNameValue={nickNameValue}
                            control={control}
                            setStep={setStep}
                            step={currentStep}
                            setError={setError}
                        />
                    </Funnel.Step>
                    <Funnel.Step>
                        <SignUpComponent.GenderAgePage
                            setValue={setValue}
                            genderAgeValue={genderAgeValue}
                            step={currentStep}
                            setStep={setStep}
                            control={control}
                        />
                    </Funnel.Step>
                    <Funnel.Step>
                        <SignUpComponent.ProfileImageComponent/>
                    </Funnel.Step>
                </Funnel>
            </div>
            <div className='py-4 w-full'>
                <Button disabled={disableNextStep()} onClick={() => {
                    if(currentStep === 1 ) {
                        if (!validateError) {
                            setStep(2)
                        }
                    }else if(currentStep === 2) {
                        nextStep()
                    }else {
                        router.push('/sign-up/complete')
                    }
                }} style='w-full' type='primary' size='lg'>
                    다음
                </Button>
            </div>
        </main>
    );
}

export default SignUpClientPage;