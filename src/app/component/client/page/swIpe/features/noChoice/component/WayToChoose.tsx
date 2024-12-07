import Image from 'next/image'

type ChoiceType = 'reStart' | 'random'

interface ChoiceConfig {
    bg: string;
    image: string;
    title: string;
    description: string;
    callback: () => void
}

const CHOICE_CONFIG: Record<ChoiceType, ChoiceConfig> = {
    reStart: {
        bg: 'bg-[#FFC5CC]',
        image: '/images/items/SlowFind.png',
        title: '맛의 짝 찾기',
        description: '한번 더!',
        callback: () => {window.location.reload()}
    },
    random: {
        bg: 'bg-[#BFDBFE]',
        image: '/images/items/RandomFind.png',
        title: '알아서 골라주세요',
        description: '랜덤 뽑기',
        callback: () => {
            window.location.href = '/random'
        }
    }
} as const;

interface WayToChooseProps {
    type: ChoiceType;
}

const WayToChoose = ({ type }: WayToChooseProps) => {
    const config = CHOICE_CONFIG[type];

    return (
        <div className={`${config.bg}  rounded-[16px] w-full cursor-pointer`} onClick={config.callback}>
            <div className='pl-4 pt-4 flex flex-col justify-between w-full  no-choice-card'>
                <div className='flex flex-col gap-3 pr-4 w-full'>
                    <div className='text-caption1 font-medium text-text-2'>
                        {config.description}
                    </div>
                    <div className='text-text-1 text-title2 font-bold'>
                        {config.title}
                    </div>
                </div>
                 <div className='w-full flex justify-end items-end'>
                     <Image
                         alt='choiceImage'
                         src={config.image}
                         width={144}
                         height={144}
                         priority
                     />
                 </div>
            </div>
        </div>
    )
}

export default WayToChoose