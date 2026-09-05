"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";

import { FacebookIcon } from "@/components/ui/facebook";
import { InstagramIcon } from "@/components/ui/instagram";
import { YoutubeIcon } from "@/components/ui/youtube";
import { PhoneIcon } from "@/components/ui/phone";

import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import type {
  StaggeredMenuItem,
  StaggeredMenuSocialItem,
} from "@/components/ui/staggered-menu";
import { mainNav, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

// Code-split the gsap-powered mobile menu out of the main bundle: it's only
// interacted with on mobile, well after first paint.
const StaggeredMenu = dynamic(
  () => import("@/components/ui/staggered-menu").then((mod) => mod.StaggeredMenu),
  {
    loading: () => (
      <div className="flex size-11 items-center justify-center rounded-full bg-muted" aria-hidden />
    ),
  }
);

const menuItems: StaggeredMenuItem[] = [
  {
    label: "Présentation",
    link: "/presentation",
    children: [
      { label: "Mot des fondateurs", link: "/presentation#fondateurs" },
      { label: "Missions & valeurs", link: "/presentation#missions" },
      { label: "Concept", link: "/presentation#concept" },
      { label: "Charte", link: "/presentation#charte" },
    ],
  },
  {
    label: "Pédagogie",
    link: "/pedagogie",
    children: [
      { label: "Cycles d'enseignement", link: "/pedagogie#cycles" },
      { label: "TICE", link: "/pedagogie#tice" },
      { label: "Orientation", link: "/pedagogie#orientation" },
      { label: "Projet d'établissement", link: "/pedagogie#projet" },
    ],
  },
  {
    label: "Vie scolaire",
    link: "/vie-scolaire",
    children: [
      { label: "Cantine", link: "/vie-scolaire#cantine" },
      { label: "BCD", link: "/vie-scolaire#bcd" },
      { label: "Fournitures", link: "/vie-scolaire#fournitures" },
      { label: "Activités & loisirs", link: "/activites" },
    ],
  },
  {
    label: "Cambridge",
    link: "/cambridge",
    children: [
      { label: "Niveaux", link: "/cambridge#niveaux" },
      { label: "Examens", link: "/cambridge#examens" },
    ],
  },
  {
    label: "Recrutement",
    link: "/recrutement",
  },
  {
    label: "Contact",
    link: "/contact",
  },
];

const socialItems: StaggeredMenuSocialItem[] = [
  {
    label: "Facebook",
    link: siteConfig.social.facebook,
    icon: <FacebookIcon size={16} />,
  },
  {
    label: "Instagram",
    link: siteConfig.social.instagram,
    icon: <InstagramIcon size={16} />,
  },
  {
    label: "YouTube",
    link: siteConfig.social.youtube,
    icon: <YoutubeIcon size={16} />,
  },
  {
    label: siteConfig.phones[0],
    link: `tel:${siteConfig.phones[0].replace(/\s/g, "")}`,
    icon: <PhoneIcon size={14} />,
  },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 pb-[10px] transition-all duration-300 sm:top-0 sm:px-5 sm:pt-4 sm:pb-3 lg:px-8">
      <div
        className={cn(
          "mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between rounded-full border transition-all duration-300 sm:h-[68px]",
          scrolled
            ? "border-ink/[0.08] bg-background/95 px-3 shadow-[0_14px_35px_-14px_rgba(32,26,21,0.22)] backdrop-blur-xl sm:px-4"
            : "border-ink/[0.05] bg-background/80 px-3 shadow-[0_4px_20px_-4px_rgba(32,26,21,0.06)] backdrop-blur-md sm:px-4"
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex h-10 items-center rounded-full px-4 text-[15px] font-medium transition-all duration-200",
                  active
                    ? "bg-primary text-white shadow-xs"
                    : "text-foreground/75 hover:bg-ink/[0.05] hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild size="default" variant="default">
            <Link href="/inscription">
              Inscription {siteConfig.year}
              <ArrowUpRightIcon size={16} />
            </Link>
          </Button>
        </div>

        <div className="lg:hidden">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            colors={["#f5ead2", "#201a15", "#b84300"]}
            accentColor="#b84300"
            menuButtonColor="#201a15"
            openMenuButtonColor="#201a15"
            ctaButton={{
              label: `Inscription ${siteConfig.year}`,
              link: "/inscription",
            }}
          />
        </div>
      </div>
    </header>
  );
}
