import {HeaderProps} from "@/src/app/types/common/header";
import Header from "../Header";


const HeaderLayout = ({title, type, setting, headerBg, map, close, menu, square}: HeaderProps) => {
    return (
        <header className={`w-full max-w-[640px] flex items-center justify-between relative h-header-height ${headerBg ? `bg-${headerBg}` : 'bg-slate-50'}`}>
            <div className=" flex-shrink-0 ">
                <Header.Left type={type} setting={setting}/>
            </div>
            <div className="absolute inset-x-0 flex justify-center max-w-[180px] mx-auto whitespace-nowrap">
                {title && <Header.Title title={title}/>}
            </div>
            <div className="flex-shrink-0">
                <Header.Right type={type} setting={setting} map={map} close={close} menu={menu} square={square}/>
            </div>
        </header>
    )
}

export default HeaderLayout
