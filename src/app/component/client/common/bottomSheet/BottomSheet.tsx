'use client'
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { animated, useTransition, useSpring } from "react-spring";
import { BottomSheetPropsType } from "@/src/app/types/common/bottomSheet";

interface ExtendedBottomSheetPropsType extends BottomSheetPropsType {
    backdrop?: boolean;
    animation?: boolean;
}

const BottomSheet: React.FC<ExtendedBottomSheetPropsType> = ({
                                                                 open,
                                                                 close,
                                                                 children,
                                                                 nonPadding,
                                                                 backdrop = true,
                                                                 animation = true,
                                                             }) => {
    const [windowWidth, setWindowWidth] = useState(0);

    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const backdropTransition = useTransition(open, {
        from: { opacity: 0 },
        enter: { opacity: backdrop ? 1 : 0 },
        leave: { opacity: 0 },
    });

    const sheetSpring = useSpring({
        transform: open ? 'translateY(0%)' : 'translateY(100%)',
        config: { tension: 400, friction: 45 },
    });

    const maxWidth = 640;
    const width = Math.min(windowWidth, maxWidth);
    const leftPosition = (windowWidth - width) / 2;

    const sheetStyle = useMemo(() => ({
        ...sheetSpring,
        display: open ? 'block' : 'none',
        width: `${width}px`,
        left: `${leftPosition}px`,
        transform: animation ? sheetSpring.transform : 'translateY(0%)',
    }), [sheetSpring, open, width, leftPosition, animation]);

    return (
        <>
            {backdropTransition((style, item) =>
                    item && (
                        <animated.div
                            style={style}
                            onClick={close}
                            className="fixed inset-0 bg-backdrop bg-opacity-10 z-[60]"
                        />
                    )
            )}

            <animated.div
                style={sheetStyle}
                className="bg-common-white shadow-bottom-sheet-top rounded-t-[12px] fixed bottom-0 z-[60]"
            >
                <div
                    className={`${!nonPadding ? "px-6 pt-6 pb-8" : ""} max-h-[calc(100vh-80px)] overflow-y-auto`}
                >
                    {children}
                </div>
            </animated.div>
        </>
    );
};

export default React.memo(BottomSheet);