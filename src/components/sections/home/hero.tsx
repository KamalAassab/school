"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { PlayIcon } from "@/components/ui/play";
import { GraduationCapIcon } from "@/components/ui/graduation-cap";
import { StampIcon } from "@/components/ui/stamp";
import { SparklesIcon } from "@/components/ui/sparkles";

import { Button } from "@/components/ui/button";

const marqueeItems = [
  "Préscolaire",
  "Primaire",
  "Collège",
  "Lycée",
  "Cambridge Assessment",
  "Vie scolaire riche",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-10 sm:pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-[-120px] size-[520px] rounded-full bg-brand/[0.10] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-40 size-[420px] rounded-full bg-secondary/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)] [background-image:radial-gradient(circle,rgba(184,67,0,0.14)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className="container-page relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-7"
        >
          <p className="text-[13px] font-medium text-primary">
            Inscriptions {"2026/2027"} ouvertes
          </p>

          <h1 className="font-display text-[2.75rem] font-medium leading-[1.03] tracking-tight text-balance sm:text-6xl lg:text-[4rem]">
            Le tremplin de vos enfants vers{" "}
            <span className="relative inline-block whitespace-nowrap">
              l&rsquo;excellence
              <svg
                aria-hidden
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-[0.4em] w-full text-brand"
              >
                <path
                  d="M2 9C40 2 70 2 100 6.5C130 11 165 11 198 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
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
                <ArrowRightIcon size={16} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/presentation">
                <PlayIcon size={20} />
                Découvrir l&rsquo;école
              </Link>
            </Button>
          </div>

          <div className="relative mt-2 w-full max-w-[420px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-7 whitespace-nowrap py-1">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-7 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70"
                >
                  {item}
                  <span aria-hidden className="text-brand">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -right-4 -top-5 size-[88%] rotate-[4deg] rounded-[32px] bg-secondary sm:-right-6 sm:-top-6"
          />

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
            className="absolute -bottom-6 -left-4 sm:-left-9"
          >
            <div className="animate-float flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_20px_45px_-15px_rgba(32,26,21,0.25)] sm:p-5">
              <div className="flex size-11 items-center justify-center rounded-full bg-brand/12 text-primary sm:size-12">
                <GraduationCapIcon size={22} />
              </div>
              <div className="pr-1">
                <p className="font-display text-sm font-medium leading-tight">
                  4 cycles d&rsquo;enseignement
                </p>
                <p className="text-[13px] text-muted-foreground">
                  Préscolaire au Lycée
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="absolute -right-3 -top-4 hidden sm:-right-6 sm:block"
          >
            <div
              className="animate-float flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-background shadow-[0_20px_45px_-15px_rgba(32,26,21,0.35)]"
              style={{ animationDelay: "1.2s" }}
            >
              <StampIcon size={18} className="shrink-0 text-brand" />
              <span className="text-[13px] font-medium">Cambridge Assessment</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="absolute -left-4 top-8 hidden lg:block"
          >
            <div
              className="animate-float flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_14px_30px_-12px_rgba(184,67,0,0.55)]"
              style={{ animationDelay: "2.4s" }}
            >
              <SparklesIcon size={18} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
