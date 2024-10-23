import {NickNamePageProps} from "@/src/app/types/page/sign-up/sign-up";
import {Controller} from "react-hook-form";
import Input from "@/src/app/component/client/common/input/Input";
import Close from "../../../../../../../../public/svg/header/InputClose.svg"
import React, {useState} from "react";

const NickNamePage = (props: NickNamePageProps) => {
    const { setStep, control, setError} = props
    const [errorMessage, setErrorMessage] = useState('');

    const validateNickname = (value: string) => {
        if (value.length < 2) {
            setErrorMessage('닉네임은 2자 이상 입력해주세요');
            setError(true);
            return false;
        }
        if (value.length > 10) {
            setErrorMessage('닉네임은 10자 이하로 입력해주세요');
            setError(true);
            return false;
        }
        if (value.includes(' ')) {
            setErrorMessage('닉네임은 띄어쓰기 없이 한글, 영문, 숫자 입력만 가능해요');
            setError(true);
            return false;
        }
        if (!/^[a-zA-Z0-9가-힣]+$/.test(value)) {
            setErrorMessage('닉네임은 띄어쓰기 없이 한글, 영문, 숫자 입력만 가능해요');
            setError(true);
            return false;
        }
        setError(false);
        setErrorMessage('');
        return true;
    };


    return <div className='p-4 flex flex-col'>
        <div className='flex flex-col gap-6'>
                <div>
                    <Controller
                        name="nickName"
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