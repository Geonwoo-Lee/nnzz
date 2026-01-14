import { ReactNode } from "react";
import { HeaderTypes } from "@/src/types/common/header";
import Header from "@/src/component/server/common/header/Header";

const BasicLayout = ({
  children,
  header,
  headerTitle,
  headerType,
  map,
  setting,
  menu,
  square,
  close,
  logo,
  profileImage,
  back,
  headerBg,
  logoBlack,
  bodyBg,
  overflow = true,
}: {
  children: ReactNode;
  header: boolean;
  headerTitle: string;
  headerType: HeaderTypes;
  setting?: boolean;
  map?: boolean;
  square?: boolean;
  headerBg?: string;
  close?: boolean;
  menu?: boolean;
  logo?: boolean;
  back?: boolean;
  profileImage?: boolean;
  logoBlack?: boolean;
  bodyBg?: string;
  overflow?: boolean;
}) => {
  const bodyHeightRenderer = () => {
    if (header) {
      return "h-basic-body-with-header";
    } else {
      return "h-basic-menu-body";
    }
  };
  return (
    <section>
      {header && (
        <div
          style={headerBg ? { backgroundColor: headerBg } : undefined}
          className={` pl-4 pr-4`}
        >
          <Header.HeaderLayout
            logoBlack={logoBlack}
            headerBg={headerBg}
            back={back}
            logo={logo}
            profileImage={profileImage}
            setting={setting}
            map={map}
            close={close}
            square={square}
            menu={menu}
            type={headerType}
            title={headerTitle}
          />
        </div>
      )}
      <div
        className={`${bodyHeightRenderer()} ${overflow ? 'overflow-y-scroll' : 'overflow-hidden'}`}
        style={bodyBg ? { background: bodyBg } : undefined}
      >
        {children}
      </div>
    </section>
  );
};

export default BasicLayout;
