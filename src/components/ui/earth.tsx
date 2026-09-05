import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface EarthIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function EarthIcon({ className, size = 28, ...props }: EarthIconProps) {
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
          d="M21.54 15H17a2 2 0 0 0-2 2v4.54"
        />
        <path
          d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"
        />
        <path
          d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
        />
      </svg>
    </div>
  );
}

export { EarthIcon };
