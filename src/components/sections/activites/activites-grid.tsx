import { BicepsFlexedIcon } from "@/components/ui/biceps-flexed";
import { CompassIcon } from "@/components/ui/compass";
import { PartyPopperIcon } from "@/components/ui/party-popper";
import { MoonIcon } from "@/components/ui/moon";
import { HandHeartIcon } from "@/components/ui/hand-heart";
import { SparklesIcon } from "@/components/ui/sparkles";
import { TelescopeIcon } from "@/components/ui/telescope";
import { WaypointsIcon } from "@/components/ui/waypoints";
import { HeartIcon } from "@/components/ui/heart";
import type { IconComponent } from "@/lib/icon-type";

import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { activites } from "@/lib/content";

const icons: IconComponent[] = [
  BicepsFlexedIcon,
  CompassIcon,
  PartyPopperIcon,
  MoonIcon,
  HandHeartIcon,
  SparklesIcon,
  TelescopeIcon,
  WaypointsIcon,
  HeartIcon,
];

export function ActivitesGrid() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {activites.map((activite, i) => {
        const Icon = icons[i % icons.length];
        const featured = i === 0;
        return (
          <RevealItem
            key={activite.title}
            className={
              featured
                ? "flex flex-col justify-between gap-8 rounded-[28px] bg-ink p-8 text-background sm:col-span-2 sm:row-span-1 lg:col-span-2"
                : "flex flex-col gap-4 rounded-[28px] bg-muted p-7"
            }
          >
            <Icon
              size={featured ? 36 : 32}
              className={featured ? "text-brand" : "text-primary"}
            />
            <div className="flex flex-col gap-2">
              <h3
                className={
                  featured
                    ? "font-display text-xl font-medium tracking-tight text-background"
                    : "font-display text-lg font-medium tracking-tight"
                }
              >
                {activite.title}
              </h3>
              <p
                className={
                  featured
                    ? "max-w-[46ch] text-[15px] leading-relaxed text-background/60"
                    : "text-[14px] leading-relaxed text-muted-foreground"
                }
              >
                {activite.text}
              </p>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
