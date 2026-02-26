import BottomSheet from "@/src/component/client/common/bottomSheet/BottomSheet";
import CloseDark from "../../../../../public/svg/header/CloseDark.svg";
import { useHeightUnit } from "@/src/hooks/useHeightUnit";
import Image from "next/image";
import KakaoButton from "@/src/component/client/common/button/KakaoButton";
import Button from "@/src/component/client/common/button/Button";

const LoginBottomSheet = ({
  close,
  open,
  onLoginSuccess,
}: {
  close: () => void;
  open: boolean;
  onLoginSuccess?: () => void;
}) => {
  const { unit } = useHeightUnit();

  return (
    <BottomSheet
      open={open}
      backdrop
      animation
      close={() => {
        close();
      }}
      nonPadding
      disableScroll
    >
      <div className="flex flex-col relative" style={{ height: `90${unit}` }}>
        <div className="h-[52px] flex items-center justify-end px-2 flex-shrink-0">
          <CloseDark onClick={close} className="cursor-pointer" />
        </div>

        <div className="flex-1 w-full flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1"></div>
          <div className="flex-[2] flex flex-col items-center justify-center px-4">
            <Image
              width={144}
              height={144}
              src={"/images/items/FindMenu.png"}
              alt={"login-bottomSheet"}
              className="flex-shrink-0"
            />
            <div className="flex flex-col gap-3 items-center text-center mt-6">
              <div className="text-title2 font-medium text-text-1">
                &lsquo;진짜&rsquo; 원하는 메뉴를 찾는 시간
              </div>
              <div className="text-body2 font-regular text-text-2">
                로그인만 하면 계속 편하게 맛집을 찾을 수 있어요.
                <br />
                복잡한 절차 없이, 한 번 로그인하면 끝!
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-6 px-4 flex flex-col gap-2 flex-shrink-0 bg-white">
          <KakaoButton onLoginSuccess={onLoginSuccess} />
          <Button size="lg" type="muted" onClick={close}>
            닫기
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default LoginBottomSheet;
