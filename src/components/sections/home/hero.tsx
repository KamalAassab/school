import Image from "next/image";
import Link from "next/link";
import { FlaskConical, Atom, Languages } from "lucide-react";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";

import { Button } from "@/components/ui/button";

function BasketballIcon({
  className,
  strokeWidth = 1.75,
  ...props
}: React.SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9.5" />
      <line x1="2.5" y1="12" x2="21.5" y2="12" />
      <line x1="12" y1="2.5" x2="12" y2="21.5" />
      <path d="M5.3 5.3C9.2 9 9.2 15 5.3 18.7" />
      <path d="M18.7 5.3C14.8 9 14.8 15 18.7 18.7" />
    </svg>
  );
}

function MathFunctionIcon({
  className,
  strokeWidth = 2,
  ...props
}: React.SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* f */}
      <path d="M2.5 17.5c1.8 0 2.5-.8 2.5-2.2V6.5c0-1.8 1-2.5 2.8-2.5" />
      <path d="M1.8 9.5h5" />
      {/* ( */}
      <path d="M10.2 4.5c-1.4 3.2-1.4 7.8 0 11" />
      {/* x */}
      <path d="M12.5 7.8l3.6 4.8" />
      <path d="M16.1 7.8l-3.6 4.8" />
      {/* ) */}
      <path d="M18.2 4.5c1.4 3.2 1.4 7.8 0 11" />
    </svg>
  );
}

const subjects = [
  { label: "Chimie", icon: FlaskConical },
  { label: "Physique", icon: Atom },
  { label: "Sport", icon: BasketballIcon },
  { label: "Mathématiques", icon: MathFunctionIcon },
  { label: "Langues", icon: Languages },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 sm:pb-16 lg:pt-8 lg:pb-28">
      <div className="container-page relative grid grid-cols-1 items-center gap-8 pt-2 sm:gap-14 sm:pt-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-6">
        {/* Left column: copy */}
        <div className="flex flex-col items-start gap-4 sm:gap-7">
          <h1 className="font-display text-[clamp(2.5rem,1.8rem+3.3vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance">
            Le tremplin
            <br />
            de vos enfants vers{" "}
            <span className="relative inline-block whitespace-nowrap">
              l&rsquo;excellence
              <svg
                aria-hidden
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-[0.4em] w-full text-brand"
              >
                <path
                  d="M2 9C40 2 70 2 100 6.5C130 11 165 11 198 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>

          {/* Decorative bookend-dash accent, echoing the reference layout,
              paired with the school's founding year as a small trust marker */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div aria-hidden className="flex items-center gap-1.5 sm:gap-2">
              <span className="inline-block h-2.5 w-7 rounded-full bg-ink sm:h-3 sm:w-10" />
              <span className="inline-block size-2 rounded-full bg-brand sm:size-3" />
              <span className="inline-block size-2 rounded-full bg-brand sm:size-3" />
              <span className="inline-block h-2.5 w-7 rounded-full bg-ink sm:h-3 sm:w-10" />
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.03em] text-muted-foreground sm:text-[12.5px] sm:tracking-[0.08em]">
              École ouverte depuis 2015
            </span>
          </div>

          <p className="hidden max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground sm:block sm:text-lg">
            Du préscolaire au lycée, School Academy accompagne chaque élève avec une
            pédagogie exigeante et un centre agréé Cambridge Assessment English.
          </p>

          <div className="flex w-full flex-row items-center gap-2.5 sm:w-auto sm:gap-3">
            <Button
              asChild
              size="lg"
              className="flex-1 sm:flex-initial h-12 px-3.5 text-[13px] sm:h-14 sm:px-8 sm:text-base whitespace-nowrap"
            >
              <Link href="/inscription">
                Inscrire mon enfant
                <ArrowRightIcon size={16} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex-1 sm:flex-initial h-12 px-3.5 text-[13px] sm:h-14 sm:px-8 sm:text-base whitespace-nowrap"
            >
              <Link href="/presentation">
                Découvrir l&rsquo;école
                <ArrowUpRightIcon size={16} />
              </Link>
            </Button>
          </div>

        </div>

        {/* Right column: photo cutout + floating accents */}
        <div className="relative mx-auto w-full max-w-[680px] lg:mx-0 lg:max-w-none">

          <div className="scale-105 lg:scale-120 -translate-x-3 lg:-translate-x-14 origin-center transition-transform">
            <div className="@container relative aspect-[3/2] w-full [container-type:inline-size]">
              <Image
                src="/images/hero-illustration.webp"
                alt="Deux élèves de School Academy, cartable sur le dos et livres à la main"
                fill
                preload
                sizes="(min-width: 1024px) 50vw, 95vw"
                className="object-contain"
              />

              <div
                role="list"
                aria-label="Matières enseignées"
                className="absolute bottom-[3%] right-0 z-10 flex items-center gap-[1cqw] sm:gap-[1.2cqw] translate-x-[2%]"
              >
                {subjects.map((subject) => (
                  <div
                    key={subject.label}
                    role="listitem"
                    title={subject.label}
                    className="flex size-[6.6cqw] min-h-[22px] min-w-[22px] max-h-[44px] max-w-[44px] items-center justify-center rounded-full border border-ink/10 bg-white text-foreground/70 shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <subject.icon className="size-[54%]" strokeWidth={1.75} />
                    <span className="sr-only">{subject.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
