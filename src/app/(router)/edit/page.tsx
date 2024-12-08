'use client'
import AuthUtils from "@/src/app/func/common/auth.utils";
import React, {useEffect, useMemo, useState} from "react";
import {FoodProfileType, genderAgeType, SignInType, SignUpController} from "@/src/app/types/page/sign-up/sign-up";
import ProfileImageComponent from "@/src/app/component/client/page/sign-up/features/ProfileComponet/ProfileImageComponent";
import {Controller, useForm} from "react-hook-form";
import Input from "@/src/app/component/client/common/input/Input";
import Close from "@/public/svg/header/InputClose.svg";
import DownArrow from "@/public/svg/items/common/DownArrow.svg";
import GenderAgeBottomSheet
    from "@/src/app/component/client/page/sign-up/features/genderAgeComponent/GenderAgeBottomSheet";
import UpdateUserApi from "@/src/app/api/client/update-user/update";
import {useToast} from "@/src/app/core/ToastProvider";
import {ToastAlign, ToastPosition} from "@/src/app/types/common/toast";

import Edit from '@/public/svg/items/common/edit.svg'

const DEFAULT_IMAGE: FoodProfileType = {
    id: 0,
    name: 'default',
    src: `/images/food/food-profile/Default.png`
} as const;

const EditPage = () => {
    const userInfo = AuthUtils.getUserInfo() || {} as SignInType;
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false)
    const [focused, setFocused] = useState(false);
    const {control,watch, setValue} = useForm<SignUpController>({
        defaultValues: {
            nickname: '',
                genderAge: {
                    gender: '',
                    age: '',
                },
            profileImage: {} as FoodProfileType
        }
    });
    const showToast = useToast()

    const validateNickname = (value: string) => {
        if (value.length < 2) {
            setErrorMessage('닉네임은 2자 이상 입력해주세요');
            return false;
        }
        if (value.length > 10) {
            setErrorMessage('닉네임은 10자 이하로 입력해주세요');
            return false;
        }
        if (value.includes(' ')) {
            setErrorMessage('닉네임은 띄어쓰기 없이 한글, 영문, 숫자 입력만 가능해요');
            return false;
        }
        if (!/^[a-zA-Z0-9가-힣]+$/.test(value)) {
            setErrorMessage('닉네임은 띄어쓰기 없이 한글, 영문, 숫자 입력만 가능해요');
            return false;
        }
        setErrorMessage('');
        return true
    };

    const nicknameValue = watch('nickname');
    const genderValue = watch('genderAge');
    const profileImageValue = watch('profileImage');

    const closeModal = () => {
        setOpen(false)
    }

    const openModal = () => {
        setOpen(true)
    }

    const setGenderAge = (value: string | genderAgeType['gender'], type: 'gender' | 'age') => {
        const currentValue = control._getWatch('genderAge');
        setValue('genderAge', {
            ...currentValue,
            [type]: value
        });
    }

    const upDateUserInfo = async (type: 'nickname' | 'profileImage' | 'gender' ) => {
        const params = {
            nickname: nicknameValue,
            gender: genderValue.gender,
            ageRange: genderValue.age,
            profileImage: profileImageValue.id.toString()
        }
          const response = await UpdateUserApi.updateUser(params);
          if (response.status === 200) {
              AuthUtils.setUserInfo({
                nickname: nicknameValue,
                gender: genderValue.gender,
                age: genderValue.age,
                profileImage: profileImageValue
              });
              switch (type) {
                  case "gender": showToast('나이대, 성별 변경이 완료됐어요', ToastPosition.BOTTOM, ToastAlign.CENTER); break
                  case "nickname": showToast('닉네임 변경이 완료됐어요', ToastPosition.BOTTOM, ToastAlign.CENTER);break
                  case "profileImage": showToast('평점 변경이 완료됐어요', ToastPosition.BOTTOM, ToastAlign.CENTER);break
              }
          }
        }

        const upDateProfileImage = async (image: FoodProfileType) => {
            await setValue('profileImage', image)
            upDateUserInfo('profileImage')
        }


    const profileInfo = useMemo(() => {
        if (!userInfo?.profileImage) return DEFAULT_IMAGE;
        return userInfo.profileImage;
    }, [userInfo.profileImage]);

    const rightRenderer = (value: string, callback: () => void) => {
        if(!focused) {
            return <Edit/>
        }else {
            if(value.length > 0) {
                return  <Close onClick={callback}/>
            }
        }
    }

    useEffect(() => {
        if(userInfo) {
            setValue('nickname', userInfo.nickname);
            setValue('genderAge', {
                gender: userInfo.gender || '',
                age: userInfo.age || ''
            });
            setValue('profileImage', profileInfo);
        }
    }, []);

    return (
        <div className='h-basic-body-with-header'>
            <div className='px-5'>
                <div className='pt-6 w-full flex justify-center items-center flex-col gap-6'>
                    <div className='flex flex-col gap-3'>
                        <ProfileImageComponent
                            userInfoImage={profileInfo}
                            isSetting
                            callback={upDateProfileImage}
                        />
                        <div className='text-center text-title2 font-bold'>
                            {userInfo.nickname}
                        </div>
                    </div>
                </div>
                <div className='pt-6' />
                <div>
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
                                        onBlur={() => {
                                            setFocused(false)
                                        }}
                                        onFocus={() => {
                                            setFocused(true)
                                        }}
                                        placeHolder="닉네임을 최소 2자 이상 입력해주세요"
                                        label='닉네임'
                                        right={rightRenderer(nicknameValue, () => field.onChange(''))}
                                        onSubmit={() => {
                                            if(validateNickname(nicknameValue)) {
                                                upDateUserInfo('gender')
                                            }
                                        }}

                                        error={fieldState.error || errorMessage.length > 0}
                                        errorMessage={errorMessage || fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>
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
                                                value={genderValue.age || genderValue.gender ? `${genderValue.gender} ・ ${genderValue.age}` : ''}
                                                right={<DownArrow/>}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <GenderAgeBottomSheet setSelectedValue={setGenderAge} stepAble={false}
                                              control={control} callback={() => {
                            upDateUserInfo('gender')
                        }}
                                              open={open} onClose={closeModal} genderAgeValue={genderValue}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPage;