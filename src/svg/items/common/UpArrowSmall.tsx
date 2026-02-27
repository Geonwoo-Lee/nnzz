import type { SVGProps } from "react";
const SvgUpArrowSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#0F172A"
      fillRule="evenodd"
      d="M8.47 6.22a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 1 1-1.06 1.06L9 7.81l-3.97 3.97a.75.75 0 0 1-1.06-1.06z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgUpArrowSmall;
