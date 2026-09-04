import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";

import { SectionHeading } from "@/components/site/section-heading";
import { RevealGroup, RevealItem, Reveal } from "@/components/site/reveal";
import { Illustration } from "@/components/site/illustration";
import { cycles } from "@/lib/content";

export function CyclesRow() {
  return (
    <section className="bg-muted/60 py-11 sm:py-14">
      <div className="container-page flex flex-col gap-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionHeading
            title="Un accompagnement pensé pour chaque âge"
            description="Quatre cycles, une seule exigence : donner à chaque élève les moyens de réussir."
          />
          <Reveal delay={0.1} className="mx-auto w-full max-w-sm lg:max-w-none">
            <Illustration
              src="/assets/undraw_graduation_u7uc.svg"
              width={811}
              height={304}
            />
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {cycles.map((cycle, i) => (
            <RevealItem key={cycle.slug}>
              <Link
                href={`/pedagogie#${cycle.slug}`}
                className="group flex h-full flex-col gap-6 rounded-[28px] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(32,26,21,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-medium text-primary/25">
                    0{i + 1}
                  </span>
                  <ArrowUpRightIcon
                    size={20}
                    className="-translate-y-1 translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-lg font-medium tracking-tight">
                    {cycle.short}
                  </h3>
                  <p className="text-[13px] font-medium text-primary">{cycle.age}</p>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
                    {cycle.description}
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
