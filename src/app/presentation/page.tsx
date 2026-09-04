import type { Metadata } from "next";
import Image from "next/image";
import { CompassIcon } from "@/components/ui/compass";
import { MessageSquareIcon } from "@/components/ui/message-square";
import { SparklesIcon } from "@/components/ui/sparkles";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
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
                  className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-xs border border-ink/[0.04]"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>
                  <p className="text-[14px] leading-relaxed text-foreground/85">
                    {valeur.text}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section id="concept" className="scroll-mt-24 py-11 sm:py-14">
        <div className="container-page grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {presentationSections.concept.title}
            </h2>
            {conceptIntro.map((p) => (
              <p
                key={p}
                className="max-w-[54ch] text-[17px] leading-relaxed text-muted-foreground"
              >
                {p}
              </p>
            ))}
            <div className="flex flex-col gap-2 border-t border-ink/[0.08] pt-6">
              <h3 className="font-display text-base font-medium">
                Choix et orientation de l&rsquo;établissement
              </h3>
              <p className="max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground">
                {conceptOrientation}
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/pedagogie">
                Voir notre pédagogie
                <ArrowRightIcon size={16} />
              </Link>
            </Button>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Illustration
              src="/assets/undraw_books_wxzz.svg"
              width={732}
              height={490}
              className="mx-auto max-w-[220px]"
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-lg font-medium tracking-tight">
                Ressources humaines
              </h3>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                Une équipe minutieusement sélectionnée pour faire de School Academy
                un modèle d&rsquo;institution éducative.
              </p>
            </div>
            <Accordion type="single" collapsible defaultValue={conceptRessourcesHumaines[0].title}>
              {conceptRessourcesHumaines.map((item) => (
                <AccordionItem key={item.title} value={item.title}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.text}</AccordionContent>
                </AccordionItem>
              ))}
              <AccordionItem value="techniciens">
                <AccordionTrigger>Vos techniciens spécialisés</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    {conceptTechniciens.map((t) => (
                      <div key={t.title}>
                        <p className="font-display text-[14px] font-medium text-foreground">
                          {t.title}
                        </p>
                        <p className="mt-1 leading-relaxed">{t.text}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <RevealGroup className="grid grid-cols-2 gap-3">
              {cycles.map((cycle) => {
                const Icon = cycleIcons[cycle.slug] ?? BookTextIcon;
                return (
                  <RevealItem
                    key={cycle.slug}
                    className="flex flex-col gap-2 rounded-2xl bg-secondary px-5 py-5 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div className="flex size-9 items-center justify-center rounded-xl bg-white/80 text-primary shadow-xs">
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col gap-0.5 mt-1">
                      <span className="font-display text-base font-medium">{cycle.short}</span>
                      <span className="text-[13px] text-secondary-foreground/70">{cycle.age}</span>
                    </div>
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
