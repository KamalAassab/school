import type { Metadata } from "next";
import Image from "next/image";
import { CompassIcon } from "@/components/ui/compass";
import { MessageSquareIcon } from "@/components/ui/message-square";
import { SparklesIcon } from "@/components/ui/sparkles";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import { GraduationCapIcon } from "@/components/ui/graduation-cap";
import { ShieldCheckIcon } from "@/components/ui/shield-check";
import { FlaskIcon } from "@/components/ui/flask";
import { MonitorCogIcon } from "@/components/ui/monitor-cog";
import { BicepsFlexedIcon } from "@/components/ui/biceps-flexed";
import { BlocksIcon } from "@/components/ui/blocks";
import { BookTextIcon } from "@/components/ui/book-text";
import { LayersIcon } from "@/components/ui/layers";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { Illustration } from "@/components/site/illustration";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBand } from "@/components/sections/cta-band";
import {
  cycles,
  presentationSections,
  valeurs,
  charteIntro,
  charteActeurs,
  conceptIntro,
  conceptOrientation,
  conceptRessourcesHumaines,
  conceptTechniciens,
} from "@/lib/content";

const valeurIcons = [
  GraduationCapIcon,
  ShieldCheckIcon,
  CompassIcon,
  FlaskIcon,
  MonitorCogIcon,
  BicepsFlexedIcon,
];

const cycleIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  prescolaire: BlocksIcon,
  primaire: BookTextIcon,
  college: LayersIcon,
  lycee: GraduationCapIcon,
};

const cycleVisuals: Record<string, string> = {
  prescolaire: "/assets/undraw_family_6gj8.svg",
  primaire: "/assets/undraw_true-friends_1h3v.svg",
  college: "/assets/undraw_mathematics_0j2b.svg",
  lycee: "/assets/undraw_graduation_u7uc.svg",
};

export const metadata: Metadata = {
  title: "Présentation",
  description:
    "Découvrez le mot du directeur, les missions, les valeurs et la charte de School Academy, école du préscolaire au lycée.",
};

