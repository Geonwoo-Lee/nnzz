import type { SVGProps } from "react";
const SvgTwinkle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <g clipPath="url(#Twinkle_svg__a)">
      <path
        fill="#fff"
        d="M15.12 14.41c1.71-1.33 4.7-1.55 10.11-1.8-5.41-.24-8.4-.47-10.11-1.8.6-1.02 1.67-2.24 3.22-3.93-1.69 1.55-2.91 2.62-3.93 3.22-1.33-1.71-1.55-4.7-1.8-10.11-.24 5.41-.47 8.4-1.8 10.11-1.02-.6-2.24-1.67-3.93-3.22 1.55 1.69 2.62 2.91 3.22 3.93-1.71 1.33-4.7 1.55-10.11 1.8 5.41.24 8.4.47 10.11 1.8-.6 1.02-1.67 2.24-3.22 3.93 1.69-1.55 2.91-2.62 3.93-3.22 1.33 1.71 1.55 4.7 1.8 10.11.24-5.41.47-8.4 1.8-10.11 1.02.6 2.24 1.67 3.93 3.22-1.55-1.69-2.62-2.91-3.22-3.93"
      />
    </g>
    <defs>
      <clipPath id="Twinkle_svg__a">
        <path fill="#fff" d="M0 0h25.22v25.22H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTwinkle;
