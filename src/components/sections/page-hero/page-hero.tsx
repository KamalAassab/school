import type { Icon } from "@phosphor-icons/react";

import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  icon: IconCmp,
  stats,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  icon: Icon;
  stats?: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-16", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-[-140px] size-[460px] rounded-full bg-brand/[0.09] blur-3xl"
      />
      <div className="container-page relative grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-[13px] font-medium text-secondary-foreground">
            <IconCmp weight="fill" className="size-3.5 text-primary" />
            {eyebrow}
          </span>
          <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="max-w-[58ch] text-[17px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>

        {stats && stats.length > 0 ? (
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 rounded-2xl bg-muted px-5 py-4"
              >
                <span className="font-display text-2xl font-medium text-primary">
                  {stat.value}
                </span>
                <span className="text-[13px] text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
