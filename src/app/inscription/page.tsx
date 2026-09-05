import type { Metadata } from "next";

import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Illustration } from "@/components/site/illustration";
import { InscriptionForm } from "@/components/sections/inscription/inscription-form";
import { cycles, inscriptionSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Inscription 2026/2027",
  description:
    "Inscriptions et réinscriptions ouvertes pour l'année 2026/2027 à School Academy, du préscolaire au lycée.",
};

const cycleIllustrations: Record<
  string,
  { src: string; width: number; height: number }
> = {
  prescolaire: {
    src: "/assets/undraw_family_6gj8.svg",
    width: 453,
    height: 472,
  },
  primaire: {
    src: "/assets/undraw_true-friends_1h3v.svg",
    width: 800,
    height: 701,
  },
  college: {
    src: "/assets/undraw_mathematics_0j2b.svg",
    width: 690,
    height: 800,
  },
  lycee: {
    src: "/assets/undraw_physics_8tvl.svg",
    width: 763,
    height: 801,
  },
};

export default function InscriptionPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-12 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-[-100px] size-[460px] rounded-full bg-brand/[0.10] blur-3xl"
        />
        <div className="container-page relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <Reveal className="flex flex-col items-start gap-6 text-left">
            <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
              Offrez à votre enfant le tremplin vers l&rsquo;excellence
            </h1>
          </Reveal>
          <Reveal className="mx-auto w-full max-w-[280px] sm:max-w-md lg:max-w-none">
            <Illustration
              src="/assets/undraw_back-to-school-offers_uorw.svg"
              width={960}
              height={483}
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="container-page">
          <RevealGroup className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-4 lg:gap-5">
            {cycles.map((cycle) => {
              const visual = cycleIllustrations[cycle.slug];
              return (
                <RevealItem
                  key={cycle.slug}
                  className="group flex flex-col items-center justify-between rounded-2xl sm:rounded-3xl bg-muted/50 p-4 sm:p-5 text-center border border-ink/[0.05] transition-all duration-200 hover:bg-white hover:border-primary/20 hover:shadow-sm"
                >
                  {visual && (
                    <div className="mb-2.5 flex h-16 w-full items-center justify-center sm:h-20">
                      <Illustration
                        src={visual.src}
                        width={visual.width}
                        height={visual.height}
                        className="max-h-full max-w-[90px] sm:max-w-[110px] object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-2xs"
                      />
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-display text-base font-medium text-foreground">
                      {cycle.short}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-primary shadow-2xs">
                      {cycle.age}
                    </span>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page flex flex-col gap-8">
          <SectionHeading
            title="Comment inscrire votre enfant"
            description="Quatre étapes simples pour rejoindre School Academy."
          />
          <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {inscriptionSteps.map((step, i) => (
              <RevealItem
                key={step.title}
                className="flex flex-col gap-2.5 rounded-2xl bg-white p-4 ring-1 ring-ink/[0.06] sm:gap-4 sm:rounded-[28px] sm:p-7"
              >
                <span className="font-display text-2xl font-medium text-primary/30 sm:text-3xl">
                  0{i + 1}
                </span>
                <h3 className="font-display text-sm font-medium tracking-tight sm:text-lg">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-[14px]">
                  {step.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="formulaire" className="scroll-mt-24 bg-muted/60 py-11 sm:py-14">
        <div className="w-[90vw] mx-auto">
          <InscriptionForm />
        </div>
      </section>
    </>
  );
}
