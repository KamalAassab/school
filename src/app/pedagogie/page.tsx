import type { Metadata } from "next";
import {
  ChalkboardTeacher,
  Devices,
  Compass,
  Globe,
  ChatCircleText,
} from "@phosphor-icons/react/dist/ssr";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { CyclesTabs } from "@/components/sections/pedagogie/cycles-tabs";
import { CtaBand } from "@/components/sections/cta-band";
import { pedagogieSections } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pédagogie",
  description:
    "TICE, orientation, cycles d'enseignement, jumelage international : découvrez la pédagogie de School Academy, du préscolaire au lycée.",
};

const secondaryIcons = {
  tice: Devices,
  orientation: Compass,
  jumelage: Globe,
  rencontres: ChatCircleText,
};

export default function PedagogiePage() {
  const [tice, orientation, projet, jumelage, rencontres] = pedagogieSections;

  return (
    <>
      <PageHero
        eyebrow="Pédagogie"
        title="Un parcours structuré, du préscolaire au baccalauréat"
        description="Chaque cycle est pensé pour consolider les acquis précédents et préparer le suivant, avec une place centrale donnée aux langues et au numérique."
        icon={ChalkboardTeacher}
      />

      <section id="cycles" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            title="Nos cycles d'enseignement"
            description="Explorez le programme et les temps forts de chaque cycle."
          />
          <CyclesTabs />
        </div>
      </section>

      <section className="bg-muted/60 py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            eyebrow="Accompagnement"
            title="Le numérique et l'orientation, au service des apprentissages"
          />
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[tice, orientation].map((section) => {
              const Icon = secondaryIcons[section.id as keyof typeof secondaryIcons];
              return (
                <RevealItem
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 flex flex-col gap-4 rounded-[28px] bg-white p-8"
                >
                  <Icon weight="regular" className="size-9 text-primary" />
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

      <section id="projet" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {projet.subtitle}
            </span>
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {projet.title}
            </h2>
            <p className="max-w-[56ch] text-[17px] leading-relaxed text-muted-foreground">
              {projet.text}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-20 text-background sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            title="Ouverts sur le monde, proches des familles"
            className="[&_h2]:text-background [&_p]:text-background/60"
          />
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[jumelage, rencontres].map((section) => {
              const Icon = secondaryIcons[section.id as keyof typeof secondaryIcons];
              return (
                <RevealItem
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 flex flex-col gap-4 rounded-[28px] bg-background/[0.06] p-8"
                >
                  <Icon weight="regular" className="size-9 text-brand" />
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
