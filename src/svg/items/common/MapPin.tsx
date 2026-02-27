import type { SVGProps } from "react";
const SvgMapPin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#FF6477"
      d="M12.25 5.834c0 4.083-5.25 7.583-5.25 7.583s-5.25-3.5-5.25-7.583a5.25 5.25 0 1 1 10.5 0"
    />
    <path
      fill="#fff"
      d="M7 7.584a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5"
    />
  </svg>
);
export default SvgMapPin;
