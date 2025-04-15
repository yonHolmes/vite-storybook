import { SVGProps } from "react";

// https://reactsvgicons.com/react-svg-icons-guide
export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"
      ></path>
    </svg>
  )
}
