import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  dark = false,
  showText = true,
}: {
  className?: string;
  dark?: boolean;
  showText?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 shrink-0", className)}
      aria-label="School Academy, accueil"
    >
      <Image
        src="/logo.svg"
        alt="School Academy"
        width={40}
        height={44}
        priority
        className="h-10 w-auto shrink-0"
      />
      <span
        className={cn(
          "flex flex-col leading-none overflow-hidden transition-all duration-300",
          showText ? "max-w-[220px] opacity-100" : "max-w-0 opacity-0"
        )}
      >
        <span
          className={cn(
            "whitespace-nowrap font-display text-[17px] font-semibold tracking-tight",
            dark ? "text-background" : "text-foreground"
          )}
        >
          School Academy
        </span>
        <span
          className={cn(
            "whitespace-nowrap text-[11px] tracking-wide",
            dark ? "text-background/55" : "text-muted-foreground"
          )}
        >
          Tremplin vers l&rsquo;excellence
        </span>
      </span>
    </Link>
  );
}
