import Link from "next/link";
import Image from "next/image";
import { MailboxIcon } from "@/components/ui/mailbox";
import { PhoneIcon } from "@/components/ui/phone";
import { MapPinIcon } from "@/components/ui/map-pin";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import { FacebookIcon } from "@/components/ui/facebook";
import { InstagramIcon } from "@/components/ui/instagram";
import { YoutubeIcon } from "@/components/ui/youtube";

import { NewsletterForm } from "@/components/site/newsletter-form";
import { footerNav, siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-[#fdf8f0] text-foreground">
      <div className="container-page flex flex-col gap-10 pt-12 pb-8 sm:pt-14 sm:pb-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3" aria-label="School Academy">
              <Image
                src="/logo.svg"
                alt="School Academy"
                width={36}
                height={40}
                className="h-9 w-auto"
              />
              <span className="font-display text-[17px] font-semibold text-foreground">
                School Academy
              </span>
            </Link>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {siteConfig.tagline}, école privée du préscolaire au lycée, centre agréé
              Cambridge Assessment English.
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-[14px] text-foreground/85 transition-colors hover:text-primary"
              >
                <MailboxIcon size={17} className="shrink-0" />
                {siteConfig.email}
              </Link>
              {siteConfig.phones.map((phone) => (
                <Link
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-[14px] text-foreground/85 transition-colors hover:text-primary"
                >
                  <PhoneIcon size={17} className="shrink-0" />
                  {phone}
                </Link>
              ))}
              <Link
                href={siteConfig.mapLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-start gap-2 text-[14px] text-foreground/85 transition-colors hover:text-primary"
              >
                <MapPinIcon size={17} className="mt-0.5 shrink-0" />
                {siteConfig.address}
              </Link>
            </div>

            <ul className="flex items-center gap-2">
              <li>
                <Link
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="School Academy sur Facebook"
                  className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
                >
                  <FacebookIcon size={18} />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="School Academy sur Instagram"
                  className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
                >
                  <InstagramIcon size={18} />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="School Academy sur YouTube"
                  className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
                >
                  <YoutubeIcon size={18} />
                </Link>
              </li>
            </ul>

            <div className="mt-1 rounded-2xl bg-muted p-4">
              <NewsletterForm />
            </div>
          </div>

          <div className="relative min-h-[200px] overflow-hidden rounded-[28px] lg:min-h-0">
            <iframe
              src={siteConfig.mapUrl}
              title="School Academy sur la carte"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[200px] border-0 lg:min-h-full"
            />
            {/* Blocks drag/scroll interaction so the embed reads as a static preview; opens the real map instead */}
            <Link
              href={siteConfig.mapLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Ouvrir l'itinéraire vers School Academy dans Google Maps"
              className="absolute inset-0"
            />
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4">
          {footerNav.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="font-display text-[15px] font-medium text-foreground">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-ink/[0.08] pt-6 sm:flex-row sm:items-center">
          <p className="text-[13px] text-muted-foreground/70">
            © {new Date().getFullYear()} School Academy. Tous droits réservés.
          </p>
          <Link
            href="/inscription"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground/70 transition-colors hover:text-primary"
          >
            Inscriptions {siteConfig.year}
            <ArrowUpRightIcon size={14} />
          </Link>
        </div>
      </div>

      <div className="relative h-[70px] w-full overflow-hidden sm:h-[100px]">
        <Image
          src="/assets/footer-bg.png"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
    </footer>
  );
}
