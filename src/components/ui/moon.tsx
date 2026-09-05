import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface MoonIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function MoonIcon({ className, size = 28, ...props }: MoonIconProps) {
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
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </div>
  );
}

export { MoonIcon };
