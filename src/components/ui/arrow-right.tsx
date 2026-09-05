import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ArrowRightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function ArrowRightIcon({ className, size = 28, ...props }: ArrowRightIconProps) {
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
          d="M5 12h14"
        />
        <path
          d="m12 5 7 7-7 7"
        />
      </svg>
    </div>
  );
}

export { ArrowRightIcon };
