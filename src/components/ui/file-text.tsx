import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface FileTextIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function FileTextIcon({ className, size = 28, ...props }: FileTextIconProps) {
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
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path
          d="M10 9H8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16 13H8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16 17H8"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export { FileTextIcon };
