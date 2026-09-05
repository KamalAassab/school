import type { Metadata } from "next";

import { Hero } from "@/components/sections/home/hero";
import { ActualitesSection } from "@/components/sections/home/actualites-section";
import { FactsStrip } from "@/components/sections/home/facts-strip";
import { Pillars } from "@/components/sections/home/pillars";
import { Director } from "@/components/sections/home/director";
import { CambridgeHighlight } from "@/components/sections/home/cambridge-highlight";
import { CyclesRow } from "@/components/sections/home/cycles-row";
import { Manifesto } from "@/components/sections/home/manifesto";
import { Canteen } from "@/components/sections/home/canteen";
import { CambridgeSeal } from "@/components/sections/home/cambridge-seal";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function HomePage() {
  // Page d'accueil
  return (
    <>
      <Hero />
      <ActualitesSection />
      <FactsStrip />
      <Pillars />
      <Director />
      <CambridgeHighlight />
      <CyclesRow />
      <Manifesto />
      <Canteen />
      <CambridgeSeal />
      <CtaBand
        title="Prêt à donner à votre enfant le meilleur tremplin ?"
        description="Les inscriptions et réinscriptions pour l'année 2026/2027 sont ouvertes. Notre équipe vous accompagne à chaque étape."
        videoSrc="/media/intro.mp4"
        videoPoster="/images/second-video.png"
      />
    </>
  );
}
