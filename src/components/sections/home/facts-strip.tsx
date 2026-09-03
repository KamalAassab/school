import { GraduationCap, Certificate, ForkKnife, UsersThree } from "@phosphor-icons/react/dist/ssr";

import { RevealGroup, RevealItem } from "@/components/site/reveal";

const facts = [
  { icon: GraduationCap, label: "Préscolaire au Lycée", detail: "4 cycles complets" },
  { icon: Certificate, label: "Cambridge Assessment", detail: "Centre agréé" },
  { icon: ForkKnife, label: "Cantine HACCP", detail: "450 élèves / service" },
  { icon: UsersThree, label: "Suivi personnalisé", detail: "Familles & professeurs" },
];

export function FactsStrip() {
  return (
    <section className="border-y border-ink/[0.06] bg-white">
      <div className="container-page">
        <RevealGroup className="grid grid-cols-2 divide-x divide-y divide-ink/[0.06] sm:grid-cols-4 sm:divide-y-0">
          {facts.map((fact) => (
            <RevealItem
              key={fact.label}
              className="flex flex-col items-start gap-2.5 px-5 py-7 sm:px-6"
            >
              <fact.icon weight="regular" className="size-6 text-primary" />
              <p className="font-display text-[15px] font-medium leading-snug">
                {fact.label}
              </p>
              <p className="text-[13px] text-muted-foreground">{fact.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
