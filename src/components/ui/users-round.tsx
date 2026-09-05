import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface UsersRoundIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function UsersRoundIcon({ className, size = 28, ...props }: UsersRoundIconProps) {
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
        <path d="M18 21a8 8 0 0 0-16 0" />
        <circle cx="10" cy="8" r="5" />
        <path
          d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"
        />
      </svg>
    </div>
  );
}

export { UsersRoundIcon };
