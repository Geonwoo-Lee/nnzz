import type { SVGProps } from "react";
const SvgSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#334155"
      fillRule="evenodd"
      d="M15.316 4.895H8.684a3.79 3.79 0 0 0-3.79 3.79v6.63a3.79 3.79 0 0 0 3.79 3.79h6.632a3.79 3.79 0 0 0 3.79-3.79v-6.63a3.79 3.79 0 0 0-3.79-3.79M8.684 3A5.684 5.684 0 0 0 3 8.684v6.632A5.684 5.684 0 0 0 8.684 21h6.632A5.684 5.684 0 0 0 21 15.316V8.684A5.684 5.684 0 0 0 15.316 3z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgSquare;
