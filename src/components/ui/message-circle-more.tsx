import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface MessageCircleMoreIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function MessageCircleMoreIcon({ className, size = 28, ...props }: MessageCircleMoreIconProps) {
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
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <path
          d="M8 12h.01"
        />
        <path
          d="M12 12h.01"
        />
        <path
          d="M16 12h.01"
        />
      </svg>
    </div>
  );
}

export { MessageCircleMoreIcon };
