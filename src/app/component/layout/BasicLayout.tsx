import {ReactNode} from "react";
import {HeaderTypes} from "@/src/app/types/common/header";
import Header from "@/src/app/component/server/common/header/Header";


const BasicLayout = ({children, header, headerTitle, headerType, map, setting, menu, square, close, logo, profileImage}: {
    children: ReactNode,
    header: boolean,
    headerTitle: string,
    headerType: HeaderTypes,
    setting?: boolean,
    map?: boolean;
    square?: boolean;
    close?: boolean;
    menu?: boolean;
    logo?: boolean;
    profileImage?: boolean
}) => {
    const bodyHeightRenderer = () => {
        if (header) {
            return "h-basic-body-with-header"
        } else {
            return "h-basic-menu-body"
        }
    }
    return <section>
        {
            header && <div className="pl-4 pr-4">
                <Header.HeaderLayout logo={logo} profileImage={profileImage} setting={setting} map={map} close={close} square={square} menu={menu} type={headerType} title={headerTitle} />
            </div>
        }
        <div className={`${bodyHeightRenderer()} overflow-y-scroll`}>
            {children}
        </div>
    </section>
}

export default BasicLayout