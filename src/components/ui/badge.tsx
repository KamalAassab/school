import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-tight w-fit whitespace-nowrap",
  {
    variants: {
      variant: {
        brand: "bg-brand text-brand-foreground",
        cream: "bg-secondary text-secondary-foreground",
        outline: "border border-ink/15 text-foreground",
        dark: "bg-ink text-background",
      },
    },
    defaultVariants: {
      variant: "cream",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
