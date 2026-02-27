import {NickNamePageProps} from "@/src/types/page/sign-up/sign-up";
import {Controller} from "react-hook-form";
import Input from "@/src/component/client/common/input/Input";
import Close from "@/src/svg/header/InputClose"
import React  from "react";

const NickNamePage = (props: NickNamePageProps) => {
    const { setStep, control, validateNickname, errorMessage} = props


    return <div className='p-4 flex flex-col'>
        <div className='flex flex-col gap-6'>
                <div>
                    <Controller
                        name="nickname"
                        control={control}
                        rules={{
                            validate: validateNickname
                        }}
                        render={({field, fieldState}) => (
                            <Input
                                {...field}
                                autoFocus
                                style="w-full"
                                placeHolder="닉네임을 최소 2자 이상 입력해주세요"
                                label='닉네임'
                                right={field.value.length > 0 && <Close onClick={() => field.onChange('')}/>}
                                onSubmit={() => {
                                    if (validateNickname(field.value)) {
                                        setStep(2)
                                    }
                                }}
                                error={fieldState.error || errorMessage.length > 0}
                                errorMessage={errorMessage || fieldState.error?.message}
                            />
                        )}
                    />
                </div>
        </div>
    </div>
}

export default NickNamePage