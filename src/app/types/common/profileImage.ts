import {FoodProfileType} from "@/src/app/types/page/sign-up/sign-up";


export interface ProfileImageType {
    setOpen?: () => void;
    profileImage: FoodProfileType;
    selectedImage?:FoodProfileType
    size?: number
    setSelectedImage?: (value: FoodProfileType) => void
}