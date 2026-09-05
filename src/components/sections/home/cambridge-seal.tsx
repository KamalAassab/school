import { Reveal } from "@/components/site/reveal";
import { cambridgeLevels } from "@/lib/content";

export function CambridgeSeal() {
  return (
    <section className="bg-muted/60 py-11 sm:py-14">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
        <Reveal className="mx-auto w-full max-w-[160px] sm:max-w-[190px]">
          <img
            src="/assets/cambridge-seal.svg"
            alt="Cambridge Assessment English, Authorised Exam Centre"
            width={500}
            height={500}
            className="h-auto w-full"
            loading="lazy"
          />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col items-center text-center gap-4">
          <div className="flex flex-col items-center text-center gap-1">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              Cambridge Assessment English
            </h2>
            <p className="text-[13px] font-medium text-primary">
              Authorised Exam Centre
            </p>
          </div>
          <p className="mx-auto max-w-[56ch] text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
            Notre établissement se veut une école ouverte sur les langues avec une
            distinction pour l&rsquo;Anglais. À cet effet, notre motivation combinée
            avec l&rsquo;expérience et l&rsquo;accompagnement de Calliope, référence
            linguistique certaine, se manifeste par une collaboration portant le nom
            de Cambridge Assessment English et qui se traduit comme suit :
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 pt-1">
            {cambridgeLevels.map((level) => (
              <span
                key={level.code}
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[12.5px] font-medium text-foreground/80"
              >
                {level.code}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
