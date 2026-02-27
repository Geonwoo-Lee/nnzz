import type { SVGProps } from "react";
const SvgKakaoLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M9 .476c-4.97 0-9 3.13-9 6.99 0 2.4 1.558 4.516 3.932 5.774l-.999 3.667c-.088.324.28.582.563.394l4.377-2.904q.554.056 1.127.057c4.97 0 9-3.13 9-6.989S13.97.476 9 .476"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgKakaoLogo;
