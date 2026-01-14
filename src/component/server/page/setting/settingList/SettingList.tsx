import Link from "next/link";
import RightArrow from "../../../../../../public/svg/items/common/RightArrow.svg";

interface SettingListProps {
  isLogin: boolean;
}

const SettingList = ({ isLogin }: SettingListProps) => {
  const settingConfig = [
    {
      title: "마이 픽 식당 보기",
      link: "/mypick",
      requireLogin: true,
    },
    {
      title: "이용약관",
      link: "https://docs.google.com/document/d/e/2PACX-1vQqNUxh8HWQqMNLXUfsgoUimzHFc3xAh8-KFv0pgDrMcePYdbb0C6NBcTE7gaUc2FymErQCdWo-85UL/pub",
      requireLogin: false,
    },
    {
      title: "개인정보 처리방침",
      link: "https://docs.google.com/document/d/e/2PACX-1vSm-L9r_l5va7UPcmKuMTjN4tDFf_g5UJPNm9xa3ubLSshNHguUTujsedKLytKdQWhnoRWxcwcJyrEQ/pub",
      requireLogin: false,
    },
    {
      title: "위치기반 서비스약관",
      link: "https://docs.google.com/document/d/e/2PACX-1vSAriVCsf8XBtUMxrncnySmKVC9WKwA-BNX3LfYuhpuqHkkEPHVjvoMBo8Fu_Qip1-fpCNXs64RyVhA/pub",
      requireLogin: false,
    },
  ];
  return (
    <div className="flex flex-col">
      {settingConfig
        .filter((el) => !el.requireLogin || isLogin)
        .map((el, index) => (
          <Link
            href={el.link}
            className="h-[56px] flex items-center"
            key={`setting-key-${index}`}
          >
            <div className="flex flex-row justify-between w-full ">
              <div className="text-body1 font-medium text-text-2">{el.title}</div>
              <RightArrow />
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SettingList;
