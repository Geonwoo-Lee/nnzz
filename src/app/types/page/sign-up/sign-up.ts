import {Control,  UseFormSetValue} from "react-hook-form";


export interface  genderAgeType {
  gender: '남' | '여' | '선택안함' | '',
    age: string;
}
export interface SignUpController {
    nickname: string;
    genderAge: genderAgeType
    profileImage: FoodProfileType;
}

export interface SignInType {
    profileImage: FoodProfileType;
    nickname: string;
    gender: '남' | '여' | '선택안함' | '',
    age: string;
    email?: string
}

export interface SignInTypeFromServer {
    nickname: string;
    gender: '남' | '여' | '선택안함' | '',
    age: string;
    profileImage: number;
    email: string
}

export interface LoginToken {
        accessToken: string;
        refreshToken: string;
}

export interface LoginRes {
    user: SignInTypeFromServer;
    token: LoginToken
}

export interface BasicSignUpProps {
    step: number;
    setStep: (step: number) => void;
    control: Control<SignUpController>
    setValue: UseFormSetValue<SignUpController>;
    maxStep?: string;
}

export interface NickNamePageProps extends BasicSignUpProps {
    onSubmit?: (data: string) => void;
    nickNameValue?: string
    validateNickname: (value: string) => boolean
    errorMessage: string
}

export interface GenderAgePageProps extends BasicSignUpProps {
    genderAgeValue:   genderAgeType
}

export interface GenderAgeBottomSheetProps {
    setStep?: (step: number) => void;
    step?: number
    stepAble: boolean;
    callback?: () => void
    control: Control<SignUpController>
    open: boolean;
    onClose: () => void;
    genderAgeValue:   genderAgeType
    setSelectedValue: (value: string | genderAgeType['gender'], type: 'gender' | 'age') => void;
}

export interface ProfilePageProps {
    setLoginProfileImage?: (value: FoodProfileType) => void;
    userInfoImage?: FoodProfileType;
    isSetting?: boolean;
    callback?: (image: FoodProfileType) => void
}

export interface GenderAgeSelectWrapProps {
    selectedValue: string | genderAgeType['gender']
    setSelectedValue: (value: string | genderAgeType['gender'], type: 'gender' | 'age') => void;
    type: 'gender' | 'age'
    selectList: string[] | genderAgeType['gender'][]
}

export interface FoodProfileType {
    id: number;
    name: string;
    src: string;
}

export type FoodProfileList = FoodProfileType[]

export interface ProfileSelectBottomSheetProps {
    open: boolean;
    close: () => void;
    setSelectedImage: (value: FoodProfileType) => void
}