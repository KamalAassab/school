import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";

import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { cycles } from "@/lib/content";

const cycleTheme = [
  { bg: "bg-amber-50", num: "text-amber-200", label: "bg-amber-100/80 text-amber-800" },
  { bg: "bg-secondary", num: "text-secondary-foreground/15", label: "bg-brand/10 text-primary" },
  { bg: "bg-slate-50", num: "text-slate-200", label: "bg-slate-100/80 text-slate-700" },
  { bg: "bg-ink", num: "text-white/10", label: "bg-brand/20 text-brand" },
];

export function CyclesRow() {
  return (
    <section className="py-11 sm:py-16">
      <div className="container-page flex flex-col gap-10">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">Cycles d'enseignement</p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Un accompagnement pensé pour chaque âge
          </h2>
          <p className="max-w-[50ch] text-[16px] leading-relaxed text-muted-foreground">
            Quatre cycles, une seule exigence : donner à chaque élève les moyens de réussir.
          </p>
        </div>

        {/* Bento grid */}
        <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {cycles.map((cycle, i) => {
            const theme = cycleTheme[i];
            const isDark = i === 3;
            return (
              <RevealItem key={cycle.slug}>
                <Link
                  href={`/pedagogie#${cycle.slug}`}
                  className={[
                    "group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1 sm:min-h-[320px] lg:min-h-[360px]",
                    theme.bg,
                    isDark
                      ? "hover:shadow-[0_24px_56px_-20px_rgba(32,26,21,0.55)]"
                      : "hover:shadow-[0_24px_56px_-20px_rgba(32,26,21,0.22)]",
                  ].join(" ")}
                >
                  {/* Large background number */}
                  <span
                    aria-hidden
                    className={[
                      "pointer-events-none absolute -right-4 -top-2 select-none font-display text-[9rem] font-bold leading-none sm:text-[10rem]",
                      theme.num,
                    ].join(" ")}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Top */}
                  <div className="relative flex flex-col gap-3">
                    <span
                      className={[
                        "w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
                        theme.label,
                      ].join(" ")}
                    >
                      {cycle.age}
                    </span>
                    <h3
                      className={[
                        "font-display text-2xl font-medium tracking-tight sm:text-3xl",
                        isDark ? "text-background" : "text-foreground",
                      ].join(" ")}
                    >
                      {cycle.short}
                    </h3>
                  </div>

                  {/* Bottom */}
                  <div className="relative flex flex-col gap-4">
                    <p
                      className={[
                        "text-[14px] leading-relaxed",
                        isDark ? "text-background/65" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {cycle.description}
                    </p>

                    {/* Highlights */}
                    <ul className="flex flex-col gap-1.5">
                      {cycle.highlights.map((h) => (
                        <li
                          key={h}
                          className={[
                            "flex items-start gap-2 text-[12.5px] leading-snug",
                            isDark ? "text-background/60" : "text-foreground/65",
                          ].join(" ")}
                        >
                          <span aria-hidden className={["mt-[5px] size-1.5 shrink-0 rounded-full", isDark ? "bg-brand" : "bg-primary/50"].join(" ")} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* CTA arrow */}
                    <div
                      className={[
                        "flex items-center gap-1.5 text-[13px] font-medium opacity-0 transition-all duration-300 group-hover:opacity-100",
                        isDark ? "text-brand" : "text-primary",
                      ].join(" ")}
                    >
                      Voir le cycle
                      <ArrowUpRightIcon size={15} />
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
