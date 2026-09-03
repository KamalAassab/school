import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 shrink-0", className)}
      aria-label="School Academy — accueil"
    >
      <Image
        src="/logo.svg"
        alt="School Academy"
        width={40}
        height={44}
        priority
        className="h-10 w-auto"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[17px] font-semibold tracking-tight",
            dark ? "text-background" : "text-foreground"
          )}
        >
          School Academy
        </span>
        <span
          className={cn(
            "text-[11px] tracking-wide",
            dark ? "text-background/55" : "text-muted-foreground"
          )}
        >
          Tremplin vers l&rsquo;excellence
        </span>
      </span>
    </Link>
  );
}
