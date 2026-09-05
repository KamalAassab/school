import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface GraduationCapIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function GraduationCapIcon({ className, size = 28, ...props }: GraduationCapIconProps) {
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
        <g
          style={{ transformOrigin: "12px 12px" }}
        >
          <path d="M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          <path
            d="M22 10v6"
            style={{
              transformBox: "fill-box",
              transformOrigin: "top center",
            }}
          />
        </g>
      </svg>
    </div>
  );
}

export { GraduationCapIcon };
