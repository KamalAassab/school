"use client";

import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { CircleCheckIcon } from "@/components/ui/circle-check";
import { XIcon } from "@/components/ui/x";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

function ScheduleSheet({
  slug,
  cycleLabel,
}: {
  slug: string;
  cycleLabel: string;
}) {
  const [open, setOpen] = React.useState(false);
  const schedule = cycleSchedules[slug];
  if (!schedule) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="group flex w-full items-center justify-between py-2 text-left font-display text-sm sm:text-base font-medium tracking-tight text-foreground transition-colors hover:text-primary cursor-pointer"
        >
          <span>Voir l&rsquo;emploi du temps type</span>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-primary shadow-xs ring-1 ring-ink/[0.08] transition-transform duration-200 group-hover:translate-x-0.5">
            <span>Consulter</span>
            <ArrowRightIcon size={14} />
          </div>
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-xs transition-opacity duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-full sm:max-w-xl md:max-w-2xl flex-col bg-[#FAF8F5] text-foreground shadow-2xl border-l border-ink/[0.08] outline-none duration-300 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
        >
          <DialogPrimitive.Description className="sr-only">
            Emploi du temps type pour le cycle {cycleLabel}
          </DialogPrimitive.Description>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ink/[0.08] bg-white px-6 py-5 shrink-0">
            <div className="flex items-center gap-3">
              <DialogPrimitive.Title className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Emploi du temps type
              </DialogPrimitive.Title>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                {cycleLabel}
              </span>
            </div>
            <DialogPrimitive.Close className="flex size-9 shrink-0 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-ink/[0.06] hover:text-foreground cursor-pointer -mr-2">
              <XIcon size={18} />
              <span className="sr-only">Fermer</span>
            </DialogPrimitive.Close>
          </div>

          {/* Scrollable Body: Table (Auto-adjusted columns) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-ink/[0.08] bg-white shadow-xs">
              <div className="no-scrollbar scroll-fade-x overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-ink/[0.08] bg-muted/40">
                      <th className="sticky left-0 z-20 bg-[#F4F1EB] px-3.5 py-2.5 text-left font-display font-semibold text-foreground whitespace-nowrap shadow-[1px_0_0_0_rgba(32,26,21,0.06)]">
                        Matière
                      </th>
                      {schedule.levels.map((lvl) => (
                        <th
                          key={lvl.label}
                          className="px-3 py-2.5 text-center font-display font-semibold whitespace-nowrap text-foreground/85"
                        >
                          {lvl.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/[0.05]">
                    {schedule.subjects.map((subject, sIdx) => {
                      const isTotal = subject === "Total H/N";

                      if (isTotal) {
                        return (
                          <tr
                            key={subject}
                            className="bg-primary/5 font-semibold border-t border-primary/20"
                          >
                            <td className="sticky left-0 z-10 bg-[#FAF4ED] px-3.5 py-2.5 font-display font-bold text-primary whitespace-nowrap shadow-[1px_0_0_0_rgba(32,26,21,0.06)]">
                              Total / sem.
                            </td>
                            {schedule.levels.map((lvl) => (
                              <td
                                key={lvl.label}
                                className="px-3 py-2.5 text-center font-display font-bold text-primary whitespace-nowrap"
                              >
                                {lvl.hours[sIdx]} h
                              </td>
                            ))}
                          </tr>
                        );
                      }

                      return (
                        <tr
                          key={subject}
                          className={cn(
                            "transition-colors hover:bg-primary/[0.02]",
                            sIdx % 2 === 1 ? "bg-muted/25" : "bg-white"
                          )}
                        >
                          <td
                            className={cn(
                              "sticky left-0 z-10 px-3.5 py-2 font-medium text-foreground whitespace-nowrap shadow-[1px_0_0_0_rgba(32,26,21,0.06)]",
                              sIdx % 2 === 1 ? "bg-[#F9F7F3]" : "bg-white"
                            )}
                          >
                            {subject}
                          </td>
                          {schedule.levels.map((lvl) => {
                            const val = lvl.hours[sIdx];
                            return (
                              <td
                                key={lvl.label}
                                className={cn(
                                  "px-3 py-2 text-center text-[13px] whitespace-nowrap",
                                  val === "-"
                                    ? "text-muted-foreground/40"
                                    : "text-foreground/80 font-medium"
                                )}
                              >
                                {val !== "-" ? `${val} h` : "—"}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footnote */}
            <div className="rounded-xl border border-ink/[0.05] bg-white/70 p-4 text-xs text-muted-foreground leading-relaxed">
              * Horaires conformes aux programmes officiels du Ministère de l&apos;Éducation Nationale, complétés par les dispositifs d&apos;excellence linguistique et d&apos;accompagnement de School Academy.
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-ink/[0.08] bg-white p-4 shrink-0 flex items-center justify-between gap-3">
            <DialogPrimitive.Close asChild>
              <Button variant="outline" className="flex-1 rounded-full text-xs font-medium h-10 cursor-pointer">
                Fermer
              </Button>
            </DialogPrimitive.Close>
            <Button asChild className="flex-1 rounded-full text-xs font-medium h-10 shadow-xs cursor-pointer">
              <Link href="/inscription">
                Candidater
                <ArrowRightIcon size={14} />
              </Link>
            </Button>
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
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl font-medium tracking-tight sm:text-2xl lg:text-[26px]">
                      {cycle.label}
                    </h3>
                    <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-2xs">
                      {cycle.age}
                    </span>
                  </div>
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

              {/* Schedule Sheet (right slide-over side) */}
              <div className="border-t border-ink/[0.08] pt-2 mt-1">
                <ScheduleSheet slug={cycle.slug} cycleLabel={cycle.label} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
