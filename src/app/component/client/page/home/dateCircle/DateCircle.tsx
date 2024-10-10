'use client'
import {DateCircleProps} from "@/src/app/types/page/home/dateCircle";
import {useEffect} from "react";


const DateCircle = (props: DateCircleProps) => {
    useEffect(() => {
        console.log(props.data.date)
    }, [props.data]);
    return (
        <div onClick={() => {props.callBack(props.data)}} className={`${props.selected ? 'bg-slate-900 text-common-white' : 'bg-slate-50 text-slate-400 border border-slate-100'} rounded-full flex flex-col justify-center items-center gap-3 h-[100px] w-[100px]`}>
            <div className='font-semibold text-lg'>
                {props.data.day}
            </div>
            <div className='text-xs font-regular'>
                {props.data.date}
            </div>
        </div>
    )
}

export default DateCircle