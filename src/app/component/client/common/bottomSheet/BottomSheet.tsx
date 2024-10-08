'use client'
import React from 'react';
import { animated, useTransition } from "react-spring";
import { BottomSheetPropsType } from "@/src/app/types/common/bottomSheet";

interface ExtendedBottomSheetPropsType extends BottomSheetPropsType {
    backdrop?: boolean;
}

const BottomSheet: React.FC<ExtendedBottomSheetPropsType> = ({
                                                                 open,
                                                                 close,
                                                                 children,
                                                                 nonPadding,
                                                                 backdrop = true, // 기본값을 true로 설정
                                                             }) => {
    const transitionConfig = {
        from: { opacity: 1, transform: "translateY(100%)" },
        enter: { opacity: 1, transform: "translateY(0%)" },
        leave: { opacity: 0, transform: "translateY(100%)" },
    };

    const backdropTransitions = useTransition(open && backdrop, transitionConfig);
    const sheetTransitions = useTransition(open, transitionConfig);

    return (
        <>
            {backdropTransitions((style, item) =>
                item ? (
                    <animated.div
                        style={{
                            ...style,
                            transform: undefined,
                            maxWidth: "640px",
                            margin: "0 auto",
                        }}
                        onClick={close}
                        className="fixed inset-0 bg-backdrop bg-opacity-10 z-[60]"
                    ></animated.div>
                ) : null
            )}

            {sheetTransitions((style, item) =>
                item ? (
                    <animated.div
                        style={{ ...style, left: "50%", transform: "translateX(-50%)" }}
                        className="w-full max-w-[640px] bg-common-white rounded-t-[12px] max-h-1/2 fixed bottom-0 z-[60]"
                    >
                        <div
                            className={`${!nonPadding && "pl-6 pr-6 pt-[24px] pb-[34px]"}`}
                        >
                            {children}
                        </div>
                    </animated.div>
                ) : null
            )}
        </>
    );
};

export default BottomSheet;