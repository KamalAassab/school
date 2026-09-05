import Link from "next/link";
import { CompassIcon } from "@/components/ui/compass";
import { BookTextIcon } from "@/components/ui/book-text";
import { PartyPopperIcon } from "@/components/ui/party-popper";
import { StampIcon } from "@/components/ui/stamp";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";

import { SectionHeading } from "@/components/site/section-heading";
import { RevealGroup, RevealItem, Reveal } from "@/components/site/reveal";
import { Illustration } from "@/components/site/illustration";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: CompassIcon,
    title: "Présentation",
    text: "Notre concept, nos missions et les valeurs qui guident chaque décision pédagogique.",
    href: "/presentation",
    dark: true,
  },
  {
    icon: BookTextIcon,
    title: "Pédagogie",
    text: "Un parcours structuré du préscolaire au lycée, porté par le numérique et l'orientation.",
    href: "/pedagogie",
    dark: false,
  },
  {
    icon: PartyPopperIcon,
    title: "Vie scolaire",
    text: "Cantine, BCD, théâtre, clubs et sorties : une vie scolaire riche en dehors des cours.",
    href: "/vie-scolaire",
    dark: false,
  },
  {
    icon: StampIcon,
    title: "Cambridge",
    text: "Centre agréé Cambridge Assessment English, de YLE Starters au PET.",
    href: "/cambridge",
    dark: false,
  },
] as const;

export function Pillars() {
  return (
    <section className="py-11 sm:py-14">
      <div className="container-page flex flex-col gap-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <SectionHeading
            title="Tout ce qu&rsquo;il faut pour grandir, apprendre et s&rsquo;épanouir"
            description="Quatre piliers pensés ensemble, du premier jour au baccalauréat."
          />
          <Reveal delay={0.1} className="mx-auto w-full max-w-[190px] sm:max-w-[250px] lg:max-w-[300px]">
            <Illustration
              src="/assets/undraw_education_3vwh.svg"
              width={744}
              height={539}
            />
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <RevealItem key={pillar.title}>
              <Link
                href={pillar.href}
                className={cn(
                  "group flex h-full flex-col justify-between gap-5 sm:gap-10 rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 transition-transform duration-300 hover:-translate-y-1",
                  pillar.dark
                    ? "bg-ink text-background"
                    : "bg-muted text-foreground"
                )}
              >
                <div className="flex items-start justify-between">
                  <pillar.icon
                    size={26}
                    className={cn("sm:size-[30px]", pillar.dark ? "text-brand" : "text-primary")}
                  />
                  <ArrowUpRightIcon
                    size={16}
                    className={cn(
                      "-translate-y-1 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100 sm:size-[18px]",
                      pillar.dark ? "text-background" : "text-foreground"
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1 sm:gap-2">
                  <h3 className="font-display text-base font-medium tracking-tight sm:text-lg">
                    {pillar.title}
                  </h3>
                  <p
                    className={cn(
                      "text-[12px] sm:text-[14px] leading-relaxed",
                      pillar.dark ? "text-background/60" : "text-muted-foreground"
                    )}
                  >
                    {pillar.text}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
