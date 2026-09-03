"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { CaretDown } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn("relative flex items-center", className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("flex flex-1 list-none items-center gap-1", className)}
      {...props}
    />
  );
}

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const triggerStyle =
  "group inline-flex h-10 items-center gap-1 rounded-full px-4 text-[15px] font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-ink/[0.04] outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:text-foreground data-[state=open]:bg-ink/[0.04]";

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(triggerStyle, className)}
      {...props}
    >
      {children}
      <CaretDown
        weight="bold"
        className="size-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-8 data-[motion=from-start]:slide-in-from-left-8 data-[motion=to-end]:slide-out-to-right-8 data-[motion=to-start]:slide-out-to-left-8",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuLink(
  props: React.ComponentProps<typeof NavigationMenuPrimitive.Link>
) {
  return <NavigationMenuPrimitive.Link data-slot="navigation-menu-link" {...props} />;
}

function NavigationMenuViewport({ className }: { className?: string }) {
  return (
    <div className="absolute left-0 top-full flex justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-2xl border border-ink/[0.06] bg-white shadow-[0_20px_50px_-15px_rgba(32,26,21,0.18)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
      />
    </div>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
};
