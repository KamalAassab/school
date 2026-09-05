import type { Metadata } from "next";
import Link from "next/link";
import { MailboxIcon } from "@/components/ui/mailbox";

import { PageHero } from "@/components/sections/page-hero/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Illustration } from "@/components/site/illustration";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez School Academy pour toute question sur l'inscription, la pédagogie ou la vie scolaire.",
};

const steps = [
  { text: "Nous recevons votre message" },
  { text: "Un membre de notre équipe vous répond personnellement" },
  { text: "Nous organisons un rendez-vous si nécessaire" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Parlons du parcours de votre enfant"
        description="Une question sur l'inscription, la pédagogie ou la vie scolaire ? Écrivez-nous, notre équipe vous répond avec attention."
        icon={MailboxIcon}
      />

      <section className="pb-14 sm:pb-18">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:gap-16">
          <Reveal className="rounded-[28px] bg-white p-7 shadow-[0_1px_0_rgba(32,26,21,0.04)] ring-1 ring-ink/[0.06] sm:p-10">
            <ContactForm />
          </Reveal>

          <Reveal className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-[28px] bg-ink p-8 text-background">
              <h3 className="font-display text-lg font-medium">Écrivez-nous directement</h3>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-[15px] text-background/85 transition-colors hover:text-brand"
              >
                <MailboxIcon size={18} />
                {siteConfig.email}
              </Link>
            </div>

            <div className="flex flex-col gap-5 rounded-[28px] bg-muted p-8">
              <Illustration
                src="/assets/undraw_personal-notes_xrz8.svg"
                width={960}
                height={618}
                className="mx-auto max-w-[200px]"
              />
              <h3 className="font-display text-lg font-medium">Comment ça se passe</h3>
              <ul className="flex flex-col gap-4">
                {steps.map((step, i) => (
                  <li key={step.text} className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-[14px] leading-relaxed text-foreground/85">
                      {step.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
