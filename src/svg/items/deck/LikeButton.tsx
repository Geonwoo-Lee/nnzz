import type { SVGProps } from "react";
const SvgLikeButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <circle cx={32} cy={32} r={32} fill="url(#LikeButton_svg__a)" />
    <g filter="url(#LikeButton_svg__b)">
      <path
        fill="url(#LikeButton_svg__c)"
        d="M43.143 15.03c-7.529 0-10.686 4.985-10.686 4.985s-3.157-5.008-10.686-5.008c-6.2.023-11.485 5.008-11.485 11.037 0 14.074 22.171 25.778 22.171 25.778S54.63 40.118 54.63 26.044c0-6.03-5.286-11.014-11.486-11.014"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <linearGradient
        id="LikeButton_svg__a"
        x1={32}
        x2={32}
        y1={0}
        y2={64}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF999B" />
        <stop offset={1} stopColor="#FF213C" />
      </linearGradient>
      <linearGradient
        id="LikeButton_svg__c"
        x1={32.457}
        x2={32.457}
        y1={15.007}
        y2={51.822}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={0.541} stopColor="#fff" stopOpacity={0.8} />
        <stop offset={1} stopColor="#fff" stopOpacity={0.6} />
      </linearGradient>
      <filter
        id="LikeButton_svg__b"
        width={48.343}
        height={40.815}
        x={8.286}
        y={13.007}
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
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_327_4304"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_327_4304"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgLikeButton;
