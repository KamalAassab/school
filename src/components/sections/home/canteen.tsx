import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { espaceScolaire } from "@/lib/content";

const cantine = espaceScolaire[0];

export function Canteen() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3.1] w-full overflow-hidden rounded-[28px]">
            <Image
              src="/images/cantine.png"
              alt="Cantine School Academy"
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 flex flex-col gap-6 lg:order-2">
          <ShieldCheck weight="regular" className="size-9 text-primary" />
          <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            {cantine.title}, une exigence de qualité
          </h2>
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
          <Button asChild variant="outline" className="mt-2 w-fit">
            <Link href="/vie-scolaire#cantine">
              Découvrir la vie scolaire
              <ArrowRight weight="bold" className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
