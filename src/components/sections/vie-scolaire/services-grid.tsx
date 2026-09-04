import Image from "next/image";
import { BookTextIcon } from "@/components/ui/book-text";
import { SmilePlusIcon } from "@/components/ui/smile-plus";
import { FlaskIcon } from "@/components/ui/flask";
import { BicepsFlexedIcon } from "@/components/ui/biceps-flexed";
import type { IconComponent } from "@/lib/icon-type";

import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { espaceScolaire } from "@/lib/content";

const icons: Record<string, IconComponent> = {
  bcd: BookTextIcon,
  theatre: SmilePlusIcon,
  laboratoires: FlaskIcon,
  sport: BicepsFlexedIcon,
};

export function ServicesGrid() {
  const items = espaceScolaire.filter(
    (item) => item.id !== "cantine" && item.id !== "fournitures"
  );

  return (
    <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = icons[item.id];
        return (
          <RevealItem
            key={item.id}
            id={item.id}
            className="scroll-mt-24 flex h-full flex-col gap-4 overflow-hidden rounded-[28px] bg-muted"
          >
            {"image" in item && item.image ? (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 24vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_20px_-8px_rgba(32,26,21,0.3)]">
                  <Icon size={20} />
                </div>
              </div>
            ) : (
              <Icon size={32} className="ml-7 mt-7 text-primary" />
            )}
            <div className="flex flex-1 flex-col gap-2 px-7 pb-7">
              <h3 className="font-display text-lg font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
