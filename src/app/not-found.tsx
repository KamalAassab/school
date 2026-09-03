import Link from "next/link";
import { Compass, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70dvh] items-center justify-center py-20">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <Compass weight="regular" className="size-14 text-primary" />
        <span className="font-display text-6xl font-medium text-primary/20">404</span>
        <h1 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Cette page n&rsquo;existe pas
        </h1>
        <p className="max-w-[46ch] text-[16px] leading-relaxed text-muted-foreground">
          La page que vous cherchez a peut-être changé d&rsquo;adresse. Retournez à
          l&rsquo;accueil pour poursuivre votre visite.
        </p>
        <Button asChild size="lg" className="mt-2">
          <Link href="/">
            <ArrowLeft weight="bold" className="size-4" />
            Retour à l&rsquo;accueil
          </Link>
        </Button>
      </div>
    </section>
  );
}
