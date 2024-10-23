import React from 'react';
import { HomeSelectProps } from "@/src/app/types/page/home/homeSelect";
import ArrowDown from '../../../../../../../../public/svg/items/common/ArrowDown.svg'

const HomeSelect = ({ data, callBack, selected }: HomeSelectProps) => {
    return (
        <div
            className={`${selected ? 'bg-bg-1 text-common' : 'bg-bg-0 text-text-3'} rounded-[12px] max-w-[400px] w-fit overflow-hidden`}
            onClick={callBack}
        >
            <div className='px-3 py-[11px] flex flex-row items-center gap-1'>
                <span className='truncate'>{data}</span>
                <ArrowDown className="flex-shrink-0" />
            </div>
        </div>
    )
}

export default HomeSelect