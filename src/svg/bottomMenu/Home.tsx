import type { SVGProps } from "react";
const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="var(--fill-color, #D1D5DB)"
      d="M11.512 2.143a.9.9 0 0 1 .976 0l9.091 5.834c.262.169.421.46.421.774v12.332a.913.913 0 0 1-.91.917h-8.18v-9.168a.913.913 0 0 0-.91-.917.913.913 0 0 0-.91.917V22H2.91a.913.913 0 0 1-.91-.917V8.751c0-.314.159-.605.42-.774z"
    />
  </svg>
);
export default SvgHome;
