import {FieldError} from "react-hook-form";
import {ReactNode} from "react";

export interface InputProps {
    value: string | number | undefined;
    onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onFocus?: (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur?: (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    placeHolder?: string;
    borderNone?: boolean
    error?: FieldError | undefined | boolean;
    type?: string;
    autoFocus?: boolean;
    right?: ReactNode;
    radius?: boolean;
    color?: string;
    left?: ReactNode;
    borderColor?: string;
    max?: number;
    style?: string;
    label?: string;
    align?: string;
    onSubmit?: () => void;
    onRemove?: () => void;
    bgColor?: string;
    errorMessage?: string;
    infoMessage?: string;
    infoColor?: string;
    disabled?: boolean;
    multiple?: number;
    pattern?: string;
    readonly?: boolean;
    onClick? : () => void;
    selectVersion?: boolean;
}