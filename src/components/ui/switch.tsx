"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-ink/15",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 translate-x-1 data-[state=checked]:translate-x-[22px]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
