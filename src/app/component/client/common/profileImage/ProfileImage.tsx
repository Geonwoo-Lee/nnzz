import Image from "next/image";
import Add from "@/public/svg/items/sign-up/Add.svg";
import Selected from "@/public/svg/items/sign-up/Selected.svg";
import { ProfileImageType } from "@/src/app/types/common/profileImage";

const ProfileImage = (props: ProfileImageType) => {
    const { setOpen, profileImage, selectedImage, size = 112, setSelectedImage } = props;

    const baseStyle = "rounded-full ";
    const selectedStyle = "border-[3px] border-primary-6";
    const commonStyle = "border border-line-2";

    const getStyleClass = () => {
        const sizeStyle = `w-[${size}px] h-[${size}px]`;
        if (selectedImage?.id && selectedImage.id === profileImage.id) {
            return `${baseStyle} ${selectedStyle} ${sizeStyle}`;
        }
        return `${baseStyle} ${commonStyle} ${sizeStyle}`;
    };

    const renderEmptyProfile = () => (
        <div className={`${baseStyle} w-[${size}px] h-[${size}px] bg-bg-1 ${commonStyle}`} />
    );



    const renderProfile = () => (
        <div
            className='relative'
            onClick={() => {
                if(setOpen) {
                    setOpen()
                }else if(setSelectedImage) {
                    setSelectedImage(profileImage)
                }
            }}
        >
                <div
                    className={`cursor-pointer overflow-hidden flex-shrink-0 ${getStyleClass()}`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        minWidth: `${size}px`,
                        minHeight: `${size}px`,
                    }}
                >
                    <Image
                        src={profileImage.src}
                        alt='profileImage'
                        width={size}
                        height={size}
                        className="w-full h-full object-cover"
                    />
                </div>
            {profileImage.id === 0 && (
                <Add className='absolute -bottom-6 -right-2 ' />
            )}
            {
                selectedImage && selectedImage.id === profileImage.id && <Selected className='absolute -bottom-6 -right-2 '/>
            }
        </div>
    );

    return profileImage.name === '' ? renderEmptyProfile() : renderProfile();
};

export default ProfileImage;