

export interface ProgressBarProps {
    currentStep: string | number;
    totalStep: string | number;
    bg?: string;
    borderColor?: string;
    style?: string;
    height?: string;
    width?: string;
    leftCount?: boolean;
    minRequired?: number;
    beforeMinText?: string;
    afterMinText?: string;
}