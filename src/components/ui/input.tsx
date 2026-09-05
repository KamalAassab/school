import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-xl border border-input bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/15 sm:h-13 sm:px-4 sm:text-[15px]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
