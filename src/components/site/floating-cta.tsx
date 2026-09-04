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
          className="fixed bottom-6 right-5 z-40 sm:bottom-8 sm:right-8"
        >
          <Link
            href="/inscription"
            className="group flex items-center gap-2.5 rounded-full bg-primary py-3.5 pl-4 pr-5 text-[14px] font-semibold text-primary-foreground shadow-[0_12px_30px_-8px_rgba(184,67,0,0.55)] transition-transform active:scale-[0.97] sm:py-4 sm:pl-5 sm:pr-6"
          >
            <GraduationCapIcon size={20} className="shrink-0 text-brand" />
            <span className="hidden sm:inline">S&rsquo;inscrire · 2026/2027</span>
            <span className="sm:hidden">S&rsquo;inscrire</span>
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
