// Card.tsx
import React from 'react'
import Image from 'next/image'
import {CardProps} from "@/src/app/types/component/swape/card";



const Card: React.FC<CardProps> = ({ image, category, name, priceRange, bind, dragStatus, className }) => {
    return (
        <div
            {...(bind || {})}
            className={`overflow-hidden relative shadow-lg cursor-grab touch-none ${className}`}
        >
            <div className="w-full h-full relative">
                <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    draggable={false}
                />
            </div>
            <div className="absolute bottom-0 pb-20 left-0 right-0 bg-black bg-opacity-70 text-white p-5">
                <h2 className="text-xl mb-2">{name}</h2>
                <p className="text-sm mb-1 bg-white bg-opacity-20 inline-block px-2 py-1 rounded">
                    Category: {category}
                </p>
                <p className="text-sm bg-white bg-opacity-20 inline-block px-2 py-1 rounded">
                    Price: {priceRange}
                </p>
            </div>
            {dragStatus !== 'neutral' && (
                dragStatus === 'like'
                    ? <img src='/assets/like.png' alt='like' className='absolute w-[40px] h-[40px] top-4 right-1/2 animate-wiggle'/>
                    : <img src='/assets/dislike.png' alt='dislike' className='w-[40px] h-[40px] absolute top-4 left-1/2 animate-wiggle'/>
            )}
        </div>
    )
}

export default Card