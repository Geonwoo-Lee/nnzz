import BasicLayout from "@/src/component/layout/BasicLayout";
import {HeaderTypes} from "@/src/types/common/header";
import {ReactNode} from "react";



const BlogLayout = ({children}: {children: ReactNode}) => {
  return <BasicLayout header={true} headerTitle={''}  back={true} headerType={HeaderTypes.basic} >
    {children}
  </BasicLayout>
}

export default BlogLayout