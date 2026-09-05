import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface LanguagesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function LanguagesIcon({ className, size = 28, ...props }: LanguagesIconProps) {
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
          d="m5 8 6 6"
        />
        <path
          d="m4 14 6-6 3-3"
        />
        <path
          d="M2 5h12"
        />
        <path
          d="M7 2h1"
        />
        <path
          d="m22 22-5-10-5 10"
        />
        <path
          d="M14 18h6"
        />
      </svg>
    </div>
  );
}

export { LanguagesIcon };
