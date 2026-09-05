"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { ChevronDownIcon } from "@/components/ui/chevron-down";
import { XIcon } from "@/components/ui/x";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface StaggeredMenuSubItem {
  label: string;
  link: string;
}

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
  children?: StaggeredMenuSubItem[];
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
  icon?: React.ReactNode;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  ctaButton?: {
    label: string;
    link: string;
  };
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export function StaggeredMenu({
  position = "right",
  colors = ["#f5ead2", "#201a15", "#b84300"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = "#201a15",
  openMenuButtonColor = "#201a15",
  changeMenuColorOnOpen = true,
  accentColor = "#b84300",
  closeOnClickAway = true,
  ctaButton,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedDropdowns, setExpandedDropdowns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (items.length > 0 && items[0].children && items[0].children.length > 0) {
      initial[items[0].label] = true;
    }
    return initial;
  });
  const openRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (items.length > 0 && items[0].children && items[0].children.length > 0) {
      setExpandedDropdowns((prev) => {
        if (Object.keys(prev).length === 0) {
          return { [items[0].label]: true };
        }
        return prev;
      });
    }
  }, [items]);

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDropdown = (label: string) => {
    setExpandedDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  useIsomorphicLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      if (!panel) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer")) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [mounted, menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const backdrop = backdropRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel")) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
    ) as HTMLElement[];
    const ctaEl = panel.querySelector(".sm-panel-cta") as HTMLElement | null;
    const socialTitle = panel.querySelector(".sm-socials-title") as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link")) as HTMLElement[];

    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 120, rotate: 6 });
    if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity" as string]: 0 });
    if (ctaEl) gsap.set(ctaEl, { y: 20, opacity: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // Fade in backdrop
    if (backdrop) {
      tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0);
    }

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.45, ease: "power4.out" },
        i * 0.06
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.06 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.06 : 0);
    const panelDuration = 0.55;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.75,
          ease: "power4.out",
          stagger: { each: 0.06, from: "start" },
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.5,
            ease: "power2.out",
            ["--sm-num-opacity" as string]: 1,
            stagger: { each: 0.05, from: "start" },
          },
          itemsStart + 0.08
        );
      }
    }

    const footerStart = panelInsertTime + panelDuration * 0.35;
    if (ctaEl) {
      tl.to(ctaEl, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, footerStart);
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = footerStart + 0.08;

      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.4, ease: "power2.out" }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
            stagger: { each: 0.05, from: "start" },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: "opacity" });
            },
          },
          socialsStart + 0.02
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const backdrop = backdropRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    if (backdrop) {
      gsap.to(backdrop, { opacity: 0, duration: 0.25, ease: "power2.in" });
    }

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.28,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel")) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 120, rotate: 6 });

        const numberEls = Array.from(
          panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
        ) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity" as string]: 0 });

        const ctaEl = panel.querySelector(".sm-panel-cta") as HTMLElement | null;
        if (ctaEl) gsap.set(ctaEl, { y: 20, opacity: 0 });

        const socialTitle = panel.querySelector(".sm-socials-title") as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link")) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 20, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.15,
          duration: 0.25,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateColor(target);
  }, [playOpen, playClose, animateColor, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateColor(false);
    }
  }, [playClose, animateColor, onMenuClose]);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Handle escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  return (
    <div
      className={cn("sm-scope relative", className)}
      style={
        accentColor
          ? ({ ["--sm-accent" as string]: accentColor } as React.CSSProperties)
          : undefined
      }
      data-position={position}
      data-open={open || undefined}
    >
      {/* Trigger Button rendered inside Header */}
      <button
        ref={toggleBtnRef}
        className={cn(
          "sm-toggle relative inline-flex size-11 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-200 active:scale-95 hover:bg-ink/[0.08] hover:text-primary",
          open && "text-primary"
        )}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        onClick={toggleMenu}
        type="button"
      >
        <span
          className={cn(
            "relative flex size-5 items-center justify-center transition-transform duration-300 ease-in-out",
            open ? "rotate-180" : "rotate-0"
          )}
          aria-hidden="true"
        >
          <span
            className={cn(
              "absolute h-[2px] w-[18px] rounded-full bg-current transition-all duration-300 ease-in-out",
              open ? "translate-y-0 rotate-45" : "-translate-y-[5px]"
            )}
          />
          <span
            className={cn(
              "absolute h-[2px] w-[18px] rounded-full bg-current transition-all duration-300 ease-in-out",
              open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
            )}
          />
          <span
            className={cn(
              "absolute h-[2px] w-[18px] rounded-full bg-current transition-all duration-300 ease-in-out",
              open ? "translate-y-0 -rotate-45" : "translate-y-[5px]"
            )}
          />
        </span>
      </button>

      {/* Portaled overlay elements to escape backdrop-filter containing block */}
      {mounted && typeof document !== "undefined"
        ? createPortal(
            <div
              className="sm-scope-portal pointer-events-none fixed inset-0 z-[9999] h-screen w-screen overflow-hidden"
              style={
                accentColor
                  ? ({ ["--sm-accent" as string]: accentColor } as React.CSSProperties)
                  : undefined
              }
              data-position={position}
              data-open={open || undefined}
            >
              {/* Backdrop */}
              <div
                ref={backdropRef}
                onClick={closeOnClickAway ? closeMenu : undefined}
                className={cn(
                  "fixed inset-0 z-[1] bg-ink/50 backdrop-blur-xs transition-opacity duration-300",
                  open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                )}
                aria-hidden="true"
              />

              {/* Prelayers */}
              <div
                ref={preLayersRef}
                className="sm-prelayers pointer-events-none fixed bottom-0 right-0 top-0 z-[2] h-screen"
                aria-hidden="true"
              >
                {colors.map((c, i) => (
                  <div
                    key={i}
                    className="sm-prelayer absolute bottom-0 right-0 top-0 h-full w-full shadow-2xl"
                    style={{ background: c }}
                  />
                ))}
              </div>

              {/* Slide-out Aside Panel */}
              <aside
                id="staggered-menu-panel"
                ref={panelRef}
                className="staggered-menu-panel pointer-events-auto fixed bottom-0 right-0 top-0 z-[3] flex h-screen flex-col overflow-y-auto bg-background/98 p-6 pt-6 shadow-2xl backdrop-blur-2xl sm:p-8 sm:pt-8"
                style={{ WebkitBackdropFilter: "blur(20px)" }}
                aria-hidden={!open}
              >
                <div className="sm-panel-inner flex flex-1 flex-col justify-between gap-5">
                  {/* Top Panel Header with Logo and Close Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-ink/[0.08]">
                    <Logo />
                    <button
                      type="button"
                      onClick={closeMenu}
                      className="flex size-11 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-200 hover:bg-ink/[0.08] hover:text-primary active:scale-95"
                      aria-label="Fermer le menu"
                    >
                      <span className="relative flex size-5 items-center justify-center transition-transform duration-300 ease-in-out rotate-180 hover:rotate-90">
                        <span className="absolute h-[2px] w-[18px] rounded-full bg-current transition-all duration-300 ease-in-out translate-y-0 rotate-45" />
                        <span className="absolute h-[2px] w-[18px] rounded-full bg-current transition-all duration-300 ease-in-out scale-x-0 opacity-0" />
                        <span className="absolute h-[2px] w-[18px] rounded-full bg-current transition-all duration-300 ease-in-out translate-y-0 -rotate-45" />
                      </span>
                    </button>
                  </div>

                  {/* Navigation Menu List */}
                  <ul
                    className="sm-panel-list flex flex-col gap-1.5 p-0 m-0 list-none my-auto"
                    role="list"
                    data-numbering={displayItemNumbering || undefined}
                  >
                    {items.map((it, idx) => {
                      const isActive = pathname === it.link;
                      const hasChildren = it.children && it.children.length > 0;
                      const isExpanded = !!expandedDropdowns[it.label];

                      return (
                        <li
                          className="sm-panel-itemWrap relative flex flex-col"
                          key={it.label + idx}
                        >
                          <div className="flex items-center justify-between overflow-hidden leading-none py-1">
                            <Link
                              className={cn(
                                "sm-panel-item font-display relative inline-block cursor-pointer tracking-tight transition-colors duration-200 no-underline",
                                isActive ? "text-primary font-bold" : "text-ink hover:text-primary"
                              )}
                              href={it.link}
                              aria-label={it.ariaLabel || it.label}
                              data-index={idx + 1}
                              onClick={closeMenu}
                            >
                              <span className="sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%]">
                                {it.label}
                              </span>
                            </Link>

                            {hasChildren && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleDropdown(it.label);
                                }}
                                className={cn(
                                  "size-10 inline-flex items-center justify-center rounded-full transition-all duration-200",
                                  isExpanded
                                    ? "bg-primary/10 text-primary"
                                    : "bg-ink/[0.04] text-ink/70 hover:bg-ink/[0.08] hover:text-primary"
                                )}
                                aria-label={`Afficher les sous-rubriques de ${it.label}`}
                                aria-expanded={isExpanded}
                              >
                                <ChevronDownIcon
                                  size={16}
                                  className={cn(
                                    "transition-transform duration-200",
                                    isExpanded && "rotate-180"
                                  )}
                                />
                              </button>
                            )}
                          </div>

                          {/* Sub-buttons dropdown list */}
                          {hasChildren && isExpanded && (
                            <div className="sm-panel-dropdown flex flex-col items-start gap-2.5 pt-2 pb-[10px] pl-3 animate-in fade-in-50 duration-200">
                              {it.children!.map((sub) => (
                                <Link
                                  key={sub.link}
                                  href={sub.link}
                                  onClick={closeMenu}
                                  className="group inline-flex w-fit items-center gap-2 py-0.5 text-[14px] font-medium text-foreground transition-colors hover:text-primary"
                                >
                                  <span className="underline decoration-primary decoration-2 underline-offset-4">
                                    {sub.label}
                                  </span>
                                  <ArrowRightIcon
                                    size={12}
                                    className="opacity-40 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
                                  />
                                </Link>
                              ))}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  {/* Primary CTA button */}
                  {ctaButton ? (
                    <div className="sm-panel-cta shrink-0 pt-1">
                      <Button asChild size="lg" variant="default" className="w-full">
                        <Link href={ctaButton.link} onClick={closeMenu}>
                          {ctaButton.label}
                          <ArrowRightIcon size={16} />
                        </Link>
                      </Button>
                    </div>
                  ) : null}

                  {/* Socials & Contact section with ICONS */}
                  {displaySocials && socialItems && socialItems.length > 0 && (
                    <div
                      className="sm-socials mt-auto border-t border-ink/[0.08] pt-4 flex flex-col gap-2.5"
                      aria-label="Réseaux sociaux et contact"
                    >
                      <h3 className="sm-socials-title text-[11px] font-semibold uppercase tracking-wider text-muted-foreground m-0">
                        School Academy · Contact & Réseaux
                      </h3>
                      <ul
                        className="sm-socials-list flex flex-row flex-wrap items-center gap-2 p-0 m-0 list-none"
                        role="list"
                      >
                        {socialItems.map((s, i) => {
                          const isPhone = s.link.startsWith("tel:");
                          return (
                            <li key={s.label + i} className="sm-socials-item">
                              <Link
                                href={s.link}
                                target={s.link.startsWith("http") ? "_blank" : undefined}
                                rel={s.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                className={cn(
                                  "sm-socials-link flex items-center justify-center rounded-full bg-muted text-foreground transition-all duration-200 hover:bg-primary hover:text-white active:scale-95 shadow-2xs",
                                  isPhone
                                    ? "h-11 px-3 gap-2 text-xs font-medium hover:bg-secondary hover:text-primary"
                                    : "size-11"
                                )}
                                aria-label={s.label}
                                onClick={closeMenu}
                              >
                                {s.icon ? (
                                  s.icon
                                ) : (
                                  <span className="text-xs font-medium">{s.label}</span>
                                )}
                                {isPhone && (
                                  <span className="font-sans font-medium">{s.label}</span>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </aside>
            </div>,
            document.body
          )
        : null}

      <style jsx global>{`
        .sm-scope-portal .staggered-menu-panel {
          width: clamp(290px, 86vw, 420px);
        }
        .sm-scope-portal [data-position="left"] .staggered-menu-panel {
          right: auto;
          left: 0;
        }
        .sm-scope-portal .sm-prelayers {
          width: clamp(290px, 86vw, 420px);
        }
        .sm-scope-portal [data-position="left"] .sm-prelayers {
          right: auto;
          left: 0;
        }
        .sm-scope-portal .sm-panel-item {
          font-size: clamp(1.5rem, 4.5vw, 2.15rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          padding-right: 1.8em;
        }
        .sm-scope-portal .sm-panel-list[data-numbering] {
          counter-reset: smItem;
        }
        .sm-scope-portal .sm-panel-list[data-numbering] .sm-panel-item::after {
          counter-increment: smItem;
          content: counter(smItem, decimal-leading-zero);
          position: absolute;
          top: 0.1em;
          right: 0.2em;
          font-size: 13px;
          font-weight: 600;
          color: var(--sm-accent, #b84300);
          letter-spacing: 0;
          pointer-events: none;
          user-select: none;
          opacity: var(--sm-num-opacity, 0);
        }
      `}</style>
    </div>
  );
}

export default StaggeredMenu;
