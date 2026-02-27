import type { SVGProps } from "react";
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#0F172A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 3.333v9.334"
    />
    <path
      fill="#0F172A"
      fillRule="evenodd"
      d="M2.334 8a1 1 0 0 1 1-1h9.333a1 1 0 1 1 0 2H3.334a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPlus;
