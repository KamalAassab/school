"use client";

import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { CircleCheckIcon } from "@/components/ui/circle-check";
import { XIcon } from "@/components/ui/x";

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
import { storage } from "@/lib/storage";

const slugs = cycles.map((c) => c.slug) as string[];

const cycleIllustrations: Partial<
  Record<string, { src: string; width: number; height: number }>
> = {
  prescolaire: { src: "/assets/undraw_family_6gj8.svg", width: 453, height: 472 },
  primaire: { src: "/assets/undraw_true-friends_1h3v.svg", width: 800, height: 701 },
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

function MobileScheduleModal({
  slug,
  cycleLabel,
}: {
  slug: string;
  cycleLabel: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedLevelIdx, setSelectedLevelIdx] = React.useState(0);
  const schedule = cycleSchedules[slug];
  if (!schedule) return null;

  const currentLevel = schedule.levels[selectedLevelIdx] ?? schedule.levels[0];
  const totalHours = currentLevel.hours[currentLevel.hours.length - 1];

  const subjectsWithHours = schedule.subjects
    .map((subject, idx) => ({
      subject,
      hours: currentLevel.hours[idx],
    }))
    .filter((item) => item.subject !== "Total H/N" && item.hours !== "-");

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="group flex w-full items-center justify-between py-4 text-left font-display text-base font-medium tracking-tight text-foreground transition-colors hover:text-primary"
        >
          <span>Voir l&rsquo;emploi du temps type</span>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-primary shadow-xs ring-1 ring-ink/[0.08]">
            <span>Consulter</span>
            <ArrowRightIcon size={14} />
          </div>
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby="schedule-modal-description"
          className="fixed inset-x-3 bottom-4 top-4 z-50 flex max-h-[92vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-ink/[0.08] px-5 py-4 bg-white">
            <div className="flex flex-col gap-0.5">
              <DialogPrimitive.Title className="font-display text-lg font-medium tracking-tight text-foreground">
                Emploi du temps type
              </DialogPrimitive.Title>
              <p id="schedule-modal-description" className="text-xs text-muted-foreground">
                {cycleLabel} · Volume horaire hebdomadaire
              </p>
            </div>
            <DialogPrimitive.Close className="flex size-8 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-ink/[0.08]">
              <XIcon size={18} />
              <span className="sr-only">Fermer</span>
            </DialogPrimitive.Close>
          </div>

          {/* Level Pills */}
          <div className="scroll-fade-x flex gap-1.5 overflow-x-auto border-b border-ink/[0.06] bg-muted/40 px-4 py-2.5 [scrollbar-width:none]">
            {schedule.levels.map((lvl, idx) => {
              const isSelected = idx === selectedLevelIdx;
              return (
                <button
                  key={lvl.label}
                  type="button"
                  onClick={() => setSelectedLevelIdx(idx)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-white text-muted-foreground ring-1 ring-ink/10 hover:text-foreground"
                  )}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {/* Total Badge */}
            <div className="flex items-center justify-between rounded-2xl bg-secondary/80 px-4 py-3 border border-ink/[0.04]">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Niveau sélectionné
                </span>
                <span className="font-display text-base font-semibold text-foreground">
                  {currentLevel.label}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                  Total hebdomadaire
                </span>
                <span className="font-display text-xl font-bold text-primary">
                  {totalHours} h / semaine
                </span>
              </div>
            </div>

            {/* Subjects Grid (2 columns strictly fitting mobile screen) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground px-1">
                Répartition des matières ({subjectsWithHours.length})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {subjectsWithHours.map(({ subject, hours }) => (
                  <div
                    key={subject}
                    className="flex flex-col justify-between rounded-xl border border-ink/[0.06] bg-muted/25 p-3 shadow-2xs"
                  >
                    <span className="text-xs font-medium text-muted-foreground truncate">
                      {subject}
                    </span>
                    <span className="font-display text-base font-semibold text-foreground mt-1">
                      {hours} h
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Comparative Matrix in Details */}
            <div className="pt-2">
              <details className="group rounded-2xl border border-ink/[0.08] bg-muted/15 p-3">
                <summary className="cursor-pointer text-xs font-medium text-primary hover:underline list-none flex items-center justify-between">
                  <span>Voir la grille comparative complète</span>
                  <span className="text-[11px] text-muted-foreground">Glisser →</span>
                </summary>
                <div className="mt-3 overflow-x-auto rounded-xl border border-ink/[0.06] bg-white [scrollbar-width:none]">
                  <table className="w-full min-w-[580px] border-collapse text-xs">
                    <thead>
                      <tr className="bg-muted/50 text-[11px]">
                        <th className="sticky left-0 bg-muted/90 px-2.5 py-2 text-left font-medium">Niveau</th>
                        {schedule.subjects.map((s) => (
                          <th key={s} className={cn("px-2 py-2 text-center font-medium", s === "Total H/N" && "text-primary font-bold")}>
                            {s}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.levels.map((row, rIdx) => (
                        <tr key={row.label} className={cn("border-t border-ink/[0.04]", rIdx % 2 === 1 && "bg-muted/30")}>
                          <td className={cn("sticky left-0 px-2.5 py-1.5 font-medium whitespace-nowrap", rIdx % 2 === 1 ? "bg-muted/50" : "bg-white")}>
                            {row.label}
                          </td>
                          {row.hours.map((h, hIdx) => (
                            <td key={hIdx} className={cn("px-2 py-1.5 text-center text-muted-foreground", schedule.subjects[hIdx] === "Total H/N" && "font-bold text-primary")}>
                              {h}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-ink/[0.08] p-3 bg-white">
            <DialogPrimitive.Close asChild>
              <Button variant="outline" className="w-full h-11 rounded-full text-sm">
                Fermer
              </Button>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

const STORAGE_KEY = "pedagogie:activeTab";

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
    } else {
      const saved = storage.get(STORAGE_KEY);
      if (saved && slugs.includes(saved)) setValue(saved);
    }
  }, []);

  function handleTabChange(next: string) {
    setValue(next);
    storage.set(STORAGE_KEY, next);
  }

  return (
    <div ref={rootRef} className="scroll-mt-24">
      <Tabs value={value} onValueChange={handleTabChange} className="items-start">
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
            <div className="flex flex-col gap-5 rounded-2xl bg-muted/70 p-6 sm:p-7 lg:p-8 border border-ink/[0.05]">
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1.1fr_1.1fr_150px] lg:grid-cols-[1.15fr_1.15fr_170px] lg:gap-8">
                {/* 1. Cycle Info */}
                <div className="flex flex-col gap-3">
                  <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-2xs">
                    {cycle.age}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-tight sm:text-2xl lg:text-[26px]">
                    {cycle.label}
                  </h3>
                  <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-muted-foreground">
                    {cycle.description}
                  </p>
                  <Button asChild variant="outline" className="mt-1 w-fit bg-white h-10 px-4 text-xs font-medium shadow-2xs">
                    <Link href="/recrutement">
                      Recrutement · {cycle.short}
                      <ArrowRightIcon size={14} />
                    </Link>
                  </Button>
                </div>

                {/* 2. Key Highlights */}
                <div className="flex flex-col justify-center">
                  <span className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Points clés du cycle
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {cycle.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-foreground/85">
                        <CircleCheckIcon
                          size={16}
                          className="mt-0.5 shrink-0 text-primary"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Illustration */}
                {cycleIllustrations[cycle.slug] ? (
                  <div className="flex items-center justify-center py-2 md:py-0">
                    <Illustration
                      {...cycleIllustrations[cycle.slug]!}
                      className="max-h-[130px] w-auto max-w-[130px] sm:max-w-[145px] object-contain drop-shadow-2xs transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : null}
              </div>

              {/* Desktop view: standard accordion table */}
              <div className="hidden sm:block border-t border-ink/[0.08] pt-1 mt-1">
                <Accordion type="single" collapsible>
                  <AccordionItem value="emploi-du-temps" className="border-none">
                    <AccordionTrigger className="py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
                      <span className="flex items-center gap-2">
                        <span>Voir l&rsquo;emploi du temps type</span>
                        <span className="text-xs font-normal text-muted-foreground">({cycle.label})</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <ScheduleTable slug={cycle.slug} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Mobile view: dedicated modal fitting screen width */}
              <div className="sm:hidden border-t border-ink/[0.08] pt-2">
                <MobileScheduleModal slug={cycle.slug} cycleLabel={cycle.label} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
