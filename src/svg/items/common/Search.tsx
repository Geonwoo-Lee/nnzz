import type { SVGProps } from "react";
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.6 8.325a4.725 4.725 0 1 1 8.127 3.279.7.7 0 0 0-.123.123A4.725 4.725 0 0 1 3.6 8.325m8.517 4.746a6.075 6.075 0 1 1 .955-.955l2.48 2.482a.675.675 0 0 1-.954.954z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgSearch;
