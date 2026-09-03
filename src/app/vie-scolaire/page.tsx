import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ForkKnife, ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { ServicesGrid } from "@/components/sections/vie-scolaire/services-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { espaceScolaire } from "@/lib/content";

export const metadata: Metadata = {
  title: "Vie scolaire",
  description:
    "Cantine HACCP, BCD, théâtre, laboratoires et associations sportives : découvrez l'espace scolaire de School Academy.",
};

const cantine = espaceScolaire[0];

export default function VieScolairePage() {
  return (
    <>
      <PageHero
        eyebrow="Vie scolaire"
        title="Un espace scolaire pensé pour le bien-être des élèves"
        description="Au-delà des salles de classe, School Academy offre un cadre complet : restauration, culture, sport et ressources documentaires."
        icon={ForkKnife}
        stats={cantine.facts?.map((f) => ({ label: f.label, value: f.value }))}
      />

      <section id="cantine" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3.1] w-full overflow-hidden rounded-[28px]">
              <Image
                src="/images/cantine.png"
                alt="Cantine School Academy"
                fill
                sizes="(min-width: 1024px) 48vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 flex flex-col gap-6 lg:order-2">
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {cantine.title}
            </h2>
            <p className="max-w-[54ch] text-[17px] leading-relaxed text-muted-foreground">
              {cantine.text}
            </p>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/contact">
                Poser une question
                <ArrowRight weight="bold" className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/60 py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            title="Des espaces dédiés à chaque activité"
            description="De la lecture au sport, chaque élève trouve un lieu pour progresser et s'épanouir."
          />
          <ServicesGrid />
        </div>
      </section>

      <CtaBand
        title="Découvrez aussi nos activités et loisirs"
        description="Clubs, sorties scolaires, carnavals et journées thématiques rythment l'année de vos enfants."
        primaryLabel="Voir les activités"
        primaryHref="/activites"
        secondaryLabel="Nous contacter"
        secondaryHref="/contact"
      />
    </>
  );
}
