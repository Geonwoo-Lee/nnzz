'use client'
import React, {useEffect} from 'react'
import Image from 'next/image'
import {DragStatus} from "@/src/app/hooks/useCardSwipe";

interface CardProps {
    image: string;
    category: string;
    name: string;
    priceRange: string;
    bind: () => any;
    dragStatus: DragStatus;
}

const Card: React.FC<CardProps> = ({ image, category, name, priceRange, bind, dragStatus }) => {
    const preventDefault = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
    };


    useEffect(() => {
        console.log(dragStatus, 'card');
    }, [dragStatus]);
    return (
        <div
            {...bind()}
            style={{
                width: '300px',
                height: '400px',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                cursor: 'grab',
                touchAction: 'none',
            }}
        >
            <div
                style={{ width: '100%', height: '100%', position: 'relative' }}
                onMouseDown={preventDefault}
                onTouchStart={preventDefault as any}
            >
                <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    draggable={false}
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '20px',
                }}
            >
                <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{name}</h2>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', backgroundColor: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '2px 5px', borderRadius: '3px' }}>
                    Category: {category}
                </p>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', backgroundColor: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '2px 5px', borderRadius: '3px' }}>
                    Price: {priceRange}
                </p>
            </div>
            {dragStatus !== 'neutral' && (
                dragStatus === 'like'
                    ? <img src='/like.png' alt='like' className='absolute w-[40px] h-[40px]  top-2 right-4 animate-wiggle'/>
                    : <img  src='/dislike.png' alt='dislike' className='w-[40px] h-[40px]  absolute top-2 left-4 animate-wiggle'/>
            )}
        </div>
    )
}

export default Card