"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cambridgeLevels } from "@/lib/content";
import { storage } from "@/lib/storage";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cambridge:activeLevel";

const levelBadges: Record<string, string> = {
  "YLE Starters": "bg-amber-100 text-amber-800",
  "YLE Movers":   "bg-orange-100 text-orange-800",
  "YLE Flyers":   "bg-rose-100 text-rose-800",
  "KET":          "bg-violet-100 text-violet-800",
  "PET":          "bg-sky-100 text-sky-800",
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

  const activeLevel = cambridgeLevels.find((l) => l.code === active) ?? cambridgeLevels[0];
  const badgeClass = levelBadges[active] ?? "bg-primary/10 text-primary";

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Level selector: 5-column full-width segmented row on mobile, flex row on desktop */}
      <div className="grid grid-cols-5 gap-1 w-full sm:flex sm:flex-wrap sm:w-auto sm:gap-2">
        {cambridgeLevels.map((level) => {
          const isActive = level.code === active;
          const shortName = level.code.replace("YLE ", "");
          return (
            <button
              key={level.code}
              type="button"
              onClick={() => handleSelect(level.code)}
              className={cn(
                "flex items-center justify-center rounded-full py-2 px-1 text-center transition-all duration-150 cursor-pointer sm:px-4 sm:py-2",
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="text-[11px] xs:text-xs sm:hidden font-medium truncate">
                {shortName}
              </span>
              <span className="hidden sm:inline text-sm font-medium">
                {level.code}
              </span>
              <span
                className={cn(
                  "hidden lg:inline ml-1 text-[11px]",
                  isActive ? "text-white/80" : "text-muted-foreground/60"
                )}
              >
                ({level.audience})
              </span>
            </button>
          );
        })}
      </div>

      {/* Direct, clean card without nested boxes or bloated paddings */}
      <div className="rounded-2xl bg-white p-5 sm:p-6 border border-ink/[0.06] shadow-xs">
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
          {/* Book cover - direct showcase with no outer gray wrapper box */}
          <div className="relative aspect-[3/4] w-28 sm:w-36 lg:w-40 shrink-0 overflow-hidden rounded-xl shadow-md mx-auto sm:mx-0">
            <Image
              src={activeLevel.image}
              alt={`Manuel Cambridge ${activeLevel.code}`}
              fill
              sizes="(min-width: 1024px) 160px, (min-width: 640px) 144px, 112px"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 min-w-0 flex-col gap-3">
            {/* Header row: Title + Badge + Duration */}
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                {activeLevel.code}
              </h3>
              <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide", badgeClass)}>
                {activeLevel.audience}
              </span>
              <span className="text-xs text-muted-foreground">
                · {activeLevel.duration}
              </span>
            </div>

            {/* Description */}
            <p className="text-[14px] leading-relaxed text-foreground/85">
              {activeLevel.text}
            </p>

            {/* Candidate Profile / Details */}
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              <strong className="font-medium text-foreground/90">Profil &amp; compétences : </strong>
              {activeLevel.details}
            </p>

            {/* Test breakdown pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-medium text-muted-foreground">Épreuves :</span>
              {activeLevel.sections.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2.5 py-1 text-xs text-foreground/80"
                >
                  <span className="font-medium">{s.label}</span>
                  <span className="text-muted-foreground">({s.time})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
