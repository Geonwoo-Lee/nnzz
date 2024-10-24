'use client';

import {InputProps} from "@/src/app/types/common/input";
import {forwardRef} from "react";

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
                                                                                  value,
                                                                                  onChange,
                                                                                  onBlur,
                                                                                  placeHolder,
                                                                                  error,
                                                                                  type,
                                                                                  style,
                                                                                  left,
                                                                                  infoMessage,
                                                                                  right,
                                                                                  max,
                                                                                  align,
                                                                                  onSubmit,
                                                                                  bgColor,
                                                                                  onFocus,
                                                                                  disabled,
                                                                                  multiple,
                                                                                  errorMessage,
                                                                                  label,
                                                                                  onRemove,
                                                                                  borderNone,
                                                                                  pattern,
                                                                                  readonly,
                                                                                  onClick,
                                                                                  infoColor
                                                                              }, ref) => {
    const sizeRenderer = () => {
        if (multiple) {
            return `h-[${multiple * 10}px]`;
        }
        return "h-input-height";
    };

    const textAlignClass = (align?: string) => {
        switch (align) {
            case "center":
                return "text-center";
            case "right":
                return "text-right";
            case "left":
            default:
                return "text-left";
        }
    };

    const inputStyles = `
        ${sizeRenderer()}
        flex-grow
        w-full
        rounded-[16px]
        focus:outline-none
        text-body-2 
        font-medium
        border-none
        pl-4
        pr-4
        ${textAlignClass(align)}
        text-text-4 
        bg-bg-1
        focus:text-common 
        focus:bg-bg-0
        ${error ? "text-common bg-bg-0" : ""}
    `;

    const containerStyles = `
        flex
        w-full
        items-center
        rounded-[16px]
        ${borderNone || disabled ? "" : "border"}
        ${
        readonly
            ? "border-line-3 text-text-4 bg-bg-1"
            : error
                ? "border-red-500 bg-bg-0"
                : "border-line-2 bg-bg-1 focus-within:border-line-3 focus-within:bg-bg-0"
    }
        ${disabled ? "cursor-not-allowed bg-base-200" : ""}
    `;

    const sideElementStyles = `
        flex 
        items-center 
        flex-shrink-0
    `;

    return (
        <div className={`${style ? style : ""} flex flex-col gap-[10px] relative rounded-[16px] w-full ${bgColor ? bgColor : "bg-alpha-00"}`}>
            {label && (
                <div className="text-caption-1 font-medium text-text-3">{label}</div>
            )}
            <div className={containerStyles}>
                {left && <div className={`${sideElementStyles} pl-4 ${bgColor ? bgColor : "bg-alpha-00"}`}>{left}</div>}
                <div className="flex-1 min-w-0">
                    {multiple ? (
                        <textarea
                            ref={ref as React.Ref<HTMLTextAreaElement>}
                            placeholder={placeHolder}
                            value={value}
                            onChange={onChange}
                            maxLength={max}
                            onFocus={onFocus}
                            disabled={disabled}
                            onBlur={onBlur}
                            readOnly={readonly}
                            className={`${inputStyles} resize-none`}
                            style={{height: `${multiple * 20}px`}}
                        />
                    ) : (
                        <input
                            ref={ref as React.Ref<HTMLInputElement>}
                            type={type ? type : "text"}
                            placeholder={placeHolder}
                            value={value}
                            onChange={onChange}
                            maxLength={max}
                            onFocus={onFocus}
                            pattern={pattern}
                            disabled={disabled}
                            onBlur={onBlur}
                            readOnly={readonly}
                            onClick={() => {
                                if(readonly && onClick) {
                                    onClick()
                                }
                            }}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    onSubmit && onSubmit();
                                } else if (e.key === "Backspace") {
                                    e.preventDefault();
                                    onRemove && onRemove();
                                }
                            }}
                            className={inputStyles}
                        />
                    )}
                </div>
                {right && <div className={`${sideElementStyles} px-4`}>{right}</div>}
            </div>
            {errorMessage && (
                <div className="text-red-500 text-caption1 font-medium break-words">
                    {errorMessage}
                </div>
            )}
            {infoMessage && (
                <div className={`${infoColor ? infoColor : "text-text-4"} text-caption1 font-medium mt-1`}>
                    {infoMessage}
                </div>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;