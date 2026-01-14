import BasicLayout from "@/src/component/layout/BasicLayout";
import { HeaderTypes } from "@/src/types/common/header";
import { ReactNode } from "react";

const MyPickLayout = ({ children }: { children: ReactNode }) => {
  return (
    <BasicLayout
      header={true}
      headerTitle={"마이 픽"}
      headerType={HeaderTypes.history}
    >
      {children}
    </BasicLayout>
  );
};

export default MyPickLayout;
