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
    <RevealGroup className="no-scrollbar scroll-fade-x -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 sm:[mask-image:none] lg:grid-cols-4">
      {items.map((item) => {
        const Icon = icons[item.id];
        return (
          <RevealItem
            key={item.id}
            id={item.id}
            className="scroll-mt-24 flex h-full w-[74%] shrink-0 snap-start flex-col gap-4 overflow-hidden rounded-[28px] bg-muted transition-shadow duration-300 hover:shadow-[0_16px_40px_-16px_rgba(32,26,21,0.2)] sm:w-auto sm:shrink"
          >
            {"image" in item && item.image ? (
              <div className="img-zoom-wrap relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 24vw, 74vw"
                  className="img-zoom object-cover"
                />
                <div className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_20px_-8px_rgba(32,26,21,0.3)]">
                  <Icon size={20} />
                </div>
              </div>
            ) : (
              <Icon size={32} className="ml-5 mt-5 text-primary sm:ml-7 sm:mt-7" />
            )}
            <div className="flex flex-1 flex-col gap-2 px-5 pb-6 sm:px-7 sm:pb-7">
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
