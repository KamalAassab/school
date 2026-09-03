import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, EnvelopeSimple, ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { recrutementDomains, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Recrutement",
  description:
    "Rejoignez les équipes de School Academy : administration, cycle maternelle, primaire, collège et lycée.",
};

export default function RecrutementPage() {
  return (
    <>
      <PageHero
        eyebrow="Recrutement"
        title="Rejoignez une équipe engagée pour la réussite des élèves"
        description="School Academy recrute des professionnels passionnés, à chaque cycle d'enseignement comme au sein de son administration."
        icon={Briefcase}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              className="mb-8"
              title="Nos domaines de recrutement"
              description="Consultez les profils recherchés par domaine et cycle d'enseignement."
            />
            <Accordion type="single" collapsible defaultValue={recrutementDomains[0].title}>
              {recrutementDomains.map((domain) => (
                <AccordionItem key={domain.title} value={domain.title}>
                  <AccordionTrigger>{domain.title}</AccordionTrigger>
                  <AccordionContent>{domain.text}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticky top-28 flex flex-col gap-6 rounded-[28px] bg-ink p-8 text-background">
              <h3 className="font-display text-xl font-medium tracking-tight">
                Candidature spontanée
              </h3>
              <p className="text-[15px] leading-relaxed text-background/60">
                Envoyez-nous votre CV et lettre de motivation en précisant le poste et
                le cycle qui vous intéressent. Notre équipe RH étudie chaque
                candidature avec attention.
              </p>
              <Button asChild variant="brand" className="w-fit">
                <Link href={`mailto:${siteConfig.email}?subject=Candidature%20-%20Recrutement`}>
                  <EnvelopeSimple weight="regular" className="size-4" />
                  Envoyer ma candidature
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-fit text-background hover:bg-background/10"
              >
                <Link href="/contact">
                  Nous contacter
                  <ArrowRight weight="bold" className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Vous préférez inscrire votre enfant ?"
        description="Les inscriptions et réinscriptions pour l'année 2025/2026 sont ouvertes."
      />
    </>
  );
}
