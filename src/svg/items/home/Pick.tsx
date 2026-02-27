import type { SVGProps } from "react";
const SvgPick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="#171717" d="M1 9.621 7.62 3l3.863 3.862-6.622 6.621z" />
    <path fill="#FF334C" d="m16.45 3 6.621 6.622-11.036 11.036-6.621-6.622z" />
    <path fill="#FFF1F3" d="m12.035 7.414-.551-.551-6.621 6.62.551.552z" />
  </svg>
);
export default SvgPick;
