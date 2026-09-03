import { Reveal } from "@/components/site/reveal";

export function Manifesto() {
  return (
    <section className="bg-ink py-24 text-background sm:py-32">
      <div className="container-page">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <p className="font-display text-[1.6rem] font-medium leading-[1.3] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
            « Un lieu de réussite et d&rsquo;épanouissement pour tous, un lieu
            d&rsquo;éveil à l&rsquo;envie et au plaisir d&rsquo;apprendre, à la
            curiosité intellectuelle, à l&rsquo;ouverture d&rsquo;esprit —{" "}
            <span className="text-brand">un lieu permettant de former des citoyens</span>
            . »
          </p>
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-background/45">
            Projet d&rsquo;établissement — School Academy
          </p>
        </Reveal>
      </div>
    </section>
  );
}
