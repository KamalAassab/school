import Link from "next/link";
import {
  Compass,
  ChalkboardTeacher,
  Confetti,
  Certificate,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";

import { SectionHeading } from "@/components/site/section-heading";
import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: Compass,
    title: "Présentation",
    text: "Notre concept, nos missions et les valeurs qui guident chaque décision pédagogique.",
    href: "/presentation",
    span: "lg:col-span-3 lg:row-span-2",
    dark: true,
  },
  {
    icon: ChalkboardTeacher,
    title: "Pédagogie",
    text: "Un parcours structuré du préscolaire au lycée, porté par le numérique et l'orientation.",
    href: "/pedagogie",
    span: "lg:col-span-3",
    dark: false,
  },
  {
    icon: Confetti,
    title: "Vie scolaire",
    text: "Cantine, BCD, théâtre, clubs et sorties : une vie scolaire riche en dehors des cours.",
    href: "/vie-scolaire",
    span: "lg:col-span-2",
    dark: false,
  },
  {
    icon: Certificate,
    title: "Cambridge",
    text: "Centre agréé Cambridge Assessment English, de YLE Starters au PET.",
    href: "/cambridge",
    span: "lg:col-span-1",
    dark: false,
  },
] as const;

export function Pillars() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading
          eyebrow="Un parcours complet"
          title="Tout ce qu&rsquo;il faut pour grandir, apprendre et s&rsquo;épanouir"
          description="Quatre piliers pensés ensemble, du premier jour au baccalauréat."
        />

        <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {pillars.map((pillar) => (
            <RevealItem key={pillar.title} className={cn(pillar.span)}>
              <Link
                href={pillar.href}
                className={cn(
                  "group flex h-full min-h-[220px] flex-col justify-between gap-8 rounded-[28px] p-8 transition-transform duration-300 hover:-translate-y-1",
                  pillar.dark
                    ? "bg-ink text-background"
                    : "bg-muted text-foreground"
                )}
              >
                <div className="flex items-start justify-between">
                  <pillar.icon
                    weight="regular"
                    className={cn(
                      "size-9",
                      pillar.dark ? "text-brand" : "text-primary"
                    )}
                  />
                  <ArrowUpRight
                    weight="bold"
                    className={cn(
                      "size-5 -translate-y-1 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100",
                      pillar.dark ? "text-background" : "text-foreground"
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p
                    className={cn(
                      "max-w-[38ch] text-[15px] leading-relaxed",
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
