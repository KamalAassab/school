"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const listRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={listRef}
      className="w-full max-w-full sm:w-auto"
    >
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          "grid grid-cols-4 w-full items-center gap-1 rounded-full bg-muted p-1 sm:inline-flex sm:w-fit sm:min-w-0 sm:p-1.5",
          className
        )}
        {...props}
      />
    </div>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-9 sm:h-10 min-w-0 items-center justify-center whitespace-nowrap rounded-full px-2 xs:px-3 sm:px-5 text-xs sm:text-sm font-medium text-muted-foreground transition-[background-color,color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-ink data-[state=active]:text-background data-[state=active]:shadow-[0_6px_16px_-6px_rgba(32,26,21,0.45)]",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
