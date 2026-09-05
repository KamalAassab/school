import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/arrow-right";

import { Reveal } from "@/components/site/reveal";
import { VideoPlayer } from "@/components/video-player/video-player";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  description,
  primaryLabel = "Inscrire mon enfant",
  primaryHref = "/inscription",
  secondaryLabel = "Nous contacter",
  secondaryHref = "/contact",
  videoSrc,
  videoPoster = "/images/second-video.webp",
}: {
  title: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  videoSrc?: string;
  videoPoster?: string;
}) {
  return (
    <section className="bg-[#bf4802] py-12 sm:py-16">
      <div className="container-page">
        <Reveal
          className={cn(
            "relative overflow-hidden rounded-[32px] bg-[#fdf8f0]",
            videoSrc
              ? "grid grid-cols-1 items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:p-10"
              : "px-6 py-10 text-center sm:px-16 sm:py-20"
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-primary/[0.06] blur-3xl"
          />

          {videoSrc ? (
            <VideoPlayer
              src={videoSrc}
              poster={videoPoster}
              className="aspect-video w-full rounded-[20px]"
            />
          ) : null}

          <div
            className={cn(
              "relative flex flex-col gap-6",
              videoSrc ? "items-start text-left" : "mx-auto max-w-2xl items-center"
            )}
          >
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-foreground sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p
                className={cn(
                  "text-[16px] leading-relaxed text-muted-foreground",
                  videoSrc ? "max-w-[52ch]" : "max-w-[50ch]"
                )}
              >
                {description}
              </p>
            ) : null}
            <div className="flex flex-row items-center gap-2 sm:gap-3 pt-2 w-full sm:w-auto">
              <Button asChild size="lg" variant="default" className="flex-1 sm:flex-initial h-12 px-3 text-xs sm:h-14 sm:px-8 sm:text-base whitespace-nowrap">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRightIcon size={16} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1 sm:flex-initial h-12 px-3 text-xs sm:h-14 sm:px-8 sm:text-base whitespace-nowrap">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
