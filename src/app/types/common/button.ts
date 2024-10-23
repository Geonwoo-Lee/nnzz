import {ReactNode} from "react";

const ButtonSizes = {
    sm: "sm",
    md: "md",
    lg: "lg",
} as const;


const ButtonTypes = {
    primary: "primary",
    secondary: "secondary",
    muted: "muted",
    outlined: "outlined",
    transparent: 'transparent'
} as const;

type ButtonSize = (typeof ButtonSizes)[keyof typeof ButtonSizes];
type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

export interface ButtonProps {
    size: ButtonSize;
    type: ButtonType;
    children: ReactNode;
    onClick: () => void;
    style?: string;
    disabled?: boolean;
    color?: string
}
