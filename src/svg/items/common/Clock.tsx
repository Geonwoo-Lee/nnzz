import type { SVGProps } from "react";
const SvgClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#FF6477"
      d="M7.001 12.833a5.833 5.833 0 1 0 0-11.666 5.833 5.833 0 0 0 0 11.666"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M7 3c.322 0 .583.261.583.583v3.14l2.01 1.005a.583.583 0 0 1-.521 1.044L6.738 7.605a.58.58 0 0 1-.322-.522v-3.5c0-.322.261-.583.583-.583"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgClock;
