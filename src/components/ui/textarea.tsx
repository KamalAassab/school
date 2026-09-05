import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-36 w-full rounded-xl border border-input bg-white px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/15 sm:text-[15px]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
