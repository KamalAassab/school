"use client";

import * as React from "react";
import Image from "next/image";
import { BookTextIcon } from "@/components/ui/book-text";
import { SmilePlusIcon } from "@/components/ui/smile-plus";
import { FlaskIcon } from "@/components/ui/flask";
import { BicepsFlexedIcon } from "@/components/ui/biceps-flexed";
import { ArrowLeftIcon } from "@/components/ui/arrow-left";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import type { IconComponent } from "@/lib/icon-type";
import { espaceScolaire } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons: Record<string, IconComponent> = {
  bcd: BookTextIcon,
  theatre: SmilePlusIcon,
  laboratoires: FlaskIcon,
  sport: BicepsFlexedIcon,
};

const facilityTags: Record<string, string[]> = {
  bcd: ["Médiathèque & Lecture", "Tableau interactif", "Ressources numériques"],
  theatre: ["140 places assises", "Scène & Coulisses", "Acoustique professionnelle"],
  laboratoires: ["Normes de sécurité", "Préparation d'expériences", "Matériel scientifique"],
  sport: ["Piscine chauffée 300 m³", "Terrain synthétique", "Mur d'escalade & Tatami"],
};

const items = espaceScolaire.filter(
  (item) => item.id !== "cantine" && item.id !== "fournitures"
);

export function ServicesGrid() {
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    function syncHash() {
      const hash = window.location.hash.replace("#", "");
      const foundIdx = items.findIndex((it) => it.id === hash);
      if (foundIdx !== -1) {
        setActiveIdx(foundIdx);
      }
    }

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  function handleSelect(idx: number) {
    setActiveIdx(idx);
    if (typeof window !== "undefined" && items[idx]) {
      window.history.replaceState(null, "", `#${items[idx].id}`);
    }
  }

  const activeItem = items[activeIdx] ?? items[0];
  const ActiveIcon = icons[activeItem.id];
  const tags = facilityTags[activeItem.id] ?? [];

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* 4 Smart Selector Tabs */}
      <div className="relative z-10 grid grid-cols-2 gap-2 w-full sm:flex sm:flex-wrap sm:justify-center sm:w-auto">
        {items.map((item, idx) => {
          const Icon = icons[item.id];
          const isActive = idx === activeIdx;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-2xl sm:rounded-full px-3 py-2.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all cursor-pointer text-center min-h-[44px] w-full sm:w-auto select-none",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-foreground/80 hover:bg-white/90 border border-ink/[0.06] hover:text-foreground"
              )}
            >
              <Icon size={18} className={cn("shrink-0", isActive ? "text-white" : "text-primary")} />
              <span className="leading-snug">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Smart Showcase Stage */}
      <div
        id={activeItem.id}
        className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-6 sm:gap-8 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border border-ink/[0.06] shadow-xs"
      >
        {/* Left: Info */}
        <div className="flex flex-col justify-between gap-5 order-2 lg:order-1">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <ActiveIcon size={28} className="text-primary shrink-0" />
              <h3 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                {activeItem.title}
              </h3>
            </div>
            <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
              {activeItem.text}
            </p>
          </div>

          {/* Key tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-ink/[0.06]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground/80 border border-ink/[0.04]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Quick prev/next controls */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">
              Espace {activeIdx + 1} sur {items.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  handleSelect(activeIdx > 0 ? activeIdx - 1 : items.length - 1)
                }
                aria-label="Espace précédent"
                className="flex size-9 items-center justify-center rounded-full bg-muted/70 text-foreground transition-colors hover:bg-primary hover:text-white cursor-pointer"
              >
                <ArrowLeftIcon size={16} />
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSelect(activeIdx < items.length - 1 ? activeIdx + 1 : 0)
                }
                aria-label="Espace suivant"
                className="flex size-9 items-center justify-center rounded-full bg-muted/70 text-foreground transition-colors hover:bg-primary hover:text-white cursor-pointer"
              >
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: High Res Photo */}
        <div className="order-1 lg:order-2">
          <div className="img-zoom-wrap relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-muted shadow-sm">
            {"image" in activeItem && activeItem.image ? (
              <Image
                key={activeItem.image}
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="img-zoom object-cover"
                preload
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
