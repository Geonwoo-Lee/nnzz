import {DayInfo} from "@/src/types/page/home/homeSelect";


export interface DateCircleProps {
    data: DayInfo;
    callBack: (selected: DayInfo) => void
    selected: boolean;
}