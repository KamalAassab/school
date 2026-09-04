"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cambridgeLevels } from "@/lib/content";

export function LevelsExplorer() {
  return (
    <Tabs defaultValue={cambridgeLevels[0].code} className="w-full items-start">
      <TabsList className="grid w-full grid-cols-5 p-1 gap-1 sm:inline-flex sm:w-auto sm:p-1.5 sm:gap-1">
        {cambridgeLevels.map((level) => (
          <TabsTrigger
            key={level.code}
            value={level.code}
            className="w-full min-w-0 px-1 text-[11px] font-medium sm:w-auto sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">{level.code.replace(/^YLE\s+/, "")}</span>
            <span className="hidden sm:inline">{level.code}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {cambridgeLevels.map((level) => (
        <TabsContent key={level.code} value={level.code}>
          <div className="grid grid-cols-1 gap-8 rounded-[28px] bg-muted p-8 sm:p-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
            <div className="mx-auto w-full max-w-[200px] lg:max-w-none">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_20px_45px_-15px_rgba(32,26,21,0.3)]">
                <Image
                  src={level.image}
                  alt={`Manuel Cambridge English, ${level.code}`}
                  fill
                  sizes="(min-width: 1024px) 220px, 60vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <span className="w-fit rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-primary">
                {level.audience}
              </span>
              <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
                {level.code}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {level.text}
              </p>
              <p className="text-[14px] leading-relaxed text-foreground/75">
                {level.details}
              </p>

              <div className="flex flex-col gap-3 rounded-2xl bg-white p-5">
                <div className="flex items-center justify-between text-[13px] font-medium">
                  <span>Durée totale</span>
                  <span className="text-primary">{level.duration}</span>
                </div>
                <div className="flex flex-col gap-2 border-t border-ink/[0.06] pt-3">
                  {level.sections.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between text-[13px]"
                    >
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-medium text-foreground">{s.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
