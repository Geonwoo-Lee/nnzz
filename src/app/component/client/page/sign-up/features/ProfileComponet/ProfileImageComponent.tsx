import {useState} from "react";
import {FoodProfileType} from "@/src/app/types/page/sign-up/sign-up";
import FoodProfileDummy from "@/src/app/dummy/sign-up";
import ProfileSelectBottomSheet
    from "@/src/app/component/client/page/sign-up/features/ProfileComponet/ProfileSelectBottomSheet";
import ProfileImage from "@/src/app/component/client/common/profileImage/ProfileImage";


const ProfileImageComponent = () => {
    const [profileImage, setProfileImage] = useState<FoodProfileType>(FoodProfileDummy[0])
    const [open, setOpen] = useState<boolean>(false)

    const close = () => {
        setOpen(false)
    }
    const setImage = (profileImage: FoodProfileType) => {
        setProfileImage(profileImage)
        setOpen(false)
    }

    const openModal = () => {
        setOpen(true)
    }

    return <div className='w-full flex justify-center items-center '>
        <ProfileImage profileImage={profileImage} setOpen={openModal}/>
        <ProfileSelectBottomSheet open={open} close={close} setSelectedImage={setImage} />
    </div>
}

export default ProfileImageComponent