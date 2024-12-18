import BottomSheet from "@/src/app/component/client/common/bottomSheet/BottomSheet";
import {useState} from "react";
import {FoodProfileType, ProfileSelectBottomSheetProps} from "@/src/app/types/page/sign-up/sign-up";
import FoodProfileDummy from "@/src/app/dummy/sign-up";
import Close from "@/public/svg/header/Close.svg";
import Button from "@/src/app/component/client/common/button/Button";
import ProfileImage from "@/src/app/component/client/common/profileImage/ProfileImage";


const ProfileSelectBottomSheet = (props: ProfileSelectBottomSheetProps) => {
    const {open, close, setSelectedImage} = props
    const [userSelectedImage, setUserSelectedImage] = useState<FoodProfileType>(FoodProfileDummy[0])
    return (
        <BottomSheet open={open} close={close} nonPadding={true}>
            <div>
                <div className='flex flex-col'>
                    <div className='pt-3 px-2 text-center relative text-text-2 font-medium text-title2 h-[48px]'>
                        프로필 이미지 선택
                        <Close className='absolute right-[8px] top-[12px]' onClick={close}/>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-4 py-6 justify-center'>
                    {
                        FoodProfileDummy.slice(1, FoodProfileDummy.length).map((item, index) => (
                                <div className='flex justify-center'          key={`profile-${index}`}>
                                    <ProfileImage
                                        profileImage={item}
                                        selectedImage={userSelectedImage}
                                        setSelectedImage={setUserSelectedImage}
                                    />
                                </div>
                        ))
                    }
                </div>
                <div className='p-4'>
                    <Button onClick={() => {
                        setSelectedImage(userSelectedImage)
                    }} disabled={userSelectedImage === FoodProfileDummy[0]} type={'primary'} size={'lg'}
                            style='w-full'>
                        선택 완료
                    </Button>
                </div>
            </div>
        </BottomSheet>
    )
}

export default ProfileSelectBottomSheet