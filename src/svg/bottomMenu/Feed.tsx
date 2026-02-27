import type { SVGProps } from "react";
const SvgFeed = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g fill="var(--fill-color, #D1D5DB)" clipPath="url(#feed_svg__a)">
      <path d="M22 17.745c0 1.57-1.27 2.848-2.827 2.848s-2.823-1.278-2.823-2.849V7.47H22" />
      <path d="M15.946 17.744c0 1.799 1.444 3.256 3.227 3.256H5.58C3.605 21 2.001 19.384 2 17.39V2h13.946zM4 10v2h7v-2zm0-2h10V6H4z" />
    </g>
    <defs>
      <clipPath id="feed_svg__a">
        <path fill="#fff" d="M2 2h20v19H2z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgFeed;
