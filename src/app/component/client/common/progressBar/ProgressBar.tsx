import {ProgressBarProps} from "@/src/app/types/common/progressBar";
import NnzzPin from '../../../../../../public/svg/logo/nnzz_pin.svg'
const ProgressBar = (props: ProgressBarProps) => {
    const {
        currentStep,
        totalStep,
        style,
        bg,
        borderColor,
        height,
        width,
        leftCount,
        minRequired = 0,
        beforeMinText = "최소 개수를 채워주세요! 💪",
        afterMinText = "앞으로 {count}개 남았어요! 💪"
    } = props

    const currentCount = Number(currentStep);
    const totalCount = Number(totalStep);
    const remainingCount = totalCount - currentCount;

    // 현재 상태에 따른 메시지 결정
    const getMessage = () => {
        if (currentCount < minRequired) {
            return beforeMinText.replace('{count}', String(minRequired - currentCount));
        }
        return afterMinText.replace('{count}', String(remainingCount));
    }

    return <div className={`flex flex-col gap-3 ${width ? width : 'w-full'}`}>
        <div
            className={`bg-common-white border ${width ? width : 'w-full'} rounded-[120px] ${bg ? bg : ''} ${borderColor ? borderColor : 'border-line-2'}`}>
            <div
                className={`px-3 flex flex-row items-center ${width ? width : 'w-full'} ${height ? height : 'h-[42px]'} justify-between ${style ? style : ''}`}>
                <div className='flex flex-row pr-2 min-w-[48px] font-medium text-primary-6 text-body2 items-center'>
                 <NnzzPin/>
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
                {getMessage()}
            </div>
        }
    </div>
}

export default ProgressBar
