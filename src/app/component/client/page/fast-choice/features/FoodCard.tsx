import Image from 'next/image'
import {FastChoiceCardProps} from "@/src/app/types/page/fast-choice/fast-choice";

const FoodCard = (props: FastChoiceCardProps) => {
    const {selected, setSelected, data} = props

    return <div className={`flex flex-col gap-3 cursor-pointer transition-opacity ${!selected ? 'opacity-40' : 'opacity-100'}`} onClick={() => {
        setSelected(data)
    }}>
        <div className={`food-detail-card-size border border-line-3 rounded-[32px] relative`}>
            <div className='w-full h-full aspect-square'>
                <Image
                    src={data.imageUrl}
                    fill
                    className='object-contain p-4'
                    alt='detail-image'
                />
            </div>
        </div>
        <div className='w-full text-center text-caption1 font-medium text-text-2'>
            {data.category}
        </div>
    </div>
}

export default FoodCard