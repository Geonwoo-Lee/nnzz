import type { SVGProps } from "react";
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path d="M0 0h24v24H0z" />
    <path
      fill="#94A3B8"
      fillRule="evenodd"
      d="M17.843 4.65a1.5 1.5 0 0 0-1.066.44L5.799 16.069 5 19l2.933-.8L18.909 7.224a1.508 1.508 0 0 0-1.066-2.574m-1.208-1.41a3.157 3.157 0 0 1 3.44 5.15L8.943 19.52a.8.8 0 0 1-.366.213l-4.535 1.237a.825.825 0 0 1-1.013-1.013l1.237-4.535a.8.8 0 0 1 .212-.366L15.611 3.925a3.2 3.2 0 0 1 1.024-.685"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgEdit;
