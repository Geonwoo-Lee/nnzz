import type { SVGProps } from "react";
const SvgLocationPin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g clipPath="url(#LocationPin_svg__a)">
      <path
        fill="#64748B"
        d="M13.142 6.577c0 2.647-2.113 4.84-4.424 7.198a1.005 1.005 0 0 1-1.434 0c-2.31-2.357-4.424-4.55-4.424-7.198 0-2.92 2.302-5.288 5.141-5.288s5.14 2.367 5.14 5.288z"
      />
      <path fill="#fff" d="M10 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
    </g>
    <defs>
      <clipPath id="LocationPin_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLocationPin;
