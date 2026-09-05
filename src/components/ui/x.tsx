import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface XIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function XIcon({ className, size = 28, ...props }: XIconProps) {
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
          d="M18 6 6 18"
        />
        <path
          d="m6 6 12 12"
        />
      </svg>
    </div>
  );
}

export { XIcon };
