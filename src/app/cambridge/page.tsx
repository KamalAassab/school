import type { Metadata } from "next";
import { Certificate, Translate, GlobeHemisphereWest } from "@phosphor-icons/react/dist/ssr";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { LevelsPath } from "@/components/sections/cambridge/levels-path";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Cambridge Assessment English",
  description:
    "School Academy est Authorised Exam Centre Cambridge Assessment English, de YLE Starters au PET.",
};

const reasons = [
  {
    icon: Translate,
    title: "Une distinction pour l'anglais",
    text: "Une école ouverte sur les langues, avec un accompagnement construit main dans la main avec Calliope, référence linguistique reconnue.",
  },
  {
    icon: Certificate,
    title: "Centre d'examen agréé",
    text: "Authorised Exam Centre : les élèves passent leurs certifications Cambridge directement au sein de l'établissement.",
  },
  {
    icon: GlobeHemisphereWest,
    title: "Une reconnaissance internationale",
    text: "Des certifications reconnues dans le monde entier, qui valorisent le parcours de chaque élève au-delà du Maroc.",
  },
];

export default function CambridgePage() {
  return (
    <>
      <PageHero
        eyebrow="Cambridge Assessment English"
        title="Authorised Exam Centre, au cœur de School Academy"
        description="Notre établissement se veut une école ouverte sur les langues avec une distinction pour l'anglais. Une collaboration qui se traduit par un parcours de certification complet, du premier niveau Young Learners jusqu'au PET."
        icon={Certificate}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            title="Un parcours de certification, niveau par niveau"
            description="Cinq étapes progressives pour accompagner chaque élève, du premier contact avec l'anglais jusqu'à un niveau intermédiaire confirmé."
          />
          <LevelsPath />
        </div>
      </section>

      <section className="bg-muted/60 py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="Pourquoi Cambridge" title="Une collaboration qui fait la différence" />
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {reasons.map((reason) => (
              <RevealItem
                key={reason.title}
                className="flex flex-col gap-4 rounded-[28px] bg-white p-7"
              >
                <reason.icon weight="regular" className="size-8 text-primary" />
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
