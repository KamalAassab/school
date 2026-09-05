"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCapIcon } from "@/components/ui/graduation-cap";
import { cn } from "@/lib/utils";

export function FloatingCta() {
  const pathname = usePathname();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/inscription") return null;

  // Kept mounted and toggled with CSS so both the enter and the exit
  // transition come for free, matching the previous motion timing
  // (0.3s, cubic-bezier(0.16, 1, 0.3, 1)).
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:right-8 sm:bottom-8",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-90 opacity-0"
      )}
    >
      <Link
        href="/inscription"
        aria-label="S&rsquo;inscrire pour l&rsquo;année 2026/2027"
        tabIndex={visible ? undefined : -1}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_30px_-8px_rgba(184,67,0,0.55)] transition-transform active:scale-[0.97] sm:w-auto sm:gap-2.5 sm:px-6"
      >
        <GraduationCapIcon size={20} className="shrink-0 text-white" />
        <span className="hidden text-[14px] font-semibold sm:inline">
          S&rsquo;inscrire · 2026/2027
        </span>
      </Link>
    </div>
  );
}
