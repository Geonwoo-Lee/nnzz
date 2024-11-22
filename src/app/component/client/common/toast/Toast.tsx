import {ToastProps} from "@/src/app/types/common/toast";


export default function Toast({
                                  message,
                                  isVisible,
                                  position,
                                  align,
                              }: ToastProps) {
    const positionRenderer = () => {
        switch (position) {
            case "top":
                return "top-20";

            case "bottom":
                return "bottom-[120px]";

            case "middle":
                return "top-1/2 -translate-y-1/2";
        }
    };

    const alignRenderer = () => {
        switch (align) {
            case "left":
                return "justify-start";
            case "center":
                return "justify-center";
            case "right":
                return "justify-end ";
            default:
                return "justify-center";
        }
    };




    return isVisible ? (
        <div className={` w-full w-max-[592px] left-1/2 -translate-x-1/2 ${alignRenderer()} items-center ${positionRenderer()} fixed  px-4 z-50 flex`}>
            <div
                className={`h-full flex items-center ${
                    isVisible ? "animate-fade-in" : "animate-fade-out"
                } w-full flex flex-row gap-4 bg-opacity-80 min-w-[300px] max-w-[640px] text-base text-common-white font-regular bg-slate-800 pl-4 pr-4 pb-3 pt-3 rounded-[8px] shadow-lg`}
            >
                {message}
            </div>
        </div>
    ) : null;
}
