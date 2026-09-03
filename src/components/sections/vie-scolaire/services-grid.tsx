import {
  Books,
  MaskHappy,
  Flask,
  SoccerBall,
  Backpack,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { espaceScolaire } from "@/lib/content";

const icons: Record<string, Icon> = {
  bcd: Books,
  theatre: MaskHappy,
  laboratoires: Flask,
  sport: SoccerBall,
  fournitures: Backpack,
};

export function ServicesGrid() {
  const items = espaceScolaire.filter((item) => item.id !== "cantine");

  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = icons[item.id];
        return (
          <RevealItem
            key={item.id}
            id={item.id}
            className="scroll-mt-24 flex h-full flex-col gap-4 rounded-[28px] bg-muted p-7"
          >
            <Icon weight="regular" className="size-8 text-primary" />
            <h3 className="font-display text-lg font-medium tracking-tight">
              {item.title}
            </h3>
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {item.text}
            </p>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
