import Link from "next/link";
import Image from "next/image";
import { MailboxIcon } from "@/components/ui/mailbox";
import { PhoneIcon } from "@/components/ui/phone";
import { MapPinIcon } from "@/components/ui/map-pin";
import { FacebookIcon } from "@/components/ui/facebook";
import { InstagramIcon } from "@/components/ui/instagram";
import { YoutubeIcon } from "@/components/ui/youtube";

import { NewsletterForm } from "@/components/site/newsletter-form";
import { footerNav, siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative z-0 bg-[#fdf8f0] text-foreground">
      <div className="mx-auto w-[90%] flex flex-col gap-10 pt-12 pb-8 sm:pt-14 sm:pb-10">
        {/* Top section: 6 columns in 1 row */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8 items-start">
          {/* Column 1: Logo & Socials (centered) */}
          <div className="col-span-2 flex flex-col items-center justify-center gap-4 text-center sm:col-span-1 lg:col-span-1">
            <Link href="/" aria-label="School Academy, accueil" className="inline-block">
              <Image
                src="/logo.webp"
                alt="School Academy"
                width={96}
                height={106}
                className="h-24 w-auto"
              />
            </Link>
            <ul className="flex items-center justify-center gap-2.5">
              <li>
                <Link
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="School Academy sur Facebook"
                  className="flex size-11 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
                >
                  <FacebookIcon size={16} />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="School Academy sur Instagram"
                  className="flex size-11 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
                >
                  <InstagramIcon size={16} />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="School Academy sur YouTube"
                  className="flex size-11 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
                >
                  <YoutubeIcon size={16} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact us */}
          <div className="col-span-2 flex min-w-0 flex-col gap-3 sm:col-span-1 lg:col-span-1">
            <h3 className="font-display text-[15px] font-medium text-foreground">Nous contacter</h3>
            <div className="flex flex-col gap-2.5">
              <Link
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <MailboxIcon size={15} className="mt-0.5 shrink-0" />
                <span className="whitespace-nowrap">{siteConfig.email}</span>
              </Link>
              {siteConfig.phones.map((phone) => (
                <Link
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <PhoneIcon size={15} className="shrink-0" />
                  {phone}
                </Link>
              ))}
              <Link
                href={siteConfig.mapLink}
                target="_blank"
                rel="noreferrer"
                className="flex min-w-0 items-start gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <MapPinIcon size={15} className="mt-0.5 shrink-0" />
                <span className="min-w-0 flex-1">
                  Angle rue 32, Bd Jabran
                  <br />
                  Khalil Jabran, 24 000 El Jadida
                </span>
              </Link>
            </div>
          </div>

          {/* Columns 3-6: Nav columns */}
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

        {/* Newsletter banner */}
        <div className="px-3 sm:px-8 lg:px-12">
          <div className="rounded-[22px] sm:rounded-[28px] bg-white p-5 sm:p-6 lg:p-7 border border-ink/[0.06] shadow-xs">
            <NewsletterForm />
          </div>
        </div>

        {/* Interactive Google Map */}
        <div className="px-3 sm:px-8 lg:px-12">
          <div className="relative h-[240px] sm:h-[280px] lg:h-[320px] w-full overflow-hidden rounded-[22px] sm:rounded-[28px] border border-ink/[0.06] shadow-xs">
            <iframe
              src={siteConfig.mapUrl}
              title="School Academy sur la carte"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
            <Link
              href={siteConfig.mapLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Ouvrir l'itinéraire vers School Academy dans Google Maps"
              className="absolute inset-0"
            />
          </div>
        </div>

        {/* Bottom section: Copyright & Credits with same side margins */}
        <div className="border-t border-ink/[0.08] pt-6 px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-muted-foreground/70">
            © {new Date().getFullYear()} School Academy. Tous droits réservés.
          </p>
          <p className="text-[12.5px] text-muted-foreground/60">
            Fait avec{" "}
            <span aria-hidden className="text-primary">
              ♥
            </span>{" "}
            par{" "}
            <Link
              href="https://kamal-aassab.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground/70 underline decoration-ink/20 underline-offset-2 transition-colors hover:text-primary"
            >
              Kamal Aassab
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
