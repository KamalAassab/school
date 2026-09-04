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
        <Reveal className="flex flex-col items-center gap-4 text-center sm:items-start sm:gap-5 sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <IconCmp size={30} className="shrink-0 text-primary" />
            <h1 className="font-display text-[1.5rem] font-medium leading-[1.2] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h1>
          </div>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground sm:max-w-[70ch] sm:text-[17px]">
            {description}
          </p>
        </Reveal>

        {stats && stats.length > 0 ? (
          <Reveal
            delay={0.1}
            className={cn(
              "grid gap-3 sm:gap-4",
              stats.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
            )}
          >
            {stats.map((stat) => {
              const isLong = stat.value.length > 25;
              return (
                <div
                  key={stat.label}
                  className="group relative flex flex-col justify-between gap-2.5 rounded-2xl border border-ink/[0.07] bg-white/90 p-5 shadow-[0_2px_8px_-2px_rgba(32,26,21,0.04)] backdrop-blur-xs transition-all duration-200 hover:border-ink/15 hover:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-brand/80 shrink-0" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/90">
                      {stat.label}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "font-display font-medium tracking-tight",
                      isLong
                        ? "text-[15px] leading-snug text-foreground/90"
                        : "text-xl font-semibold text-primary sm:text-2xl"
                    )}
                  >
                    {stat.value}
                  </span>
                </div>
              );
            })}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
