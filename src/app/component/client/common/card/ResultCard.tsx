import Image from "next/image";
import React, { useEffect, useState } from "react";
import {ResultCardProps} from "@/src/app/types/page/swape/card";

const ResultCard: React.FC<ResultCardProps> = ({ image, category, name, priceRange, index }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set a delay for each card based on its index
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, index * 200); // 200ms delay for each card

        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <div
            className={`transition-opacity duration-500 ease-in-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
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
                <p style={{
                    margin: '5px 0',
                    fontSize: '0.9rem',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    display: 'inline-block',
                    padding: '2px 5px',
                    borderRadius: '3px'
                }}>
                    Category: {category}
                </p>
                <p style={{
                    margin: '5px 0',
                    fontSize: '0.9rem',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    display: 'inline-block',
                    padding: '2px 5px',
                    borderRadius: '3px'
                }}>
                    Price: {priceRange}
                </p>
            </div>
        </div>
    );
};

export default ResultCard;
