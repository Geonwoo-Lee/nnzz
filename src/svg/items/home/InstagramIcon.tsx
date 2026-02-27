import type { SVGProps } from "react";
const SvgInstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <rect
      width={18}
      height={18}
      x={3}
      y={3}
      fill="url(#instagramIcon_svg__a)"
      rx={4}
    />
    <circle cx={12} cy={12} r={4} stroke="#fff" strokeWidth={2} />
    <circle cx={17.5} cy={6.5} r={1} fill="#fff" />
    <defs>
      <linearGradient
        id="instagramIcon_svg__a"
        x1={3}
        x2={21}
        y1={21}
        y2={3}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FD5" />
        <stop offset={0.5} stopColor="#FF543E" />
        <stop offset={1} stopColor="#C837AB" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgInstagramIcon;
