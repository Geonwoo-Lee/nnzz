import Link from "next/link";
import Image from "next/image";

const TarotCard = () => {
  return (
    <Link className='block w-full aspect-[100/156] relative' href={''}> {/* block 추가 */}
      <Image
        src={'/assets/TarotCard.png'}
        className='object-cover active:scale-105 hover:scale-105 transition-transform duration-300'
        alt={'tarot'}
        fill
      />
    </Link>
  )
}

export default TarotCard