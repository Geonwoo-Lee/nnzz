import Link from "next/link";
import RightArrow from '../../../../../../../public/svg/items/common/RightArrow.svg'


const SettingList = () => {
    const settingConfig = [
        {
            title: '이용약관',
            link: '/',
        },{
            title: '개인정보 처리방침',
            link: '/',
        },{
            title: 'FAQ',
            link: '/',
        }
    ]
    return (
        <div className='flex flex-col'>
            {
                settingConfig.map((el, index) => (
                    <Link href={el.link}  className='h-[56px] flex items-center' key={`setting-key-${index}`}>
                        <div className='flex flex-row justify-between w-full px-4'>
                            <div className='text-body1 font-medium text-text-2'>
                                {el.title}
                            </div>
                            <RightArrow/>
                        </div>
                    </Link>
                ) )
            }
        </div>
    )
}

export default SettingList