"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon } from "@/components/ui/chevron-down";
import { CircleCheckIcon } from "@/components/ui/circle-check";

import { cn } from "@/lib/utils";

function Dropdown(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="dropdown" {...props} />;
}

const triggerSizes = {
  default: "h-10 px-3 text-[13.5px] sm:h-12 sm:px-5 sm:text-[15px]",
  sm: "h-9 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm",
  lg: "h-11 px-4 text-sm sm:h-14 sm:px-6 sm:text-base",
};

interface DropdownTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  placeholder?: string;
  size?: keyof typeof triggerSizes;
}

function DropdownTrigger({
  className,
  children,
  placeholder,
  size = "default",
  ...props
}: DropdownTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="dropdown-trigger"
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-full border border-ink/15 bg-white font-medium tracking-tight text-foreground outline-none transition-all duration-200 hover:border-ink/30 hover:bg-ink/[0.01] data-[placeholder]:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/15 cursor-pointer select-none",
        triggerSizes[size],
        className
      )}
      {...props}
    >
      <span className="truncate">
        <SelectPrimitive.Value placeholder={placeholder} />
      </span>
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon
          size={18}
          className="shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function DropdownContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="dropdown-content"
        position={position}
        className={cn(
          "relative z-50 max-h-[min(24rem,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-ink/[0.06] bg-white p-1.5 text-foreground shadow-[0_20px_45px_-15px_rgba(32,26,21,0.25)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "space-y-0.5",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function DropdownItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="dropdown-item"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-[14px] text-foreground outline-none transition-colors data-[highlighted]:bg-secondary data-[state=checked]:font-medium data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CircleCheckIcon size={16} className="shrink-0 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function DropdownLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="dropdown-label"
      className={cn(
        "px-3.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownLabel };
