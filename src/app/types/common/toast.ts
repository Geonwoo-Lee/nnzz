

export const enum ToastPosition {
    TOP = "top",
    MIDDLE = "middle",
    BOTTOM = "bottom",
}

export const enum ToastAlign {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right",
}

export interface ToastProps {
    message: string;
    isVisible: boolean;
    position: ToastPosition;
    align: ToastAlign;
}

