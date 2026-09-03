import type { Metadata } from "next";
import Link from "next/link";
import { NotePencil, FileText, ArrowRight, Info } from "@phosphor-icons/react/dist/ssr";

import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { cycles, inscriptionDocuments, inscriptionSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Inscription 2025/2026",
  description:
    "Inscriptions et réinscriptions ouvertes pour l'année 2025/2026 à School Academy, du préscolaire au lycée.",
};

export default function InscriptionPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-[-100px] size-[460px] rounded-full bg-brand/[0.10] blur-3xl"
        />
        <div className="container-page relative">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-[13px] font-medium text-secondary-foreground">
              <NotePencil weight="fill" className="size-3.5 text-primary" />
              Inscriptions & réinscriptions 2025/2026
            </span>
            <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
              Offrez à votre enfant le tremplin vers l&rsquo;excellence
            </h1>
            <p className="max-w-[62ch] text-[17px] leading-relaxed text-muted-foreground">
              Nos enfants constituent la locomotive future qui aura pour but de tirer
              notre pays vers l&rsquo;avant. Pour y parvenir, ils doivent être armés
              d&rsquo;outils tant pédagogiques que didactiques — c&rsquo;est la mission
              que School Academy porte, du préscolaire au lycée.
            </p>
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

      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            eyebrow="Le processus"
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

      <section className="bg-muted/60 py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:gap-16">
          <Reveal className="rounded-[28px] bg-white p-7 shadow-[0_1px_0_rgba(32,26,21,0.04)] ring-1 ring-ink/[0.06] sm:p-10">
            <h2 className="font-display text-2xl font-medium tracking-tight">
              Démarrer votre dossier d&rsquo;inscription
            </h2>
            <p className="mt-2 mb-8 max-w-[54ch] text-[15px] leading-relaxed text-muted-foreground">
              Écrivez-nous en précisant le cycle et l&rsquo;année scolaire souhaités,
              notre équipe vous recontacte rapidement.
            </p>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5 rounded-[28px] bg-ink p-8 text-background">
            <FileText weight="regular" className="size-8 text-brand" />
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
              <Info weight="regular" className="mt-0.5 size-4 shrink-0" />
              Liste indicative : notre équipe vous communique le dossier complet et à
              jour lors de la prise de contact.
            </div>
            <Button asChild variant="brand" className="w-fit">
              <Link href="/contact">
                Nous contacter directement
                <ArrowRight weight="bold" className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
