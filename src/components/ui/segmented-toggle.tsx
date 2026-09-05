"use client";

import { cn } from "@/lib/utils";

export function SegmentedToggle({
  options,
  value,
  onChange,
  name,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className="inline-flex h-10 sm:h-13 w-full items-center rounded-xl border border-input bg-white p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex h-full flex-1 items-center justify-center rounded-lg sm:rounded-xl text-xs sm:text-[14px] font-medium transition-colors duration-150",
            value === option.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
