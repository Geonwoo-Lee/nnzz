'use client'
import AuthUtils from "@/src/func/common/auth.utils";
import React, {useEffect, useMemo, useState} from "react";
import {
    FoodProfileType,
    genderAgeType,
    SignInType,
    SignUpController
} from "@/src/types/page/sign-up/sign-up";
import ProfileImageComponent from "@/src/component/client/page/sign-up/features/ProfileComponet/ProfileImageComponent";
import {Controller, useForm} from "react-hook-form";
import Input from "@/src/component/client/common/input/Input";
import Close from "@/public/svg/header/InputClose.svg";
import DownArrow from "@/public/svg/items/common/DownArrow.svg";
import GenderAgeBottomSheet
    from "@/src/component/client/page/sign-up/features/genderAgeComponent/GenderAgeBottomSheet";
import {useToast} from "@/src/core/ToastProvider";
import {ToastAlign, ToastPosition} from "@/src/types/common/toast";
import Edit from '../../../../public/svg/items/common/Edit.svg'
import Button from '@/src/component/client/common/button/Button'
import DeleteApi from "@/src/app/api/client/delete/delete";
import UpdateUserApi from "@/src/app/api/client/update-user/update";

const DEFAULT_IMAGE: FoodProfileType = {
    id: 0,
    name: 'default',
    src: `/images/food/food-profile/Default.png`
} as const;

const EditPage = () => {
    const userInfo = useMemo(() => {
        return AuthUtils.getUserInfo() || {} as SignInType;
    }, []);

    const [isInitialized, setIsInitialized] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false)
    const [focused, setFocused] = useState(false);
    const {control, watch, setValue} = useForm<SignUpController>({
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

    const deleteUser = () => {
        const accessToken = AuthUtils.getToken()?.accessToken;
        if (!accessToken) {
            return;
        }

        DeleteApi.DeleteUser(accessToken).then(() => {
            AuthUtils.removeUserInfo();
            AuthUtils.removeToken();
            window.location.href = '/';
        });
    }

    const upDateUserInfo = async (type: 'nickname' | 'profileImage' | 'gender', profile?: FoodProfileType) => {
        if (profile) {
            setValue('profileImage', profile);
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        const params = {
            nickname: nicknameValue,
            gender: genderValue.gender,
            ageRange: genderValue.age,
            profileImage: watch('profileImage').id.toString()
        }

        closeModal();
        try {
            switch (type) {
                case "nickname":
                    await UpdateUserApi.updateUser(params, 'nickname');
                    break;
                case "profileImage":
                    await UpdateUserApi.updateUser(params, 'profile-image');
                    break;
                case "gender":
                    await UpdateUserApi.updateUser(params, 'age-and-gender');
            }
            AuthUtils.setUserInfo({
                nickname: nicknameValue,
                gender: genderValue.gender,
                age: genderValue.age,
                profileImage: watch('profileImage')
            });

            switch (type) {
                case "gender":
                    showToast('나이대, 성별 변경이 완료됐어요', ToastPosition.BOTTOM, ToastAlign.CENTER);
                    break;
                case "nickname":
                    showToast('닉네임 변경이 완료됐어요', ToastPosition.BOTTOM, ToastAlign.CENTER);
                    break;
                case "profileImage":
                    showToast('프로필 이미지 변경이 완료됐어요', ToastPosition.BOTTOM, ToastAlign.CENTER);
                    break;
            }
        } catch (error: any) {
            const errorMessage = error.message || '업데이트에 실패했습니다';
            console.log('Error:', error);
            showToast(errorMessage, ToastPosition.BOTTOM, ToastAlign.CENTER);
        }
    }

    const handleProfileUpdate = (image: FoodProfileType) => {
        upDateUserInfo('profileImage', image);
    };

    const profileInfo = useMemo(() => {
        if (!userInfo?.profileImage) return DEFAULT_IMAGE;
        return userInfo.profileImage;
    }, [userInfo.profileImage]);

    const rightRenderer = (value: string, callback: () => void) => {
        if (!focused) {
            return <Edit/>
        } else {
            if (value.length > 0) {
                return <Close onClick={callback}/>
            }
        }
    }

    useEffect(() => {
        if (!isInitialized && userInfo) {
            setValue('nickname', userInfo.nickname);
            setValue('genderAge', {
                gender: userInfo.gender || '',
                age: userInfo.age || ''
            });
            setValue('profileImage', profileInfo);
            setIsInitialized(true);
        }
    }, [userInfo, profileInfo, setValue, isInitialized]);

    return (
        <div className='h-basic-body-with-header relative'>
            <div className='px-5'>
                <div className='pt-6 w-full flex justify-center items-center flex-col gap-6'>
                    <div className='flex flex-col gap-3'>
                        <ProfileImageComponent
                            userInfoImage={profileInfo}
                            isSetting
                            callback={handleProfileUpdate}
                        />
                    </div>
                </div>
                <div className='pt-6'/>
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
                                        rightFocus={!focused}
                                        style="w-full"
                                        onBlur={() => {
                                            validateNickname(nicknameValue)
                                            if (validateNickname(nicknameValue)) {
                                                upDateUserInfo('nickname')
                                            }
                                            setFocused(false)
                                        }}
                                        onFocus={() => {
                                            setFocused(true)
                                        }}
                                        placeHolder="닉네임을 최소 2자 이상 입력해주세요"
                                        label='닉네임'
                                        right={rightRenderer(nicknameValue, () => field.onChange(''))}
                                        onSubmit={() => {
                                            if (validateNickname(nicknameValue)) {
                                                upDateUserInfo('nickname')
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
                                                right={<DownArrow onClick={openModal}/>}
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
            <div className='absolute bottom-0 pb-20 w-full '>
                <Button type='transparent' onClick={deleteUser} size='md'
                        style='w-full text-text-4 font-medium text-body2'>
                    회원탈퇴
                </Button>
            </div>
        </div>
    );
};

export default EditPage;