import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quotes } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { presentationSections } from "@/lib/content";

export function Director() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] sm:mx-auto lg:mx-0">
            <Image
              src="/images/directeur.jpg"
              alt="Mot du directeur d'établissement, School Academy"
              fill
              sizes="(min-width: 1024px) 32vw, 80vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 flex flex-col gap-6 lg:order-2">
          <Quotes weight="fill" className="size-10 text-brand" />
          <p className="font-display text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl">
            {presentationSections.fondateurs.text}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-px w-10 bg-primary" />
            <p className="text-[14px] font-medium text-muted-foreground">
              Mot du directeur d&rsquo;établissement
            </p>
          </div>
          <Button asChild variant="outline" className="mt-2 w-fit">
            <Link href="/presentation">
              Lire notre présentation
              <ArrowRight weight="bold" className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
