import dynamic from "next/dynamic";
import HeaderLayout from "@/src/app/component/server/common/header/component/HeaderLayout";
import Title from "@/src/app/component/server/common/header/component/Title";


const Right = dynamic(() => import('@/src/app/component/client/common/header-elements/Right'), {ssr: false});
const Left = dynamic(() => import('@/src/app/component/client/common/header-elements/Left'), {ssr: false});

const Header = {
    Title,
    Right,
    Left,
    HeaderLayout,
};

export default Header;