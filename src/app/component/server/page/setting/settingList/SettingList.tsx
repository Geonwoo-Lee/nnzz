import Link from "next/link";
import RightArrow from '../../../../../../../public/svg/items/common/RightArrow.svg'


const SettingList = () => {
    const settingConfig = [
        {
            title: '이용약관',
            link: 'https://docs.google.com/document/d/e/2PACX-1vQqNUxh8HWQqMNLXUfsgoUimzHFc3xAh8-KFv0pgDrMcePYdbb0C6NBcTE7gaUc2FymErQCdWo-85UL/pub',
        },{
            title: '개인정보 처리방침',
            link: 'https://docs.google.com/document/d/e/2PACX-1vSm-L9r_l5va7UPcmKuMTjN4tDFf_g5UJPNm9xa3ubLSshNHguUTujsedKLytKdQWhnoRWxcwcJyrEQ/pub',
        },{
            title: '위치기반 서비스약관',
            link: 'https://docs.google.com/document/d/e/2PACX-1vSAriVCsf8XBtUMxrncnySmKVC9WKwA-BNX3LfYuhpuqHkkEPHVjvoMBo8Fu_Qip1-fpCNXs64RyVhA/pub',
        }
    ]
    return (
        <div className='flex flex-col'>
            {
                settingConfig.map((el, index) => (
                    <Link href={el.link}  className='h-[56px] flex items-center' key={`setting-key-${index}`}>
                        <div className='flex flex-row justify-between w-full '>
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