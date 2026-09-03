import Link from "next/link";
import Image from "next/image";
import { EnvelopeSimple, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { footerNav, siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-ink text-background">
      <div className="container-page py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-8">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3" aria-label="School Academy">
              <Image
                src="/logo.svg"
                alt="School Academy"
                width={36}
                height={40}
                className="h-9 w-auto"
              />
              <span className="font-display text-[17px] font-semibold text-background">
                School Academy
              </span>
            </Link>
            <p className="max-w-[32ch] text-[15px] leading-relaxed text-background/60">
              {siteConfig.tagline} — école privée du préscolaire au lycée, centre agréé
              Cambridge Assessment English.
            </p>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-[15px] text-background/85 transition-colors hover:text-brand"
            >
              <EnvelopeSimple weight="regular" className="size-[18px]" />
              {siteConfig.email}
            </Link>
          </div>

          {footerNav.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="font-display text-[15px] font-medium text-background">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-background/55 transition-colors hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-background/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-background/40">
            © {new Date().getFullYear()} School Academy. Tous droits réservés.
          </p>
          <Link
            href="/inscription"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-background/70 transition-colors hover:text-brand"
          >
            Inscriptions {siteConfig.year}
            <ArrowUpRight weight="bold" className="size-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
