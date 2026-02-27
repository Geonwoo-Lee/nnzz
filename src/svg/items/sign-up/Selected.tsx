import type { SVGProps } from "react";
const SvgSelected = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={65}
    height={65}
    fill="none"
    {...props}
  >
    <g filter="url(#Selected_svg__a)">
      <rect
        width={32}
        height={32}
        x={16.5}
        y={14}
        fill="#FF334C"
        rx={16}
        shapeRendering="crispEdges"
      />
      <path
        fill="#000"
        fillRule="evenodd"
        stroke="#F8FAFC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.667}
        d="M40.24 24.038a.89.89 0 0 1 0 1.257l-9.778 9.778a.89.89 0 0 1-1.257 0l-4.445-4.445a.889.889 0 1 1 1.257-1.256l3.816 3.815 9.15-9.149a.89.89 0 0 1 1.257 0"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <filter
        id="Selected_svg__a"
        width={64}
        height={64}
        x={0.5}
        y={0.667}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2.667} />
        <feGaussianBlur stdDeviation={8} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_489_5978"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_489_5978"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgSelected;
