import {ReactNode} from "react";

export interface BottomSheetPropsType {
    children: ReactNode;
    close: () => void;
    open: boolean;
    noBackdrop?: boolean;
    nonPadding?: boolean;
}