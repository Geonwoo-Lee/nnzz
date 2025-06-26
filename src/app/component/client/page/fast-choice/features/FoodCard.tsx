import Image from 'next/image'
import {FastChoiceCardProps} from "@/src/app/types/page/fast-choice/fast-choice";

const FoodCard = (props: FastChoiceCardProps) => {
    const {selected, setSelected, data, index} = props
    console.log(data)

    return <div className={`flex flex-col gap-3 cursor-pointer transition-opacity ${!selected ? 'opacity-40' : 'opacity-100'}`} onClick={() => {
        setSelected(data)
    }}>
        <div className={`food-detail-card-size border border-line-3 rounded-[32px] relative`}>
            <div className='w-full h-full aspect-square'>
                <Image
                    src={data.imageUrl}
                    fill
                    priority={false}
                    className='object-contain p-4'
                    alt='detail-image'
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAgAAAwED/2wBDAAYEhMVExcZFhMXGxchHSAhJSImJiUlKSwyLC0yMT8/"
                />
            </div>
        </div>
        <div className='w-full text-center text-caption1 font-medium text-text-2'>
            {data.category}
        </div>
    </div>
}

export default FoodCard