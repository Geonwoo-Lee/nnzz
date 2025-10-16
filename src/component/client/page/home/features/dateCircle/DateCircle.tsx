'use client'
import {DateCircleProps} from "@/src/types/page/home/dateCircle";


const DateCircle = (props: DateCircleProps) => {
    const {data} = props
    return (
        <div onClick={() => {props.callBack(props.data)}} className={`${props.selected ? 'bg-slate-900 text-common-white' : 'bg-slate-50 text-slate-400 border border-slate-100'} rounded-full flex flex-col justify-center items-center gap-3 h-[100px] w-[100px]`}>
            <div className='font-medium text-title2'>
                {data.day}
            </div>
            <div className='text-caption2 font-regular'>
                {data.date}
            </div>
        </div>
    )
}

export default DateCircle