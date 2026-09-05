import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface MapPinIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function MapPinIcon({ className, size = 28, ...props }: MapPinIconProps) {
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
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle
          cx="12"
          cy="10"
          r="3"
        />
      </svg>
    </div>
  );
}

export { MapPinIcon };
