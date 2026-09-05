import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { activites } from "@/lib/content";

const emojis = ["⚽", "🗺️", "🎉", "☪️", "🤝", "🎨", "🎭", "🌍", "❤️"];

const cardLayouts = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-1",
  "",
  "",
  "sm:col-span-2 lg:col-span-1",
  "",
  "",
  "",
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-1",
];

const cardStyles: Array<{ bg: string; text: string; sub: string; numColor: string }> = [
  { bg: "bg-ink", text: "text-background", sub: "text-background/60", numColor: "text-white/8" },
  { bg: "bg-amber-50", text: "text-foreground", sub: "text-foreground/60", numColor: "text-amber-200" },
  { bg: "bg-secondary", text: "text-foreground", sub: "text-foreground/60", numColor: "text-brand/15" },
  { bg: "bg-white ring-1 ring-ink/[0.06]", text: "text-foreground", sub: "text-muted-foreground", numColor: "text-ink/8" },
  { bg: "bg-rose-50", text: "text-foreground", sub: "text-foreground/60", numColor: "text-rose-200" },
  { bg: "bg-slate-100", text: "text-foreground", sub: "text-foreground/60", numColor: "text-slate-300" },
  { bg: "bg-amber-100/60", text: "text-foreground", sub: "text-foreground/60", numColor: "text-amber-300" },
  { bg: "bg-primary", text: "text-primary-foreground", sub: "text-primary-foreground/70", numColor: "text-white/10" },
  { bg: "bg-muted", text: "text-foreground", sub: "text-muted-foreground", numColor: "text-ink/8" },
];

export function ActivitesGrid() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {activites.map((activite, i) => {
        const style = cardStyles[i % cardStyles.length];
        const layout = cardLayouts[i] ?? "";
        return (
          <RevealItem
            key={activite.title}
            className={["relative overflow-hidden rounded-[28px] p-7 sm:p-8", style.bg, layout].join(" ")}
          >
            {/* Background number decoration */}
            <span
              aria-hidden
              className={[
                "pointer-events-none absolute -right-3 -top-3 select-none font-display text-[7rem] font-bold leading-none",
                style.numColor,
              ].join(" ")}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative flex h-full flex-col gap-4">
              {/* Emoji accent — no border circle */}
              <span className="text-3xl leading-none" aria-hidden>
                {emojis[i % emojis.length]}
              </span>

              <div className="flex flex-col gap-2">
                <h3 className={["font-display text-lg font-medium tracking-tight", style.text].join(" ")}>
                  {activite.title}
                </h3>
                <p className={["text-[14px] leading-relaxed", style.sub].join(" ")}>
                  {activite.text}
                </p>
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
