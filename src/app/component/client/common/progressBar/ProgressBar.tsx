import {ProgressBarProps} from "@/src/app/types/common/progressBar";
import Image from 'next/image'

const ProgressBar = (props: ProgressBarProps) => {
    const {currentStep, totalStep, style, bg, borderColor, height, width, leftCount} = props
    return <div className={`flex flex-col gap-3  ${width ? width : 'w-full'}`}>
        <div
            className={`bg-common-white border ${width ? width : 'w-full'} rounded-[120px] ${bg ? bg : ''} ${borderColor ? borderColor : 'border-line-2'}`}>
            <div
                className={`px-3 flex flex-row items-center ${width ? width : 'w-full'} ${height ? height : 'h-[42px]'} justify-between ${style ? style : ''}`}>
                <div className='flex flex-row pr-2 min-w-[48px] font-medium text-primary-6 text-body2 items-center'>
                    <Image src="/images/logo/progressLogo.png" width={24} height={24} alt="progressBar"/>
                    {currentStep}
                </div>
                <div className='w-full'>
                    <progress max={totalStep} value={currentStep}
                              className='progress w-full progress-color-value'></progress>
                </div>
                <div className='px-2 py-1 text-body2 font-medium text-[#666666]'>
                    {totalStep}
                </div>
            </div>
        </div>
        {
            leftCount && <div className='text-center text-caption1 font-medium text-text-2'>
            앞으로 {Number(totalStep) - Number(currentStep)}개 남았어요! 💪
            </div>
        }
    </div>
}

export default ProgressBar