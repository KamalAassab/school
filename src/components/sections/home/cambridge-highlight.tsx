import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { StampIcon } from "@/components/ui/stamp";
import { LanguagesIcon } from "@/components/ui/languages";
import { EarthIcon } from "@/components/ui/earth";

import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cambridgeLevels } from "@/lib/content";

const tilts = ["sm:-rotate-3", "sm:rotate-2", "sm:-rotate-1", "sm:rotate-3", "sm:-rotate-2"];

export function CambridgeHighlight() {
  return (
    <section className="overflow-hidden py-11 sm:py-14">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
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
          <Button asChild variant="outline" className="w-fit self-center mx-auto lg:self-start lg:mx-0">
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

        <Reveal>
          <RevealGroup className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 py-5 sm:flex-wrap sm:justify-center sm:gap-5 sm:overflow-visible sm:px-0">
            {cambridgeLevels.map((level, i) => (
              <RevealItem key={level.code}>
                <Link
                  href="/cambridge"
                  className={[
                    "group flex w-[132px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-[0_16px_36px_-18px_rgba(32,26,21,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_22px_46px_-16px_rgba(32,26,21,0.4)] sm:w-[140px]",
                    tilts[i % tilts.length],
                  ].join(" ")}
                >
                  <div className="img-zoom-wrap relative aspect-[3/4] w-full">
                    <Image
                      src={level.image}
                      alt={`Manuel Cambridge English, ${level.code}`}
                      fill
                      sizes="(min-width: 640px) 140px, 132px"
                      className="img-zoom object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 px-3 py-2.5 text-center">
                    <span className="font-display text-[13px] font-semibold leading-tight">
                      {level.code}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{level.audience}</span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}
