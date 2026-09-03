"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkle } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-[-120px] size-[520px] rounded-full bg-brand/[0.10] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-40 size-[420px] rounded-full bg-secondary/60 blur-3xl"
      />

      <div className="container-page relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-[13px] font-medium text-secondary-foreground">
            <Sparkle weight="fill" className="size-3.5 text-primary" />
            Inscriptions {"2025/2026"} ouvertes
          </span>

          <h1 className="font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-[3.6rem]">
            Le tremplin de vos enfants vers{" "}
            <span className="text-primary">l&rsquo;excellence</span>.
          </h1>

          <p className="max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground sm:text-lg">
            Du préscolaire au lycée, School Academy accompagne chaque élève avec une
            pédagogie exigeante, une ouverture internationale et un centre agréé
            Cambridge Assessment English.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/inscription">
                Inscrire mon enfant
                <ArrowRight weight="bold" className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/presentation">
                <PlayCircle weight="regular" className="size-5" />
                Découvrir l&rsquo;école
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] sm:aspect-[5/5.2] lg:aspect-[4/4.6]">
            <Image
              src="/images/eleves-hero.jpg"
              alt="Élèves de School Academy"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_20px_45px_-15px_rgba(32,26,21,0.25)] sm:-left-8 sm:p-5"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-brand/12 text-primary sm:size-12">
              <span className="font-display text-lg font-semibold">4</span>
            </div>
            <div className="pr-1">
              <p className="font-display text-sm font-medium leading-tight">
                Cycles d&rsquo;enseignement
              </p>
              <p className="text-[13px] text-muted-foreground">
                Préscolaire au Lycée
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
