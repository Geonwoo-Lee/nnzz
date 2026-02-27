import type { SVGProps } from "react";
const SvgRandom = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="var(--fill-color, #D1D5DB)"
      fillRule="evenodd"
      d="M20 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm-3.754 6.717a2.47 2.47 0 0 0-3.64 0l-.534.566a.1.1 0 0 1-.145 0l-.534-.566a2.47 2.47 0 0 0-3.64 0c-1.005 1.066-1.005 2.795 0 3.861l4.175 4.429a.1.1 0 0 0 .145 0l4.173-4.429c1.005-1.066 1.005-2.795 0-3.861"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgRandom;
