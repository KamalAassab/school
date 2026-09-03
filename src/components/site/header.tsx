"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { List, ArrowUpRight } from "@phosphor-icons/react";

import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { mainNav, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-ink/[0.06]"
          : "bg-background/0 border-b border-transparent"
      )}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Logo />

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {mainNav.map((item) =>
              "children" in item && item.children ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[380px] gap-1 p-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={child.href}
                              className="flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-muted"
                            >
                              <span className="font-display text-[15px] font-medium">
                                {child.label}
                              </span>
                              <span className="text-[13px] text-muted-foreground">
                                {child.description}
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="inline-flex h-10 items-center rounded-full px-4 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-ink/[0.04] hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild size="default" variant="default">
            <Link href="/inscription">
              Inscription {siteConfig.year}
              <ArrowUpRight weight="bold" className="size-4" />
            </Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-ink/[0.06] lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <List weight="bold" className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="flex h-20 items-center px-6">
                <Logo />
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-2">
                {mainNav.map((item) => (
                  <div key={item.label} className="py-1">
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3 py-3 font-display text-lg font-medium text-foreground"
                    >
                      {item.label}
                    </Link>
                    {"children" in item && item.children ? (
                      <div className="ml-3 flex flex-col border-l border-ink/[0.08] pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="py-2.5 text-[15px] text-muted-foreground"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </nav>
              <div className="border-t border-ink/[0.06] p-6">
                <Button asChild className="w-full">
                  <Link href="/inscription">Inscription {siteConfig.year}</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent"
      />
    </header>
  );
}
