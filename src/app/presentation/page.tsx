import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Quotes, CheckCircle, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/sections/cta-band";
import { cycles, presentationSections, valeurs, chartePoints } from "@/lib/content";

export const metadata: Metadata = {
  title: "Présentation",
  description:
    "Découvrez le mot du directeur, les missions, les valeurs et la charte de School Academy, école du préscolaire au lycée.",
};

export default function PresentationPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre école"
        title="Une école pensée pour l'excellence de vos enfants"
        description={presentationSections.missions.text}
        icon={Compass}
      />

      <section id="fondateurs" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] sm:mx-auto lg:mx-0">
              <Image
                src="/images/directeur.jpg"
                alt="Directeur d'établissement, School Academy"
                fill
                sizes="(min-width: 1024px) 32vw, 80vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <Quotes weight="fill" className="size-10 text-brand" />
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {presentationSections.fondateurs.title}
            </h2>
            <p className="max-w-[54ch] text-[17px] leading-relaxed text-muted-foreground">
              {presentationSections.fondateurs.text}
            </p>
          </Reveal>
        </div>
      </section>

      <section id="missions" className="scroll-mt-24 bg-muted/60 py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            title={presentationSections.missions.title}
            description={presentationSections.missions.text}
          />
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valeurs.map((valeur) => (
              <RevealItem
                key={valeur.title}
                className="flex flex-col gap-2 rounded-2xl bg-white p-6"
              >
                <h3 className="font-display text-lg font-medium">{valeur.title}</h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  {valeur.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="concept" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Concept
            </span>
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {presentationSections.concept.title}
            </h2>
            <p className="max-w-[54ch] text-[17px] leading-relaxed text-muted-foreground">
              {presentationSections.concept.text}
            </p>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/pedagogie">
                Voir notre pédagogie
                <ArrowRight weight="bold" className="size-4" />
              </Link>
            </Button>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-3">
            {cycles.map((cycle) => (
              <RevealItem
                key={cycle.slug}
                className="flex flex-col gap-1 rounded-2xl bg-secondary px-5 py-5"
              >
                <span className="font-display text-base font-medium">{cycle.short}</span>
                <span className="text-[13px] text-secondary-foreground/70">{cycle.age}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="charte" className="scroll-mt-24 bg-ink py-20 text-background sm:py-28">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              Charte
            </span>
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-background sm:text-4xl">
              {presentationSections.charte.title}
            </h2>
            <p className="max-w-[52ch] text-[17px] leading-relaxed text-background/60">
              {presentationSections.charte.text}
            </p>
          </Reveal>
          <RevealGroup className="flex flex-col gap-1">
            {chartePoints.map((point) => (
              <RevealItem
                key={point}
                className="flex items-start gap-3 border-b border-background/10 py-4 last:border-0"
              >
                <CheckCircle weight="fill" className="mt-0.5 size-5 shrink-0 text-brand" />
                <span className="text-[15px] leading-relaxed text-background/85">
                  {point}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
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
