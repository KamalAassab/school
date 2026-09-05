"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cambridgeLevels } from "@/lib/content";
import { storage } from "@/lib/storage";

const STORAGE_KEY = "cambridge:activeLevel";

const levelColors: Record<string, { bg: string; accent: string; badge: string }> = {
  "YLE Starters": { bg: "bg-amber-50", accent: "text-amber-700", badge: "bg-amber-100 text-amber-800" },
  "YLE Movers":   { bg: "bg-orange-50", accent: "text-orange-700", badge: "bg-orange-100 text-orange-800" },
  "YLE Flyers":   { bg: "bg-rose-50", accent: "text-rose-700", badge: "bg-rose-100 text-rose-800" },
  "KET":          { bg: "bg-violet-50", accent: "text-violet-700", badge: "bg-violet-100 text-violet-800" },
  "PET":          { bg: "bg-sky-50", accent: "text-sky-700", badge: "bg-sky-100 text-sky-800" },
};

export function LevelsExplorer() {
  const [active, setActive] = useState<string>(cambridgeLevels[0].code);

  useEffect(() => {
    const saved = storage.get(STORAGE_KEY);
    if (saved && cambridgeLevels.some((l) => l.code === saved)) {
      setActive(saved);
    }
  }, []);

  function handleSelect(code: string) {
    setActive(code);
    storage.set(STORAGE_KEY, code);
  }

  const activeLevel = cambridgeLevels.find((l) => l.code === active)!;
  const colors = levelColors[active] ?? levelColors["YLE Starters"];

  return (
    <div className="flex flex-col gap-6">
      {/* Book-shelf row */}
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-5 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
        {cambridgeLevels.map((level) => {
          const isActive = level.code === active;
          const c = levelColors[level.code] ?? levelColors["YLE Starters"];
          return (
            <button
              key={level.code}
              onClick={() => handleSelect(level.code)}
              className={[
                "group relative flex w-[52%] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] transition-all duration-300 sm:w-auto",
                isActive
                  ? "ring-2 ring-primary shadow-[0_16px_40px_-16px_rgba(32,26,21,0.30)] -translate-y-1"
                  : "opacity-80 hover:opacity-100 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(32,26,21,0.20)]",
              ].join(" ")}
            >
              {/* Book cover image */}
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={level.image}
                  alt={`Livre Cambridge ${level.code}`}
                  fill
                  sizes="(min-width: 640px) 20vw, 55vw"
                  className="object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10" />
                )}
              </div>
              {/* Label below image */}
              <div className={["px-3 py-2.5 text-left", c.bg].join(" ")}>
                <p className={["font-display text-[13px] font-semibold leading-tight", c.accent].join(" ")}>
                  {level.code}
                </p>
                <p className="text-[11px] text-foreground/50">{level.audience}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        key={active}
        className={[
          "grid grid-cols-1 gap-8 rounded-[28px] p-7 sm:p-10 lg:grid-cols-[1fr_1.6fr] lg:gap-12",
          colors.bg,
        ].join(" ")}
      >
        {/* Left: cover + quick stats */}
        <div className="flex flex-col gap-6">
          <div className="mx-auto w-full max-w-[180px] sm:max-w-none lg:max-w-none">
            <div className="img-zoom-wrap relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[0_20px_48px_-16px_rgba(32,26,21,0.28)]">
              <Image
                src={activeLevel.image}
                alt={`Manuel Cambridge ${active}`}
                fill
                sizes="(min-width: 1024px) 220px, 60vw"
                className="img-zoom object-cover"
              />
            </div>
          </div>

          {/* Duration table */}
          <div className="rounded-2xl bg-white/80 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-foreground/50">Durée totale</span>
              <span className={["font-display text-sm font-semibold", colors.accent].join(" ")}>{activeLevel.duration}</span>
            </div>
            <div className="flex flex-col gap-2 border-t border-ink/[0.07] pt-3">
              {activeLevel.sections.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="flex flex-col gap-5 lg:pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={["rounded-full px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wide", colors.badge].join(" ")}>
              {activeLevel.audience}
            </span>
          </div>
          <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
            {activeLevel.code}
          </h3>
          <p className="text-[16px] leading-relaxed text-foreground/80">
            {activeLevel.text}
          </p>
          <div className="rounded-2xl bg-white/60 px-6 py-5 text-[14px] leading-relaxed text-muted-foreground">
            {activeLevel.details}
          </div>
        </div>
      </div>
    </div>
  );
}
