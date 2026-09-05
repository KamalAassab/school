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
        <div className="container-page flex flex-col gap-8 sm:gap-10">
          <SectionHeading
            align="center"
            title="Le numérique et l'orientation, au service des apprentissages"
            className="items-center text-center max-w-3xl mx-auto"
          />

          {/* High Priority Large Photography Showcase */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <Reveal className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm border border-ink/[0.06]">
              <Image
                src="/images/pedagogie/tice-tbi.webp"
                alt="Tableau blanc interactif, cycle maternelle School Academy"
                fill
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
                className="img-zoom object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col gap-1 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                  Équipement interactif
                </span>
                <h4 className="font-display text-base sm:text-lg font-medium tracking-tight text-white">
                  Tableau blanc interactif (TBI)
                </h4>
                <p className="text-xs sm:text-[13px] text-white/80 line-clamp-2">
                  Des cours immersifs et vivants dès le préscolaire grâce aux tableaux tactiles.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm border border-ink/[0.06]">
              <Image
                src="/images/pedagogie/tice-table.webp"
                alt="Table interactive tactile, School Academy"
                fill
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
                className="img-zoom object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col gap-1 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                  Ateliers &amp; Numérique
                </span>
                <h4 className="font-display text-base sm:text-lg font-medium tracking-tight text-white">
                  Table interactive tactile
                </h4>
                <p className="text-xs sm:text-[13px] text-white/80 line-clamp-2">
                  Apprentissage collaboratif et intuitif stimulant la curiosité et l’esprit d’équipe.
                </p>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {[tice, orientation].map((section) => {
              const Icon = secondaryIcons[section.id as keyof typeof secondaryIcons];
              return (
                <RevealItem
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 flex flex-col gap-3 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 border border-ink/[0.06] shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={28} className="text-primary shrink-0" />
                    <h3 className="font-display text-xl font-medium tracking-tight">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                    {section.text}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section id="projet" className="scroll-mt-24 py-11 sm:py-14">
        <div className="container-page flex flex-col gap-12 sm:gap-14">
          <SectionHeading
            align="center"
            title={projet.title}
            className="items-center text-center"
          />

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto] lg:gap-6">
            <Reveal className="flex flex-col justify-center gap-4 rounded-2xl sm:rounded-3xl bg-muted p-7 sm:p-9 text-center lg:text-left h-full">
              <p className="font-display text-base leading-relaxed italic text-foreground/90 sm:text-lg">
                {projetQuote.text}
              </p>
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {projetQuote.source}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="flex items-center justify-center h-full min-h-0 p-0">
              <Illustration
                src="/assets/undraw_learning_qt7d.svg"
                width={394}
                height={800}
                className="h-full max-h-[210px] sm:max-h-[225px] w-auto object-contain select-none"
              />
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            {/* 3 Pillars: Multiplicité, Diversité, Construction */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
              {projetConcepts.map((concept) => {
                const Icon =
                  concept.id === "multiplicite"
                    ? WaypointsIcon
                    : concept.id === "diversite"
                    ? LayersIcon
                    : BlocksIcon;

                return (
                  <Reveal
                    key={concept.id}
                    className="flex flex-col gap-3 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 border border-ink/[0.06] shadow-xs"
                  >
                    <Icon size={32} className="text-primary" />
                    <h3 className="font-display text-xl font-medium tracking-tight">
                      {concept.title}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                      {concept.text}
                    </p>
                  </Reveal>
                );
              })}
            </div>

            {/* Campus Facilities Showcase (Multiplicité) - All 15 items with full text and no truncation */}
            <Reveal delay={0.1} className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 border border-ink/[0.06] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink/[0.06] pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <WaypointsIcon size={22} className="text-primary shrink-0" />
                  <h4 className="font-display text-base font-semibold tracking-tight text-foreground">
                    Les 15 espaces &amp; infrastructures du campus
                  </h4>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/5 px-3 py-1 rounded-full w-fit">
                  Au service du projet Multiplicité
                </span>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3.5 text-[13.5px] text-foreground/85">
                {projetConcepts[0].items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 leading-snug">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

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
                  className="scroll-mt-24 flex flex-col gap-3.5 rounded-[28px] bg-background/[0.06] p-7 sm:p-8"
                >
                  <div className="flex items-center gap-3.5">
                    <Icon size={32} className="text-brand shrink-0" />
                    <h3 className="font-display text-xl font-medium tracking-tight text-background">
                      {section.title}
                    </h3>
                  </div>
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
