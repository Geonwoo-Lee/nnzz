import type { SVGProps } from "react";
const SvgYoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="#FF334C" d="M2 7h20v13H2z" />
    <path fill="#fff" d="m15 13-5 3v-6z" />
    <path fill="#FFF1F3" d="M2 5h20v2H2z" />
    <path
      fill="#171717"
      d="M6 5H2v2h3zM18 7h4V5h-3zM6 7h5l1-2H7zM12 7h5l1-2h-5z"
    />
  </svg>
);
export default SvgYoutubeIcon;
