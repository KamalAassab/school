"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCapIcon } from "@/components/ui/graduation-cap";

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

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 sm:right-8 sm:bottom-8"
        >
          <Link
            href="/inscription"
            aria-label="S&rsquo;inscrire pour l&rsquo;année 2026/2027"
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_30px_-8px_rgba(184,67,0,0.55)] transition-transform active:scale-[0.97] sm:w-auto sm:gap-2.5 sm:px-6"
          >
            <GraduationCapIcon size={20} className="shrink-0 text-brand" />
            <span className="hidden text-[14px] font-semibold sm:inline">
              S&rsquo;inscrire · 2026/2027
            </span>
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
