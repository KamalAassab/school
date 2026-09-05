import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface CookingPotIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function CookingPotIcon({ className, size = 28, ...props }: CookingPotIconProps) {
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
        <g
          style={{ transformOrigin: "12px 16px" }}
        >
          <path d="M2 12h20" />
          <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
        </g>
        <g
          style={{ transformOrigin: "18px 6px" }}
        >
          <path d="m4 8 16-4" />
          <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
        </g>
      </svg>
    </div>
  );
}

export { CookingPotIcon };
