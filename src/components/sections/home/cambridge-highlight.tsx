import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { StampIcon } from "@/components/ui/stamp";
import { LanguagesIcon } from "@/components/ui/languages";
import { EarthIcon } from "@/components/ui/earth";
import { SparklesIcon } from "@/components/ui/sparkles";
import { CompassIcon } from "@/components/ui/compass";
import { TelescopeIcon } from "@/components/ui/telescope";
import { CircleCheckIcon } from "@/components/ui/circle-check";

import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cambridgeLevels } from "@/lib/content";

const levelIcons = [SparklesIcon, CompassIcon, TelescopeIcon, CircleCheckIcon, StampIcon];

export function CambridgeHighlight() {
  return (
    <section className="overflow-hidden py-11 sm:py-14">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <Reveal className="flex flex-col gap-6">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <StampIcon size={32} className="shrink-0 text-primary sm:size-9" />
            <h2 className="font-display text-xl font-medium tracking-tight text-balance sm:text-2xl lg:text-3xl">
              Un centre d&rsquo;examen agréé, au cœur de l&rsquo;établissement
            </h2>
          </div>
          <p className="max-w-[52ch] text-[17px] leading-relaxed text-muted-foreground">
            Ouverte sur les langues avec une distinction pour l&rsquo;anglais, School
            Academy est Authorised Exam Centre Cambridge Assessment English, du
            premier niveau Young Learners jusqu&rsquo;au PET.
          </p>
          <Button asChild variant="outline" className="w-fit self-center mx-auto">
            <Link href="/cambridge">
              Voir les niveaux Cambridge
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
          <ul className="flex flex-col gap-3 pt-2">
            <li className="flex items-center gap-2.5 text-[14px] text-foreground/80">
              <LanguagesIcon size={18} className="shrink-0 text-primary" />
              Bilingue dès le préscolaire
            </li>
            <li className="flex items-center gap-2.5 text-[14px] text-foreground/80">
              <EarthIcon size={18} className="shrink-0 text-primary" />
              Certifications reconnues à l&rsquo;international
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div
            aria-hidden
            className="absolute left-4 right-4 top-1/2 hidden h-px -translate-y-1/2 border-t-2 border-dashed border-primary/20 sm:block"
          />
          <RevealGroup className="relative flex flex-wrap justify-center gap-5 sm:gap-6">
            {cambridgeLevels.map((level, i) => {
              const Icon = levelIcons[i % levelIcons.length];
              const tilt = i % 2 === 0 ? "sm:-rotate-2" : "sm:rotate-2";
              return (
                <RevealItem key={level.code} y={14}>
                  <div
                    className={cn(
                      "flex w-[148px] flex-col items-center gap-2.5 rounded-2xl border border-dashed border-ink/15 bg-white px-4 py-5 text-center shadow-[0_16px_32px_-20px_rgba(32,26,21,0.3)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_20px_40px_-18px_rgba(32,26,21,0.35)]",
                      tilt
                    )}
                  >
                    <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                      <Icon size={22} />
                    </span>
                    <span className="font-display text-[15px] font-medium">
                      {level.code}
                    </span>
                    <span className="text-[12px] text-muted-foreground">
                      {level.audience}
                    </span>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}
