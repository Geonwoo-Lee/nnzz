'use client';

import { ButtonProps } from "@/src/app/types/common/button";

const Button = ({
                    children,
                    type,
                    size,
                    onClick,
                    style,
                    disabled,
                    color,
                    fullRound
                }: ButtonProps) => {
    const styles = {
        size: {
            sm: `h-button-height-sm text-caption2 font-regular ${fullRound  ? "rounded-full" : "rounded-[8px]"}`,
            md: `h-button-height-md text-caption1 font-medium rounded-[8px] ${fullRound  ? "rounded-full" : "rounded-[8px]"}`,
            ml: `h-button-height-ml text-caption1 font-medium rounded-[8px] ${fullRound  ? "rounded-full" : "rounded-[8px]"}`,
            lg: `h-button-height-lg text-body2 font-medium  ${fullRound ? 'rounded-full' : 'rounded-[12px]'}`,
        },
        type: {
            primary: `${color ? color : "text-common-white"} bg-red-500 active:bg-primary-8 active:scale-95`,
            secondary: `${color ? color : "text-common"} bg-common-white active:bg-bg-3 active:scale-95`,
            muted: `${color ? color : "text-common-white"} bg-bg-9 active:bg-bg-7 active:scale-95`,
            outlined: `${color ? color : "text-text-3"} bg-common-white border border-line-3 active:scale-95 active:bg-bg-3`,
            transparent: `${color ? color : 'text-text-2'} bg-common-white active:bg-bg-2 active:scale-95`,

        },
        disabled: {
            primary: "bg-opacity-20 bg-red-500 text-opacity-20 text-common-white",
            secondary: "bg-opacity-20 bg-common-white text-opacity-20 text-common",
            muted: "bg-opacity-20 bg-bg-9 text-opacity-20 text-common-white",
            outlined: "bg-opacity-20 bg-common-white text-opacity-20 text-text-3 border-opacity-20",
            transparent: "bg-opacity-20 bg-common-white text-opacity-20 text-text-2",
        },
    };

    const buttonStyleRenderer = () => {
        if (disabled) {
            return `${styles.size[size]} ${styles.disabled[type]} ${style}`;
        }
        return `${style} ${styles.type[type]} ${styles.size[size]}`;
    };

    return (
        <button
            className={buttonStyleRenderer()}
            onClick={(e) => {
                e.preventDefault();
                if (!disabled) {
                    onClick();
                }
            }}
            disabled={disabled}
        >
            <div className={`${size === "sm" ? "pl-3 pr-3": "pl-4 pr-4"}`}>
                {children}
            </div>
        </button>
    );
};

export default Button;