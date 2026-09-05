import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface MessageSquareIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function MessageSquareIcon({ className, size = 28, ...props }: MessageSquareIconProps) {
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </div>
  );
}

export { MessageSquareIcon };