export default function PresentationPage() {
  return (
    <>
      <PageHero
        title="Une école pensée pour l'excellence de vos enfants"
        description={presentationSections.missions.text}
        icon={CompassIcon}
      />

      <section id="fondateurs" className="scroll-mt-24 py-12 sm:py-16">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <Reveal className="relative">
            <div className="img-zoom-wrap relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] sm:mx-auto lg:mx-0">
              <Image
                src="/images/directeur.webp"
                alt="Directeur d'établissement, School Academy"
                fill
                sizes="(min-width: 1024px) 32vw, 80vw"
                className="img-zoom object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <MessageSquareIcon size={40} className="text-brand" />
            <h2 className="font-display text-2xl font-medium tracking-tight text-balance sm:text-4xl">
              {presentationSections.fondateurs.title}
            </h2>
            <p className="max-w-[54ch] text-[11px] leading-relaxed text-muted-foreground sm:text-[15px]">
              {presentationSections.fondateurs.text}
            </p>
          </Reveal>
        </div>
      </section>

      <section id="missions" className="scroll-mt-24 bg-muted/60 py-11 sm:py-14">
        <div className="container-page flex flex-col gap-8">
          <SectionHeading
            title={presentationSections.missions.title}
            description={presentationSections.missions.text}
          />
          <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {valeurs.map((valeur, i) => {
              const Icon = valeurIcons[i] ?? SparklesIcon;
              return (
                <RevealItem
                  key={i}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 sm:p-7 shadow-xs border border-ink/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Big watermark icon as card bg */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-4 -right-4 text-primary/[0.07] transition-all duration-500 group-hover:scale-110 group-hover:text-primary/[0.12]"
                  >
                    <Icon size={128} />
                  </div>

                  <div className="relative z-10 flex flex-col gap-3">
                    <Icon size={26} className="text-primary shrink-0 transition-transform duration-300 group-hover:scale-105" />
                    <p className="text-[14.5px] leading-relaxed text-foreground/85">
                      {valeur.text}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section id="concept" className="scroll-mt-24 py-11 sm:py-16">
        <div className="container-page flex flex-col gap-10 sm:gap-14">
          {/* Header row: Concept title + lead narrative */}
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {presentationSections.concept.title}
            </h2>
            <p className="text-[16px] sm:text-[17px] leading-relaxed text-muted-foreground">
              {conceptIntro[0]}
            </p>
            <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-muted-foreground/85 max-w-[62ch]">
              {conceptIntro[1]}
            </p>
          </div>

          {/* 2-Column Bento Grid: Choix & Orientation on the left, Ressources Humaines on the right */}
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Card 1: Choix et orientation de l’établissement */}
            <Reveal className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-[#faf6ef] p-6 sm:p-8 border border-ink/[0.06] shadow-xs">
              <div className="flex flex-col gap-3.5">
                <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                  Choix et orientation de l&rsquo;établissement
                </h3>
                <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                  {conceptOrientation}
                </p>
              </div>
              <div className="pt-2">
                <Button asChild variant="outline" className="w-fit bg-white/95 shadow-xs hover:bg-white">
                  <Link href="/pedagogie">
                    Voir notre pédagogie
                    <ArrowRightIcon size={16} />
                  </Link>
                </Button>
              </div>
            </Reveal>

            {/* Card 2: Ressources humaines with collapsed accordion by default */}
            <Reveal delay={0.1} className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-ink/[0.06] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col gap-4">
                {/* Header with illustration side-by-side */}
                <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/[0.06] pb-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                      Ressources humaines
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-muted-foreground max-w-[34ch]">
                      Une équipe minutieusement sélectionnée pour faire de School Academy un modèle d&rsquo;institution éducative.
                    </p>
                  </div>
                  <Illustration
                    src="/assets/undraw_books_wxzz.svg"
                    width={732}
                    height={490}
                    className="w-20 sm:w-24 shrink-0 self-start sm:self-center"
                  />
                </div>

                {/* Accordion collapsed by default */}
                <Accordion type="single" collapsible>
                  {conceptRessourcesHumaines.map((item) => (
                    <AccordionItem key={item.title} value={item.title}>
                      <AccordionTrigger className="text-[15px] py-3.5">{item.title}</AccordionTrigger>
                      <AccordionContent>{item.text}</AccordionContent>
                    </AccordionItem>
                  ))}
                  <AccordionItem value="techniciens">
                    <AccordionTrigger className="text-[15px] py-3.5">Vos techniciens spécialisés</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3">
                        {conceptTechniciens.map((t) => (
                          <div key={t.title}>
                            <p className="font-display text-[14px] font-medium text-foreground">
                              {t.title}
                            </p>
                            <p className="mt-0.5 text-[13.5px] leading-relaxed text-muted-foreground">{t.text}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Reveal>
          </div>

          {/* Bottom visual grid: Les 4 cycles d'enseignement */}
          <div className="flex flex-col gap-5 border-t border-ink/[0.06] pt-8 sm:pt-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                  Les 4 cycles d&rsquo;enseignement
                </h3>
                <p className="text-[14px] text-muted-foreground">
                  Un parcours éducatif continu, du préscolaire jusqu&rsquo;au baccalauréat.
                </p>
              </div>
              <Link
                href="/pedagogie#cycles"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
              >
                <span>Explorer les cycles en détail</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>

            <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {cycles.map((cycle) => {
                const Icon = cycleIcons[cycle.slug] ?? BookTextIcon;
                const visual = cycleVisuals[cycle.slug];
                return (
                  <RevealItem key={cycle.slug}>
                    <Link
                      href={`/pedagogie#${cycle.slug}`}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 sm:p-5 border border-ink/[0.06] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/30"
                    >
                      {/* Visual illustration banner */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-secondary/35 p-3 flex items-center justify-center transition-colors group-hover:bg-secondary/55">
                        <img
                          src={visual}
                          alt=""
                          aria-hidden="true"
                          className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none"
                          loading="lazy"
                        />
                      </div>

                      {/* Content block: NO icon borders */}
                      <div className="flex flex-col gap-1 pt-3.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {/* Bare icon - NO border, NO box */}
                            <Icon size={18} className="text-primary shrink-0 transition-transform duration-200 group-hover:scale-110" />
                            <span className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                              {cycle.short}
                            </span>
                          </div>
                          <ArrowUpRightIcon size={14} className="text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                        </div>
                        <span className="text-[13px] text-muted-foreground pl-6">
                          {cycle.age}
                        </span>
                      </div>
                    </Link>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section id="charte" className="scroll-mt-24 bg-ink py-12 text-background sm:py-16">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <Illustration
              src="/assets/undraw_book-reading_i0eb.svg"
              width={869}
              height={699}
              className="max-w-[200px]"
            />
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-background sm:text-4xl">
              {presentationSections.charte.title}
            </h2>
            <p className="max-w-[52ch] text-[17px] leading-relaxed text-background/60">
              {charteIntro}
            </p>
          </Reveal>

          <Accordion type="single" collapsible>
            {charteActeurs.map((acteur) => (
              <AccordionItem
                key={acteur.id}
                value={acteur.id}
                className="border-background/10"
              >
                <AccordionTrigger className="text-background hover:text-brand">
                  {acteur.title}
                </AccordionTrigger>
                <AccordionContent className="text-background/60">
                  <p className="mb-4">{acteur.intro}</p>
                  <ul className="flex flex-col gap-2.5">
                    {acteur.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[14px]">
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                        />
                        <span className="text-background/75">{point}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CtaBand
        title="Envie de visiter notre établissement ?"
        description="Notre équipe se tient à votre disposition pour vous présenter l'école et répondre à toutes vos questions."
        primaryLabel="Nous contacter"
        primaryHref="/contact"
        secondaryLabel="Voir la pédagogie"
        secondaryHref="/pedagogie"
      />
    </>
  );
}
