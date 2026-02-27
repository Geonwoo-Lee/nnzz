import type { SVGProps } from "react";
const SvgMap = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.504 1.132a1 1 0 0 1 .943-.026l7.522 3.76 6.535-3.734A1 1 0 0 1 24 2v16a1 1 0 0 1-.504.868l-7 4a1 1 0 0 1-.943.026l-7.522-3.76-6.535 3.734A1 1 0 0 1 0 22V6a1 1 0 0 1 .504-.868zm.527 2.002L2 6.58v13.697l5.504-3.145a1 1 0 0 1 .943-.026l7.522 3.76L22 17.42V3.723l-5.504 3.145a1 1 0 0 1-.943.026z"
      clipRule="evenodd"
    />
    <path
      fill="#334155"
      fillRule="evenodd"
      d="M8 1a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1M16 5a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgMap;
