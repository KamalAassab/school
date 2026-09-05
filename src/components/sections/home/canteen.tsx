import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { ShieldCheckIcon } from "@/components/ui/shield-check";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { espaceScolaire } from "@/lib/content";

const cantine = espaceScolaire[0];

export function Canteen() {
  return (
    <section className="py-11 sm:py-14">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="img-zoom-wrap relative aspect-[4/3.1] w-full overflow-hidden rounded-[28px]">
            <Image
              src="/images/cantine.webp"
              alt="Cantine School Academy"
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="img-zoom object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 flex flex-col gap-6 lg:order-2">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <ShieldCheckIcon size={32} className="shrink-0 text-primary sm:size-9" />
            <h2 className="font-display text-xl font-medium tracking-tight text-balance sm:text-2xl lg:text-3xl">
              {cantine.title}, une exigence de qualité
            </h2>
          </div>
          <p className="max-w-[54ch] text-[17px] leading-relaxed text-muted-foreground">
            {cantine.text}
          </p>
          <dl className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
            {cantine.facts?.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <dt className="text-[13px] text-muted-foreground">{fact.label}</dt>
                <dd className="font-display text-[15px] font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <Button asChild variant="outline" className="mt-2 w-fit self-center mx-auto">
            <Link href="/vie-scolaire#cantine">
              Découvrir la vie scolaire
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
