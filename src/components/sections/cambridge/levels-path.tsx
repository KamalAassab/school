import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { cambridgeLevels } from "@/lib/content";

export function LevelsPath() {
  return (
    <RevealGroup className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block"
      />
      {cambridgeLevels.map((level, i) => (
        <RevealItem
          key={level.code}
          className="relative flex flex-col gap-4 rounded-[24px] bg-white p-6"
        >
          <div className="flex items-center justify-between">
            <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-primary font-display text-base font-medium text-primary-foreground">
              {i + 1}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-lg font-medium tracking-tight">
              {level.code}
            </h3>
            <p className="text-[13px] font-medium text-primary">{level.audience}</p>
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {level.text}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
