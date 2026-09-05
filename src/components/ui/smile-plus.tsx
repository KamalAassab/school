import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface SmilePlusIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function SmilePlusIcon({ className, size = 28, ...props }: SmilePlusIconProps) {
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
        <path d="M22 11v1a10 10 0 1 1-9-10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
        <path d="M16 5h6" />
        <path d="M19 2v6" />
      </svg>
    </div>
  );
}

export { SmilePlusIcon };
