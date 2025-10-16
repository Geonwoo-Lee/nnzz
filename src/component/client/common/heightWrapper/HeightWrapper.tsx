'use client';

import React, { ReactNode } from 'react';
import {useHeightUnit} from "@/src/hooks/useHeightUnit";

interface HeightUnitWrapperProps {
    children: ReactNode;
    className?: string;
}

const HeightUnitWrapper: React.FC<HeightUnitWrapperProps> = ({ children, className }) => {
    const { unit } = useHeightUnit();
    const style = {
        height: `100${unit}`,
        minHeight: `100${unit}`,
    };

    return <div className={className} style={style}>{children}</div>;
};

export default HeightUnitWrapper;