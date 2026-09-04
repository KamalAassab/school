import type { Metadata } from "next";
import { StampIcon } from "@/components/ui/stamp";
import { LanguagesIcon } from "@/components/ui/languages";
import { EarthIcon } from "@/components/ui/earth";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { Illustration } from "@/components/site/illustration";
import { LevelsExplorer } from "@/components/sections/cambridge/levels-explorer";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Cambridge Assessment English",
  description:
    "School Academy est Authorised Exam Centre Cambridge Assessment English, de YLE Starters au PET.",
};

const reasons = [
  {
    icon: LanguagesIcon,
    title: "Une distinction pour l'anglais",
    text: "Une école ouverte sur les langues, avec un accompagnement construit main dans la main avec Calliope, référence linguistique reconnue.",
  },
  {
    icon: StampIcon,
    title: "Centre d'examen agréé",
    text: "Authorised Exam Centre : les élèves passent leurs certifications Cambridge directement au sein de l'établissement.",
  },
  {
    icon: EarthIcon,
    title: "Une reconnaissance internationale",
    text: "Des certifications reconnues dans le monde entier, qui valorisent le parcours de chaque élève au-delà du Maroc.",
  },
];

export default function CambridgePage() {
  return (
    <>
      <PageHero
        title="Authorised Exam Centre, au cœur de School Academy"
        description="Notre établissement se veut une école ouverte sur les langues avec une distinction pour l'anglais. Une collaboration qui se traduit par un parcours de certification complet, du premier niveau Young Learners jusqu'au PET."
        icon={StampIcon}
      />

      <section className="py-12 sm:py-16">
        <div className="container-page flex flex-col gap-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <SectionHeading
              title="Un parcours de certification, niveau par niveau"
              description="Cinq étapes progressives pour accompagner chaque élève, du premier contact avec l'anglais jusqu'à un niveau intermédiaire confirmé."
            />
            <Reveal delay={0.1} className="mx-auto w-full max-w-[200px] sm:max-w-[240px]">
              <Illustration
                src="/assets/undraw_certification_oqiz.svg"
                width={429}
                height={567}
              />
            </Reveal>
          </div>
          <LevelsExplorer />
        </div>
      </section>

      <section className="bg-muted/60 py-11 sm:py-14">
        <div className="container-page flex flex-col gap-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <SectionHeading title="Une collaboration qui fait la différence" />
            <Reveal delay={0.1} className="mx-auto w-full max-w-xs">
              <Illustration
                src="/assets/undraw_educator_6dgp.svg"
                width={851}
                height={557}
              />
            </Reveal>
          </div>
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {reasons.map((reason) => (
              <RevealItem
                key={reason.title}
                className="flex flex-col gap-4 rounded-[28px] bg-white p-7"
              >
                <reason.icon size={32} className="text-primary" />
                <h3 className="font-display text-lg font-medium tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  {reason.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        title="Une question sur les certifications Cambridge ?"
        description="Notre équipe pédagogique vous renseigne sur le niveau adapté à votre enfant."
      />
    </>
  );
}
