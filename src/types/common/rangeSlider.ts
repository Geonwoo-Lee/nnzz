export interface RangeSliderProps {
    steps: number[],
    defaultValue: number,
    max: number,
    changeDistance: (distance: number) => void
}