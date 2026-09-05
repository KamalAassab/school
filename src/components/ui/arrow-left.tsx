import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ArrowLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function ArrowLeftIcon({ className, size = 28, ...props }: ArrowLeftIconProps) {
  return (
    <div
      className={cn("icon-anim", className)}
      {...props}
    >
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m12 19-7-7 7-7"
        />
        <path
          d="M19 12H5"
        />
      </svg>
    </div>
  );
}

export { ArrowLeftIcon };
