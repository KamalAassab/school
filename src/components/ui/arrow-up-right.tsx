import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ArrowUpRightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function ArrowUpRightIcon({ className, size = 28, ...props }: ArrowUpRightIconProps) {
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
        <g>
          <path d="M7 7H17" />
          <path d="M17 7V17" />
          <path d="M7 17L17 7" />
        </g>
      </svg>
    </div>
  );
}

export { ArrowUpRightIcon };
