import type { SVGProps } from "react";
const SvgDisLikeButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <circle cx={32} cy={32} r={32} fill="url(#DisLikeButton_svg__a)" />
    <g filter="url(#DisLikeButton_svg__b)">
      <path
        fill="url(#DisLikeButton_svg__c)"
        fillRule="evenodd"
        d="M45.858 16.526a3.54 3.54 0 0 0-5.01 0L32 25.374l-8.848-8.848a3.54 3.54 0 0 0-5.01 0l-1.616 1.616a3.54 3.54 0 0 0 0 5.01L25.374 32l-8.848 8.848a3.54 3.54 0 0 0 0 5.01l1.616 1.617a3.54 3.54 0 0 0 5.01 0L32 38.627l8.848 8.848a3.54 3.54 0 0 0 5.01 0l1.617-1.617a3.54 3.54 0 0 0 0-5.01L38.627 32l8.848-8.848a3.54 3.54 0 0 0 0-5.01z"
        clipRule="evenodd"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <linearGradient
        id="DisLikeButton_svg__a"
        x1={32}
        x2={32}
        y1={0}
        y2={64}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#75667D" />
        <stop offset={1} stopColor="#322448" />
      </linearGradient>
      <linearGradient
        id="DisLikeButton_svg__c"
        x1={32}
        x2={32}
        y1={15.526}
        y2={48.475}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={0.541} stopColor="#fff" stopOpacity={0.8} />
        <stop offset={1} stopColor="#fff" stopOpacity={0.6} />
      </linearGradient>
      <filter
        id="DisLikeButton_svg__b"
        width={35}
        height={35}
        x={14.525}
        y={14.526}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_327_4301"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_327_4301"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgDisLikeButton;
