import type { Metadata } from "next";
import Image from "next/image";
import { BookTextIcon } from "@/components/ui/book-text";
import { MonitorCogIcon } from "@/components/ui/monitor-cog";
import { CompassIcon } from "@/components/ui/compass";
import { EarthIcon } from "@/components/ui/earth";
import { MessageCircleMoreIcon } from "@/components/ui/message-circle-more";
import { WaypointsIcon } from "@/components/ui/waypoints";
import { LayersIcon } from "@/components/ui/layers";
import { BlocksIcon } from "@/components/ui/blocks";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { Illustration } from "@/components/site/illustration";
import { CyclesTabs } from "@/components/sections/pedagogie/cycles-tabs";
import { CtaBand } from "@/components/sections/cta-band";
import {
  pedagogieSections,
  projetQuote,
  projetConcepts,
  projetAxes,
} from "@/lib/content";

const conceptIcons = { multiplicite: WaypointsIcon, diversite: LayersIcon, construction: BlocksIcon };

export const metadata: Metadata = {
  title: "Pédagogie",
  description:
    "TICE, orientation, cycles d'enseignement, jumelage international : découvrez la pédagogie de School Academy, du préscolaire au lycée.",
};

const secondaryIcons = {
  tice: MonitorCogIcon,
  orientation: CompassIcon,
  jumelage: EarthIcon,
  rencontres: MessageCircleMoreIcon,
};

export default function PedagogiePage() {
  const [tice, orientation, projet, jumelage, rencontres] = pedagogieSections;

  return (
    <>
      <PageHero
        title="Un parcours structuré, du préscolaire au baccalauréat"
        description="Chaque cycle est pensé pour consolider les acquis précédents et préparer le suivant, avec une place centrale donnée aux langues et au numérique."
        icon={BookTextIcon}
      />

      <section id="cycles" className="scroll-mt-24 py-12 sm:py-16">
        <div className="container-page flex flex-col gap-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-8">
            <SectionHeading
              title="Nos cycles d'enseignement"
              description="Explorez le programme et les temps forts de chaque cycle."
            />
            <Reveal delay={0.1} className="mx-auto w-full max-w-[180px] sm:max-w-[220px] lg:max-w-[240px]">
              <Illustration
                src="/assets/undraw_studying-science_kk9e.svg"
                width={960}
                height={756}
              />
            </Reveal>
          </div>
          <CyclesTabs />
        </div>
      </section>

      <section className="bg-muted/60 py-11 sm:py-14">
        <div className="container-page flex flex-col gap-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <SectionHeading
              title="Le numérique et l'orientation, au service des apprentissages"
            />
            <Reveal delay={0.1} className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md mx-auto">
              <div className="img-zoom-wrap relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_12px_32px_-10px_rgba(32,26,21,0.2)]">
                <Image
                  src="/images/pedagogie/tice-tbi.webp"
                  alt="Tableau blanc interactif, cycle maternelle School Academy"
                  fill
                  sizes="(min-width: 640px) 240px, 45vw"
                  className="img-zoom object-cover"
                />
              </div>
              <div className="img-zoom-wrap relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_12px_32px_-10px_rgba(32,26,21,0.2)]">
                <Image
                  src="/images/pedagogie/tice-table.webp"
                  alt="Table interactive tactile, School Academy"
                  fill
                  sizes="(min-width: 640px) 240px, 45vw"
                  className="img-zoom object-cover"
                />
              </div>
            </Reveal>
          </div>
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[tice, orientation].map((section) => {
              const Icon = secondaryIcons[section.id as keyof typeof secondaryIcons];
              return (
                <RevealItem
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 flex flex-col gap-4 rounded-[28px] bg-white p-8"
                >
                  <Icon size={36} className="text-primary" />
                  <h3 className="font-display text-xl font-medium tracking-tight">
                    {section.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {section.text}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section id="projet" className="scroll-mt-24 py-11 sm:py-14">
        <div className="container-page flex flex-col gap-14">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <Illustration
              src="/assets/undraw_learning_qt7d.svg"
              width={394}
              height={800}
              className="max-w-[150px] sm:max-w-[180px]"
            />
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {projet.title}
            </h2>
            <p className="max-w-[56ch] text-[17px] leading-relaxed text-muted-foreground">
              {projet.text}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[28px] bg-muted px-8 py-10 text-center">
            <p className="font-display text-lg leading-relaxed text-balance italic text-foreground/90 sm:text-xl">
              {projetQuote.text}
            </p>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              {projetQuote.source}
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {projetConcepts.map((concept) => {
              const Icon = conceptIcons[concept.id as keyof typeof conceptIcons];
              return (
                <RevealItem
                  key={concept.id}
                  className="flex flex-col gap-4 rounded-[28px] bg-white p-7 ring-1 ring-ink/[0.06]"
                >
                  <Icon size={32} className="text-primary" />
                  <h3 className="font-display text-lg font-medium tracking-tight">
                    {concept.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
                    {concept.text}
                  </p>
                  {concept.items.length > 0 ? (
                    <ul className="grid grid-cols-1 gap-x-3 gap-y-1.5 border-t border-ink/[0.06] pt-4 text-[12.5px] leading-relaxed text-foreground/70 sm:grid-cols-2">
                      {concept.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5">
                          <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </RevealItem>
              );
            })}
          </RevealGroup>

          <div className="flex flex-col gap-6">
            <SectionHeading
              align="center"
              title="Quatre axes de travail"
              description="Les fondements de notre stratégie pédagogique et civique, année après année."
              className="items-center text-center"
            />
            <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {projetAxes.map((axe, i) => (
                <RevealItem
                  key={axe.title}
                  className="flex flex-col gap-3 rounded-2xl bg-secondary px-5 py-6"
                >
                  <span className="font-display text-2xl font-medium text-primary/40">
                    0{i + 1}
                  </span>
                  <h4 className="font-display text-[15px] font-medium tracking-tight">
                    {axe.title}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-secondary-foreground/75">
                    {axe.text}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section className="bg-ink py-12 text-background sm:py-16">
        <div className="container-page flex flex-col gap-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <SectionHeading
              title="Ouverts sur le monde, proches des familles"
              className="[&_h2]:text-background [&_p]:text-background/60"
            />
            <Reveal delay={0.1} className="mx-auto w-full max-w-[240px] sm:max-w-sm lg:max-w-none">
              <Illustration
                src="/assets/undraw_road-to-knowledge_ufma.svg"
                width={960}
                height={336}
              />
            </Reveal>
          </div>
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[jumelage, rencontres].map((section) => {
              const Icon = secondaryIcons[section.id as keyof typeof secondaryIcons];
              return (
                <RevealItem
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 flex flex-col gap-4 rounded-[28px] bg-background/[0.06] p-8"
                >
                  <Icon size={36} className="text-brand" />
                  <h3 className="font-display text-xl font-medium tracking-tight text-background">
                    {section.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-background/60">
                    {section.text}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        title="Prêt à rejoindre l'aventure School Academy ?"
        description="Découvrez la vie scolaire et notre centre Cambridge, ou passez directement à l'inscription."
        secondaryLabel="Découvrir Cambridge"
        secondaryHref="/cambridge"
      />
    </>
  );
}
