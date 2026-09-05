import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface WaypointsIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function WaypointsIcon({ className, size = 28, ...props }: WaypointsIconProps) {
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
        <circle
          cx="12"
          cy="4.5"
          r="2.5"
        />
        <path
          d="m10.2 6.3-3.9 3.9"
        />
        <circle
          cx="4.5"
          cy="12"
          r="2.5"
        />
        <path
          d="M7 12h10"
        />
        <circle
          cx="19.5"
          cy="12"
          r="2.5"
        />
        <path
          d="m13.8 17.7 3.9-3.9"
        />
        <circle
          cx="12"
          cy="19.5"
          r="2.5"
        />
      </svg>
    </div>
  );
}

export { WaypointsIcon };
