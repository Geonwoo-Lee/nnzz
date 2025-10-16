import {useEffect, useState} from "react";
import {FoodProfileType, ProfilePageProps} from "@/src/types/page/sign-up/sign-up";
import FoodProfileDummy from "@/src/dummy/sign-up";
import ProfileSelectBottomSheet
    from "@/src/component/client/page/sign-up/features/ProfileComponet/ProfileSelectBottomSheet";
import ProfileImage from "@/src/component/client/common/profileImage/ProfileImage";


const ProfileImageComponent = (props: ProfilePageProps) => {
    const {setLoginProfileImage, userInfoImage, isSetting, callback} = props
    const [profileImage, setProfileImage] = useState<FoodProfileType>(FoodProfileDummy[0])
    const [open, setOpen] = useState<boolean>(false)
    const [isInitialRender, setIsInitialRender] = useState(true)
    const close = () => {
        setOpen(false)
    }
    const setImage = (profileImage: FoodProfileType) => {
        setProfileImage(profileImage)
        if(setLoginProfileImage) setLoginProfileImage(profileImage)

        // 이미지 선택 시에는 직접 callback 호출
        if(callback) {
            callback(profileImage)
        }
        setOpen(false)
    }

    const openModal = () => {
        setOpen(true)
    }

    useEffect(() => {
        // 초기 userInfoImage 설정
        if(userInfoImage && isInitialRender) {
            setProfileImage(userInfoImage)
            setIsInitialRender(false)
        }
    }, [userInfoImage, isInitialRender]);


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