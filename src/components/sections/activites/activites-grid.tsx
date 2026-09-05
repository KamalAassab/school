import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { activites } from "@/lib/content";
import { cn } from "@/lib/utils";

import { BicepsFlexedIcon } from "@/components/ui/biceps-flexed";
import { CompassIcon } from "@/components/ui/compass";
import { PartyPopperIcon } from "@/components/ui/party-popper";
import { MoonIcon } from "@/components/ui/moon";
import { UsersRoundIcon } from "@/components/ui/users-round";
import { BlocksIcon } from "@/components/ui/blocks";
import { SmilePlusIcon } from "@/components/ui/smile-plus";
import { EarthIcon } from "@/components/ui/earth";
import { HandHeartIcon } from "@/components/ui/hand-heart";

const activityIcons = [
  BicepsFlexedIcon, // 01 Clubs sportifs
  CompassIcon,      // 02 Sorties scolaires
  PartyPopperIcon,  // 03 Carnaval / Kermesse
  MoonIcon,         // 04 Fêtes religieuses
  UsersRoundIcon,   // 05 Parrainage et soutien
  BlocksIcon,       // 06 Activités thématiques
  SmilePlusIcon,    // 07 Visites et activités ludiques
  EarthIcon,        // 08 Journées nationales et internationales
  HandHeartIcon,    // 09 Donation
];

const cardStyles = [
  { bg: "bg-ink", text: "text-background", sub: "text-background/70", numColor: "text-white/10", iconColor: "text-brand" },
  { bg: "bg-amber-50", text: "text-foreground", sub: "text-foreground/60", numColor: "text-amber-200", iconColor: "text-primary" },
  { bg: "bg-secondary", text: "text-foreground", sub: "text-foreground/60", numColor: "text-brand/15", iconColor: "text-primary" },
  { bg: "bg-white ring-1 ring-ink/[0.06]", text: "text-foreground", sub: "text-muted-foreground", numColor: "text-ink/8", iconColor: "text-primary" },
  { bg: "bg-rose-50", text: "text-foreground", sub: "text-foreground/60", numColor: "text-rose-200", iconColor: "text-primary" },
  { bg: "bg-slate-100", text: "text-foreground", sub: "text-foreground/60", numColor: "text-slate-300", iconColor: "text-primary" },
  { bg: "bg-amber-100/60", text: "text-foreground", sub: "text-foreground/60", numColor: "text-amber-300", iconColor: "text-primary" },
  { bg: "bg-primary", text: "text-primary-foreground", sub: "text-primary-foreground/70", numColor: "text-white/10", iconColor: "text-white" },
  { bg: "bg-muted", text: "text-foreground", sub: "text-muted-foreground", numColor: "text-ink/8", iconColor: "text-primary" },
];

export function ActivitesGrid() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 sm:gap-5">
      {activites.map((activite, i) => {
        const style = cardStyles[i % cardStyles.length];
        const Icon = activityIcons[i % activityIcons.length];

        return (
          <RevealItem
            key={activite.title}
            className={cn(
              "relative flex flex-col justify-between gap-3.5 overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
              style.bg
            )}
          >
            {/* Background number decoration */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute -right-1 -top-1 select-none font-display text-[4.75rem] font-bold leading-none",
                style.numColor
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10 flex flex-col gap-3">
              {/* Title on the same line as the icon */}
              <div className="flex items-center gap-3">
                <Icon size={24} className={cn("shrink-0", style.iconColor)} />
                <h3 className={cn("font-display text-lg font-medium tracking-tight", style.text)}>
                  {activite.title}
                </h3>
              </div>

              <p className={cn("text-[14px] leading-relaxed", style.sub)}>
                {activite.text}
              </p>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
