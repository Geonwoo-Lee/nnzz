import type { SVGProps } from "react";
const SvgAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={65}
    fill="none"
    {...props}
  >
    <g filter="url(#Add_svg__a)">
      <rect
        width={32}
        height={32}
        x={16}
        y={14}
        fill="#FF334C"
        rx={16}
        shapeRendering="crispEdges"
      />
      <path
        stroke="#F8FAFC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.667}
        d="M32 23.778v12.444"
      />
      <path
        fill="#F8FAFC"
        fillRule="evenodd"
        d="M24.444 30c0-.736.597-1.333 1.334-1.333h12.444a1.333 1.333 0 1 1 0 2.666H25.778A1.333 1.333 0 0 1 24.444 30"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <filter
        id="Add_svg__a"
        width={64}
        height={64}
        x={0}
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
          result="effect1_dropShadow_528_4949"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_528_4949"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgAdd;
