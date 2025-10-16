import {ProfileImageServerType} from "@/src/types/common/profileImage";
import Image from "next/image";


const ProfileImageServer = (props: ProfileImageServerType) => {
    const {profileImage, size} = props
    const getStyleClass = () => {
        const sizeStyle = `w-[${size}px] h-[${size}px]`;
        return `rounded-full  ${sizeStyle}`;
    };
    return (
        <div
            className='relative'
        >
            <div
                className={` overflow-hidden flex-shrink-0 ${getStyleClass()}`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    minWidth: `${size}px`,
                    minHeight: `${size}px`,
                }}
            >
                <Image
                    src={profileImage}
                    alt='profileImage'
                    width={size}
                    height={size}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}

export default ProfileImageServer