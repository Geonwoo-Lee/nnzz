import {useEffect, useState} from "react";
import {FoodProfileType, ProfilePageProps} from "@/src/app/types/page/sign-up/sign-up";
import FoodProfileDummy from "@/src/app/dummy/sign-up";
import ProfileSelectBottomSheet
    from "@/src/app/component/client/page/sign-up/features/ProfileComponet/ProfileSelectBottomSheet";
import ProfileImage from "@/src/app/component/client/common/profileImage/ProfileImage";


const ProfileImageComponent = (props: ProfilePageProps) => {
    const {setLoginProfileImage, userInfoImage, isSetting} = props
    const [profileImage, setProfileImage] = useState<FoodProfileType>(FoodProfileDummy[0])
    const [open, setOpen] = useState<boolean>(false)

    const close = () => {
        setOpen(false)
    }
    const setImage = (profileImage: FoodProfileType) => {
        setProfileImage(profileImage)
       if(setLoginProfileImage) setLoginProfileImage(profileImage)
        setOpen(false)
    }

    const openModal = () => {
        setOpen(true)
    }

    useEffect(() => {
        if(userInfoImage) setImage(userInfoImage)
    }, [userInfoImage]);

    return <div className='w-full flex justify-center items-center '>
        <div className={`${isSetting && 'flex flex-col gap-6 justify-center items-center'}`}>
            <ProfileImage profileImage={profileImage} setOpen={openModal}/>
            {
                isSetting && <div onClick={openModal}
                                  className='w-[126px] cursor-pointer h-[38px] border border-line-3 flex items-center justify-center text-text-3 text-caption1 font-medium rounded-[8px]'>
                    프로필 이미지 변경
                </div>
            }
        </div>
        <ProfileSelectBottomSheet open={open} close={close} setSelectedImage={setImage}/>
    </div>
}

export default ProfileImageComponent