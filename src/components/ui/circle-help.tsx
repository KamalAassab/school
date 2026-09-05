import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface CircleHelpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function CircleHelpIcon({ className, size = 28, ...props }: CircleHelpIconProps) {
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
        <circle cx="12" cy="12" r="10" />
        <g
        >
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </g>
      </svg>
    </div>
  );
}

export { CircleHelpIcon };
