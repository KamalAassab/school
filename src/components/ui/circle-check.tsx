import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface CircleCheckIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function CircleCheckIcon({ className, size = 28, ...props }: CircleCheckIconProps) {
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
        <path
          d="m9 12 2 2 4-4"
        />
      </svg>
    </div>
  );
}

export { CircleCheckIcon };
