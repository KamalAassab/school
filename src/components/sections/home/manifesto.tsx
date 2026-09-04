import { Reveal } from "@/components/site/reveal";
import { Illustration } from "@/components/site/illustration";
import { projetQuote } from "@/lib/content";

export function Manifesto() {
  return (
    <section className="bg-ink py-12 text-background sm:py-16">
      <div className="container-page">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <Illustration
            src="/assets/undraw_open-book_pet1.svg"
            width={960}
            height={512}
            className="max-w-[220px] sm:max-w-[260px]"
          />
          <p className="font-display text-[1.6rem] font-medium leading-[1.3] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
            {projetQuote.text}
          </p>
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-background/45">
            {projetQuote.source}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
