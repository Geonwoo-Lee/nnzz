import React from 'react';
import { HomeSelectProps } from "@/src/types/page/home/homeSelect";
import ArrowDown from '../../../../../../../public/svg/items/common/ArrowDown.svg'

const HomeSelect = ({ data, callBack }: HomeSelectProps) => {
    return (
        <div
            className={`bg-bg-1 text-common rounded-[12px] max-w-[400px] w-fit overflow-hidden`}
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