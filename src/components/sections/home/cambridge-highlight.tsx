import Link from "next/link";
import { ArrowRight, Certificate } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cambridgeLevels } from "@/lib/content";

export function CambridgeHighlight() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Cambridge Assessment English
          </span>
          <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Un centre d&rsquo;examen agréé, au cœur de l&rsquo;établissement
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-relaxed text-muted-foreground">
            Ouverte sur les langues avec une distinction pour l&rsquo;anglais, School
            Academy est Authorised Exam Centre Cambridge Assessment English — du
            premier niveau Young Learners jusqu&rsquo;au PET.
          </p>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/cambridge">
              Voir les niveaux Cambridge
              <ArrowRight weight="bold" className="size-4" />
            </Link>
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="rounded-[28px] bg-secondary p-8 sm:p-10">
            <Certificate weight="regular" className="size-10 text-primary" />
            <div className="mt-6 flex flex-col gap-3">
              {cambridgeLevels.map((level) => (
                <div
                  key={level.code}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white/70 px-5 py-3.5"
                >
                  <span className="font-display text-[15px] font-medium">
                    {level.code}
                  </span>
                  <span className="text-[13px] text-muted-foreground">
                    {level.audience}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
