import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import type { IconComponent } from "@/lib/icon-type";

export function PageHero({
  title,
  description,
  icon: IconCmp,
  stats,
  className,
}: {
  title: React.ReactNode;
  description: string;
  icon: IconComponent;
  stats?: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pt-8 pb-10 sm:pt-10 sm:pb-12", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-[-140px] size-[460px] rounded-full bg-brand/[0.09] blur-3xl"
      />
      <div className="container-page relative flex flex-col gap-8">
        <Reveal className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <IconCmp size={32} className="shrink-0 text-primary" />
            <h1 className="font-display text-[2.25rem] font-medium leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h1>
          </div>
          <p className="max-w-[70ch] text-[17px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>

        {stats && stats.length > 0 ? (
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
