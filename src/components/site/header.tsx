"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "@/components/ui/menu";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { PhoneIcon } from "@/components/ui/phone";
import { FacebookIcon } from "@/components/ui/facebook";
import { InstagramIcon } from "@/components/ui/instagram";
import { YoutubeIcon } from "@/components/ui/youtube";

import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const lastY = React.useRef(0);

  React.useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(!open && y > lastY.current && y > 96);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-3 z-50 px-3 transition-transform duration-300 sm:top-4 sm:px-5 lg:px-8",
        hidden ? "-translate-y-[calc(100%+2rem)]" : "translate-y-0"
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between rounded-full border transition-all duration-300 sm:h-[68px]",
          scrolled
            ? "border-ink/[0.06] bg-background/95 px-3 shadow-[0_12px_35px_-18px_rgba(32,26,21,0.35)] backdrop-blur-lg sm:px-4"
            : "border-transparent bg-background/70 px-3 backdrop-blur-md sm:px-4"
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex h-10 items-center rounded-full px-4 text-[15px] font-medium transition-colors",
                  active
                    ? "bg-ink/[0.06] text-foreground"
                    : "text-foreground/70 hover:bg-ink/[0.04] hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild size="default" variant="default">
            <Link href="/inscription">
              Inscription {siteConfig.year}
              <ArrowUpRightIcon size={16} />
            </Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-ink/[0.06] lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <MenuIcon size={20} />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="flex h-20 shrink-0 items-center px-6">
                <Logo />
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-2">
                {mainNav.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-2xl px-3 py-3.5 transition-colors",
                        active ? "bg-ink text-background" : "text-foreground hover:bg-ink/[0.05]"
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-[13px] tabular-nums",
                          active ? "text-brand" : "text-muted-foreground/70"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg font-medium tracking-tight">
                        {item.label}
                      </span>
                      <ArrowUpRightIcon
                        size={16}
                        className={cn(
                          "ml-auto shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100",
                          active ? "text-background" : "text-foreground/50"
                        )}
                      />
                    </Link>
                  );
                })}
              </nav>

              <div className="shrink-0 border-t border-ink/[0.06] p-6 pt-5">
                <Button asChild className="w-full">
                  <Link href="/inscription">
                    Inscription {siteConfig.year}
                    <ArrowRightIcon size={16} />
                  </Link>
                </Button>

                <div className="mt-5 flex items-center justify-between">
                  <Link
                    href={`tel:${siteConfig.phones[0].replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/70 transition-colors hover:text-primary"
                  >
                    <PhoneIcon size={15} className="shrink-0" />
                    {siteConfig.phones[0]}
                  </Link>
                  <ul className="flex items-center gap-1.5">
                    <li>
                      <Link
                        href={siteConfig.social.facebook}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="School Academy sur Facebook"
                        className="flex size-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-ink/[0.05] hover:text-primary"
                      >
                        <FacebookIcon size={16} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="School Academy sur Instagram"
                        className="flex size-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-ink/[0.05] hover:text-primary"
                      >
                        <InstagramIcon size={16} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={siteConfig.social.youtube}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="School Academy sur YouTube"
                        className="flex size-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-ink/[0.05] hover:text-primary"
                      >
                        <YoutubeIcon size={16} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
