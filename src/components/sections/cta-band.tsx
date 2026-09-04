import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/arrow-right";

import { Reveal } from "@/components/site/reveal";
import { VideoPlayer } from "@/components/site/video-player";
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
}: {
  title: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  videoSrc?: string;
}) {
  return (
    <section className="bg-[#bf4802] py-12 sm:py-16">
      <div className="container-page">
        <Reveal
          className={cn(
            "relative overflow-hidden rounded-[32px] bg-[#fdf8f0]",
            videoSrc
              ? "grid grid-cols-1 items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:p-10"
              : "px-8 py-16 text-center sm:px-16 sm:py-20"
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
            <VideoPlayer src={videoSrc} className="aspect-video w-full rounded-[20px]" />
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
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button asChild size="lg" variant="default">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRightIcon size={16} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
