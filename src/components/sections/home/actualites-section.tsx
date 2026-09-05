"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import { InstagramIcon } from "@/components/ui/instagram";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { allNews } from "@/lib/news";
import { cn } from "@/lib/utils";

export function ActualitesSection() {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // Filter only Image type posts (strictly no videos)
  const imagePosts = React.useMemo(() => {
    return allNews.filter((item) => item.type === "Image");
  }, []);

  // Update carousel selection & scrollability
  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);
    carouselApi.on("reInit", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
      carouselApi.off("reInit", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section
      id="actualites"
      className="relative w-full overflow-hidden scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-10 lg:py-12 bg-gradient-to-b from-[#fbfaf7] via-white to-[#fbfaf7] border-b border-ink/[0.06]"
    >
      {/* Decorative ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-12 size-96 rounded-full bg-brand/[0.04] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 bottom-12 size-96 rounded-full bg-primary/[0.04] blur-3xl"
      />

      <div className="container-page flex flex-col gap-4 sm:gap-6">
        {/* Header Block with Title & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 border-b border-ink/[0.06] pb-3 sm:pb-4">
          <div className="flex items-center min-w-0">
            <h2 className="font-display text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-foreground leading-tight">
              Au cœur de notre communauté
            </h2>
          </div>

          {/* Controls: Instagram link & Nav buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3">
            <Link
              href="https://www.instagram.com/schoolacademyeljadida/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/90 px-3 sm:px-3.5 py-1 text-xs font-semibold text-foreground shadow-sm transition-all hover:border-brand/40 hover:bg-brand/5 hover:text-primary"
            >
              <InstagramIcon size={14} className="text-[#E1306C]" />
              <span>@schoolacademyeljadida</span>
              <ArrowUpRightIcon size={12} className="opacity-70" />
            </Link>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Publication précédente"
                className="size-8 sm:size-9 rounded-full border-ink/15 bg-white text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ArrowLeft className="size-3.5 sm:size-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => carouselApi?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Publication suivante"
                className="size-8 sm:size-9 rounded-full border-ink/15 bg-white text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ArrowRight className="size-3.5 sm:size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Area - Exact Instagram Post Aspect Ratio (4:5) */}
        <div className="w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: false,
              duration: 35,
              skipSnaps: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 sm:-ml-4 lg:-ml-5 items-center py-2 sm:py-3">
              {imagePosts.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className="pl-3 sm:pl-4 lg:pl-5 basis-[72%] xs:basis-[64%] sm:basis-[46%] md:basis-[34%] lg:basis-[28%] xl:basis-[22%]"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block select-none cursor-pointer rounded-[22px] transition-transform duration-300 group-hover:-translate-y-1.5"
                    aria-label={`Voir la publication sur Instagram: ${item.title}`}
                  >
                    {/* Exact Instagram 4:5 Aspect Ratio Post Card (no black border, hardware-accelerated rounded corners) */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-neutral-900/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.22)] transform-gpu isolate">
                      {/* Photo Image in 4:5 */}
                      <img
                        src={item.displayUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        loading={index < 4 ? "eager" : "lazy"}
                        decoding={index < 4 ? "sync" : "async"}
                        fetchPriority={index < 2 ? "high" : "auto"}
                        className="absolute inset-0 size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Subtle dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 transition-opacity duration-300 group-hover:from-[#b84300]/95 group-hover:via-black/55" />

                      {/* Top Header Bar: Date on Left, Instagram Icon on Right */}
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-3.5 z-10">
                        <span className="rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/10 shadow-sm">
                          {item.formattedDate}
                        </span>

                        <span className="flex size-7 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md border border-white/10 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E1306C]">
                          <InstagramIcon size={14} />
                        </span>
                      </div>

                      {/* Bottom Dock: Title Only */}
                      <div className="relative z-10 flex flex-col justify-end p-3.5 sm:p-4 text-white h-full pointer-events-none">
                        <h3
                          dir={item.isArabic ? "rtl" : "ltr"}
                          className={cn(
                            "font-display text-[13.5px] xs:text-[14px] sm:text-[15px] md:text-[16px] font-medium tracking-tight leading-[1.22] line-clamp-2 transition-colors group-hover:text-amber-200 pointer-events-auto",
                            item.isArabic ? "text-right font-arabic rubik-arabic font-normal leading-[1.25]" : ""
                          )}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex shrink-0 items-center justify-center gap-1.5 pt-1">
          {imagePosts.slice(0, Math.min(imagePosts.length, 10)).map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                currentSlide === index
                  ? "w-7 bg-primary"
                  : "w-2 bg-primary/20 hover:bg-primary/40"
              )}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ActualitesSection;
