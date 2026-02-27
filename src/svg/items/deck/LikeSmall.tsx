import type { SVGProps } from "react";
const SvgLikeSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={150}
    height={150}
    fill="none"
    {...props}
  >
    <g filter="url(#LikeSmall_svg__a)">
      <circle cx={75} cy={75} r={20} fill="url(#LikeSmall_svg__b)" />
      <g filter="url(#LikeSmall_svg__c)">
        <path
          fill="url(#LikeSmall_svg__d)"
          d="M79.756 67.51c-3.136 0-4.462 2.18-4.462 2.18s-1.325-2.19-4.461-2.19c-2.65.01-4.872 2.19-4.872 4.796 0 5.973 9.333 10.76 9.333 10.76s9.334-4.787 9.334-10.76c0-2.605-2.222-4.787-4.872-4.787"
          shapeRendering="crispEdges"
        />
      </g>
    </g>
    <defs>
      <linearGradient
        id="LikeSmall_svg__b"
        x1={75}
        x2={75}
        y1={55}
        y2={95}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF999B" />
        <stop offset={1} stopColor="#FF213C" />
      </linearGradient>
      <linearGradient
        id="LikeSmall_svg__d"
        x1={75.294}
        x2={75.294}
        y1={67.5}
        y2={83.056}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={0.541} stopColor="#fff" stopOpacity={0.8} />
        <stop offset={1} stopColor="#fff" stopOpacity={0.6} />
      </linearGradient>
      <filter
        id="LikeSmall_svg__a"
        width={150}
        height={150}
        x={0}
        y={0}
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
        <feGaussianBlur stdDeviation={27.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_636_5798"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_636_5798"
          result="shape"
        />
      </filter>
      <filter
        id="LikeSmall_svg__c"
        width={33.666}
        height={30.555}
        x={58.461}
        y={60}
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
        <feGaussianBlur stdDeviation={3.75} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_636_5798"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_636_5798"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgLikeSmall;
