// ResultCard.tsx
import Image from "next/image";
import React, {useState} from "react";
import {ResultCardProps} from "@/src/types/page/swape/card";
import LocationPin from "@/src/svg/items/deck/LocationPin";
import Plus from '@/src/svg/items/common/Plus'

const ResultCard: React.FC<ResultCardProps> = ({data, className, handleDeleteCard, deleted}) => {
    const [showSadzz, setShowSadzz] = useState(false);

    const handleDelete = () => {
        const type = deleted ? 'add' : 'delete'
        if (type === 'delete') {
            setShowSadzz(true);
            setTimeout(() => {
                setShowSadzz(false);
            }, 800);
        }
        handleDeleteCard(data, type);
    };

    return (
        <div className='relative shadow-card border border-line-1 rounded-[12px] '>
            {deleted && (
                <div className="absolute inset-0 bg-black/[0.5] z-40 w-full h-full rounded-[16px]"/>
            )}
            {showSadzz && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <Image
                        src={'/images/items/Sadzz.png'}
                        alt='sad'
                        className='animate-flyIn'
                        width={95}
                        height={95}
                    />
                </div>
            )}
            {
                deleted ? <div onClick={handleDelete}
                               className="bg-common-white z-40 rounded-full w-[24px] h-[24px] absolute flex justify-center items-center top-6 right-6 ">
                    <Plus/>
                </div> : <div
                    onClick={handleDelete}
                    className="bg-bg-9 rounded-full w-[24px] h-[24px] absolute flex justify-center items-center top-6 right-6 z-10">
                    <div
                        className="cursor-pointer text-common-white h-[2px] w-[10px] border border-common-white rounded-large "></div>
                </div>
            }
            <div className='xs:p-4 p-2'>
                <div
                    className={` relative card-image-size ${className ? className : ""} rounded-[16px] overflow-hidden`}
                >
                    <div className="w-fulle rounded-[16px] overflow-hidden">
                        <Image
                            src={`/images/bg/${data.bgType}.png`}
                            alt="background"
                            layout="fill"
                            className=" object-cover"
                            draggable={false}
                        />
                        <div className="absolute inset-0">
                            <div className="relative w-full h-full pt-4 px-8 flex items-center justify-center">
                                <Image
                                    src={data.imageUrl}
                                    alt={`${data.categoryId} image`}
                                    layout="fill"
                                    className="rounded-[16px] object-contain"
                                    draggable={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-common flex flex-col xs:gap-3 gap-1  px-4 py-4 xs:h-[120px] h-[110px] overflow-y-auto">
                <h2 className="text-text-body1 xs:text-title2 font-medium">{data.category}</h2>
                <div className="flex flex-row items-center">
                    <LocationPin/>
                    <div className='truncate text-caption2 font-medium'>가까운 식당 {data.distance}m</div>
                </div>
                <div className='text-caption2 font-regular'>{data.represent}</div>
            </div>
        </div>
    );
};

export default ResultCard;