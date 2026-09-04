import type { Metadata } from "next";
import Link from "next/link";
import { FileTextIcon } from "@/components/ui/file-text";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { CircleHelpIcon } from "@/components/ui/circle-help";

import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { Illustration } from "@/components/site/illustration";
import { InscriptionForm } from "@/components/sections/inscription/inscription-form";
import { cycles, inscriptionDocuments, inscriptionSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Inscription 2026/2027",
  description:
    "Inscriptions et réinscriptions ouvertes pour l'année 2026/2027 à School Academy, du préscolaire au lycée.",
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
            <p className="text-[13px] font-medium text-primary">
              Inscriptions &amp; réinscriptions {"2026/2027"}
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
              Offrez à votre enfant le tremplin vers l&rsquo;excellence
            </h1>
            <p className="max-w-[62ch] text-[17px] leading-relaxed text-muted-foreground">
              Nos enfants constituent la locomotive future qui aura pour but de tirer
              notre pays vers l&rsquo;avant. Pour y parvenir, ils doivent être armés
              d&rsquo;outils tant pédagogiques que didactiques, c&rsquo;est la mission
              que School Academy porte, du préscolaire au lycée.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-md lg:max-w-none">
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
          <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cycles.map((cycle) => (
              <RevealItem
                key={cycle.slug}
                className="flex flex-col gap-1 rounded-2xl bg-muted px-5 py-5 text-center"
              >
                <span className="font-display text-base font-medium">{cycle.short}</span>
                <span className="text-[13px] text-muted-foreground">{cycle.age}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page flex flex-col gap-8">
          <SectionHeading
            title="Comment inscrire votre enfant"
            description="Quatre étapes simples pour rejoindre School Academy."
          />
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inscriptionSteps.map((step, i) => (
              <RevealItem
                key={step.title}
                className="flex flex-col gap-4 rounded-[28px] bg-white p-7 ring-1 ring-ink/[0.06]"
              >
                <span className="font-display text-3xl font-medium text-primary/30">
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="formulaire" className="scroll-mt-24 bg-muted/60 py-11 sm:py-14">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:gap-16">
          <Reveal className="rounded-[28px] bg-white p-7 shadow-[0_1px_0_rgba(32,26,21,0.04)] ring-1 ring-ink/[0.06] sm:p-10">
            <h2 className="font-display text-2xl font-medium tracking-tight">
              Nouvelles inscriptions à l&rsquo;école School Academy
            </h2>
            <p className="mt-2 mb-8 max-w-[54ch] text-[15px] leading-relaxed text-muted-foreground">
              Remplissez ce formulaire, notre équipe vous recontacte rapidement pour
              finaliser le dossier.
            </p>
            <InscriptionForm />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5 rounded-[28px] bg-ink p-8 text-background">
            <FileTextIcon size={32} className="text-brand" />
            <Illustration
              src="/assets/undraw_grading-papers_lty0.svg"
              width={781}
              height={800}
              className="mx-auto max-w-[220px]"
            />
            <h3 className="font-display text-lg font-medium">Pièces généralement demandées</h3>
            <ul className="flex flex-col gap-3">
              {inscriptionDocuments.map((doc) => (
                <li key={doc} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-background/75">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                  {doc}
                </li>
              ))}
            </ul>
            <div className="flex items-start gap-2.5 rounded-2xl bg-background/[0.06] p-4 text-[13px] leading-relaxed text-background/60">
              <CircleHelpIcon size={16} className="mt-0.5 shrink-0" />
              Liste indicative : notre équipe vous communique le dossier complet et à
              jour lors de la prise de contact.
            </div>
            <Button asChild variant="brand" className="w-fit">
              <Link href="/contact">
                Nous contacter directement
                <ArrowRightIcon size={16} />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
