import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CookingPotIcon } from "@/components/ui/cooking-pot";
import { ArrowRightIcon } from "@/components/ui/arrow-right";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Illustration } from "@/components/site/illustration";
import { Button } from "@/components/ui/button";
import { ServicesGrid } from "@/components/sections/vie-scolaire/services-grid";
import { FournituresDownload } from "@/components/sections/vie-scolaire/fournitures-download";
import { ActivitesGrid } from "@/components/sections/activites/activites-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { espaceScolaire } from "@/lib/content";

const fournitures = espaceScolaire.find((item) => item.id === "fournitures")!;

export const metadata: Metadata = {
  title: "Vie scolaire",
  description:
    "Cantine HACCP, BCD, théâtre, laboratoires, associations sportives, clubs et activités : découvrez la vie scolaire de School Academy.",
};

const cantine = espaceScolaire[0];

export default function VieScolairePage() {
  return (
    <>
      <PageHero
        title="Un espace scolaire pensé pour le bien-être des élèves"
        description="Au-delà des salles de classe, School Academy offre un cadre complet : restauration, culture, sport et ressources documentaires."
        icon={CookingPotIcon}
        stats={cantine.facts?.map((f) => ({ label: f.label, value: f.value }))}
      />

      <section id="cantine" className="scroll-mt-24 py-12 sm:py-16">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="img-zoom-wrap relative aspect-[4/3.1] w-full overflow-hidden rounded-[28px]">
              <Image
                src="/images/cantine.webp"
                alt="Cantine School Academy"
                fill
                sizes="(min-width: 1024px) 48vw, 90vw"
                className="img-zoom object-cover"
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
            <Button asChild variant="outline" className="w-fit self-center mx-auto">
              <Link href="/contact">
                Poser une question
                <ArrowRightIcon size={16} />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/60 py-11 sm:py-14">
        <div className="container-page flex flex-col gap-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <SectionHeading
              title="Des espaces dédiés à chaque activité"
              description="De la lecture au sport, chaque élève trouve un lieu pour progresser et s'épanouir."
            />
            <Reveal delay={0.1} className="mx-auto w-full max-w-[220px] sm:max-w-xs">
              <Illustration
                src="/assets/undraw_book-lover_m9n3.svg"
                width={800}
                height={622}
              />
            </Reveal>
          </div>
          <ServicesGrid />
        </div>
      </section>

      <section id="fournitures" className="scroll-mt-24 py-11 sm:py-14">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {fournitures.title}
            </h2>
            <p className="max-w-[48ch] text-[17px] leading-relaxed text-muted-foreground">
              {fournitures.text}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FournituresDownload />
          </Reveal>
        </div>
      </section>

      <section id="activites" className="scroll-mt-24 py-11 sm:py-14">
        <div className="container-page flex flex-col gap-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <SectionHeading
              title="Activités & loisirs"
              description="Clubs, sorties, fêtes et temps forts collectifs : des occasions régulières de grandir ensemble, au-delà du programme scolaire."
            />
            <Reveal delay={0.1} className="mx-auto w-full max-w-[220px] sm:max-w-xs">
              <Illustration
                src="/assets/undraw_motion-alert_pr1a.svg"
                width={819}
                height={800}
              />
            </Reveal>
          </div>
          <ActivitesGrid />
        </div>
      </section>

      <CtaBand
        title="Une question sur la vie scolaire ?"
        description="Notre équipe répond à toutes vos questions sur les activités, les clubs et le calendrier de l'année."
        secondaryLabel="Nous contacter"
        secondaryHref="/contact"
      />
    </>
  );
}
