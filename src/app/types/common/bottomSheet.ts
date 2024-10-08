import {ReactNode} from "react";

export interface BottomSheetPropsType {
    children: ReactNode;
    close: () => void;
    open: boolean;
    nonPadding?: boolean;
}