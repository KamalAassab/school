import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

export function CtaBand({
  title,
  description,
  primaryLabel = "Inscrire mon enfant",
  primaryHref = "/inscription",
  secondaryLabel = "Nous contacter",
  secondaryHref = "/contact",
}: {
  title: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[32px] bg-primary px-8 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-primary-foreground sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="max-w-[50ch] text-[16px] leading-relaxed text-primary-foreground/75">
                {description}
              </p>
            ) : null}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button asChild size="lg" variant="light">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight weight="bold" className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-primary-foreground hover:bg-white/10"
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
