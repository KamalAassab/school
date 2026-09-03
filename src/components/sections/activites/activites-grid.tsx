import {
  Trophy,
  Compass,
  Confetti,
  MoonStars,
  HandHeart,
  Lightbulb,
  Binoculars,
  Flag,
  Heart,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { activites } from "@/lib/content";

const icons: Icon[] = [Trophy, Compass, Confetti, MoonStars, HandHeart, Lightbulb, Binoculars, Flag, Heart];

export function ActivitesGrid() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {activites.map((activite, i) => {
        const Icon = icons[i % icons.length];
        const featured = i === 0;
        return (
          <RevealItem
            key={activite.title}
            className={
              featured
                ? "flex flex-col justify-between gap-8 rounded-[28px] bg-ink p-8 text-background sm:col-span-2 sm:row-span-1 lg:col-span-2"
                : "flex flex-col gap-4 rounded-[28px] bg-muted p-7"
            }
          >
            <Icon
              weight="regular"
              className={featured ? "size-9 text-brand" : "size-8 text-primary"}
            />
            <div className="flex flex-col gap-2">
              <h3
                className={
                  featured
                    ? "font-display text-xl font-medium tracking-tight text-background"
                    : "font-display text-lg font-medium tracking-tight"
                }
              >
                {activite.title}
              </h3>
              <p
                className={
                  featured
                    ? "max-w-[46ch] text-[15px] leading-relaxed text-background/60"
                    : "text-[14px] leading-relaxed text-muted-foreground"
                }
              >
                {activite.text}
              </p>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
