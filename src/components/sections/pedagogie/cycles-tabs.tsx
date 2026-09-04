"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { CircleCheckIcon } from "@/components/ui/circle-check";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Illustration } from "@/components/site/illustration";
import { cn } from "@/lib/utils";
import { cycles, cycleSchedules } from "@/lib/content";

const slugs = cycles.map((c) => c.slug) as string[];

const cycleIllustrations: Partial<
  Record<string, { src: string; width: number; height: number }>
> = {
  college: { src: "/assets/undraw_mathematics_0j2b.svg", width: 690, height: 800 },
  lycee: { src: "/assets/undraw_physics_8tvl.svg", width: 763, height: 801 },
};

function ScheduleTable({ slug }: { slug: string }) {
  const schedule = cycleSchedules[slug];
  if (!schedule) return null;

  return (
    <div className="no-scrollbar scroll-fade-x overflow-x-auto rounded-2xl border border-ink/[0.08] bg-white">
      <table className="w-full min-w-[640px] border-collapse text-[13px]">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white px-4 py-3 text-left font-display font-medium whitespace-nowrap">
              Niveau
            </th>
            {schedule.subjects.map((subject) => (
              <th
                key={subject}
                className={cn(
                  "px-3 py-3 text-center font-display font-medium whitespace-nowrap",
                  subject === "Total H/N" && "text-primary"
                )}
              >
                {subject}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule.levels.map((row, i) => (
            <tr
              key={row.label}
              className={cn("border-t border-ink/[0.06]", i % 2 === 1 && "bg-muted/50")}
            >
              <td
                className={cn(
                  "sticky left-0 z-10 px-4 py-2.5 font-medium whitespace-nowrap",
                  i % 2 === 1 ? "bg-muted/50" : "bg-white"
                )}
              >
                {row.label}
              </td>
              {row.hours.map((hour, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-3 py-2.5 text-center text-muted-foreground",
                    schedule.subjects[j] === "Total H/N" && "font-semibold text-primary"
                  )}
                >
                  {hour}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CyclesTabs() {
  const [value, setValue] = React.useState<string>(cycles[0].slug);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (slugs.includes(hash)) {
      setValue(hash);
      requestAnimationFrame(() => {
        rootRef.current?.scrollIntoView({ block: "start" });
      });
    }
  }, []);

  return (
    <div ref={rootRef} className="scroll-mt-24">
      <Tabs value={value} onValueChange={setValue} className="items-start">
        <TabsList>
          {cycles.map((cycle) => (
            <TabsTrigger key={cycle.slug} value={cycle.slug}>
              {cycle.short}
            </TabsTrigger>
          ))}
        </TabsList>

        {cycles.map((cycle) => (
          <TabsContent
            key={cycle.slug}
            value={cycle.slug}
            id={cycle.slug}
            className="scroll-mt-24"
          >
            <div className="flex flex-col gap-6 rounded-[28px] bg-muted p-8 sm:p-10">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
                <div className="flex flex-col gap-5">
                  <span className="w-fit rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-primary">
                    {cycle.age}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
                    {cycle.label}
                  </h3>
                  <p className="max-w-[48ch] text-[16px] leading-relaxed text-muted-foreground">
                    {cycle.description}
                  </p>
                  <Button asChild variant="outline" className="mt-1 w-fit bg-white">
                    <Link href="/recrutement">
                      Recrutement · {cycle.short}
                      <ArrowRightIcon size={16} />
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-col gap-6">
                  {cycleIllustrations[cycle.slug] ? (
                    <Illustration
                      {...cycleIllustrations[cycle.slug]!}
                      className="mx-auto max-w-[140px] sm:max-w-[160px]"
                    />
                  ) : null}
                  <ul className="flex flex-col gap-4">
                    {cycle.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <CircleCheckIcon
                          size={20}
                          className="mt-0.5 shrink-0 text-primary"
                        />
                        <span className="text-[15px] leading-relaxed text-foreground/85">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="emploi-du-temps" className="border-ink/[0.08]">
                  <AccordionTrigger className="py-4 text-base">
                    Voir l&rsquo;emploi du temps type
                  </AccordionTrigger>
                  <AccordionContent>
                    <ScheduleTable slug={cycle.slug} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
