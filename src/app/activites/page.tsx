import type { Metadata } from "next";
import { Confetti } from "@phosphor-icons/react/dist/ssr";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { ActivitesGrid } from "@/components/sections/activites/activites-grid";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Activités & loisirs",
  description:
    "Clubs sportifs, sorties scolaires, carnavals, journées thématiques : la vie extrascolaire de School Academy.",
};

export default function ActivitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Activités & loisirs"
        title="Apprendre, aussi, en dehors de la salle de classe"
        description="Clubs, sorties, fêtes et temps forts collectifs : des occasions régulières de grandir ensemble, au-delà du programme scolaire."
        icon={Confetti}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <ActivitesGrid />
        </div>
      </section>

      <CtaBand
        title="Une question sur la vie scolaire ?"
        description="Notre équipe répond à toutes vos questions sur les activités, les clubs et le calendrier de l'année."
      />
    </>
  );
}
