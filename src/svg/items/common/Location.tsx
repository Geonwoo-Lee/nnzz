import type { SVGProps } from "react";
const SvgLocation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#64748B"
      fillRule="evenodd"
      d="M2.25 9a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0m7.5 5.197V12.75a.75.75 0 0 0-1.5 0v1.447A5.25 5.25 0 0 1 3.803 9.75H5.25a.75.75 0 0 0 0-1.5H3.803A5.25 5.25 0 0 1 8.25 3.803V5.25a.75.75 0 0 0 1.5 0V3.803a5.25 5.25 0 0 1 4.447 4.447H12.75a.75.75 0 0 0 0 1.5h1.447a5.25 5.25 0 0 1-4.447 4.447"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLocation;
