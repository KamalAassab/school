import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface StampIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function StampIcon({ className, size = 28, ...props }: StampIconProps) {
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
          d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13"
        />
        <path
          d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z"
        />
        <path
          d="M5 22h14"
          style={{ transformOrigin: "12px 22px" }}
        />
      </svg>
    </div>
  );
}

export { StampIcon };
