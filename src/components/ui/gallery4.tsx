"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  date?: string;
  type?: "Image" | "Video" | "Sidecar";
  isArabic?: boolean;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  onItemClick?: (item: Gallery4Item) => void;
  className?: string;
}

const defaultData: Gallery4Item[] = [
  {
    id: "shadcn-ui",
    title: "shadcn/ui: Building a Modern Component Library",
    description:
      "Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization, making it easier for developers to build beautiful, accessible applications.",
    href: "https://ui.shadcn.com",
    image:
      "https://cdn.21st.dev/assets/mirror/4e/4eb8a143da7e1e0cc7b6005fb7d61fc853322b90f24e29726de26fb7c41357ee.jpg",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS: The Utility-First Revolution",
    description:
      "Discover how Tailwind CSS transformed the way developers style their applications, offering a utility-first approach that speeds up development while maintaining complete design flexibility.",
    href: "https://tailwindcss.com",
    image:
      "https://cdn.21st.dev/assets/mirror/57/57bb4cd63c5b1957b3799f5f782fba3f1671d0a3a02349eee69a2b62b59bb258.jpg",
  },
  {
    id: "astro",
    title: "Astro: The All-in-One Web Framework",
    description:
      "Learn how Astro's innovative 'Islands Architecture' and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity where needed.",
    href: "https://astro.build",
    image:
      "https://cdn.21st.dev/assets/mirror/c6/c62ec1d11df3109a5c2ed7862993577747f114b94f8674f1e4133634e5ea72aa.jpg",
  },
  {
    id: "react",
    title: "React: Pioneering Component-Based UI",
    description:
      "See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces with reusable, maintainable code.",
    href: "https://react.dev",
    image:
      "https://cdn.21st.dev/assets/mirror/4d/4d713056e68142cabf897098f3204cf4e3205b9030691a5cdcfe4c66e971cee1.jpg",
  },
  {
    id: "nextjs",
    title: "Next.js: The React Framework for Production",
    description:
      "Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components, file-based routing, and automatic optimization.",
    href: "https://nextjs.org",
    image:
      "https://cdn.21st.dev/assets/mirror/ce/ce3f6a67c5581a8723f56c8956303da2c096b12647c81eaef42cdd002cb4561e.jpg",
  },
];

const Gallery4 = ({
  title = "Actualités & Vie scolaire",
  description = "Suivez les moments forts, les projets de nos élèves, les distinctions et la vie de notre établissement au quotidien.",
  items = defaultData,
  onItemClick,
  className,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

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
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section
      className={cn(
        "relative flex min-h-[100dvh] lg:h-[100dvh] w-full flex-col justify-center overflow-hidden py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-[#fbfaf7] via-white to-[#fbfaf7] border-b border-ink/[0.06]",
        className
      )}
    >
      {/* Decorative ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-12 size-96 rounded-full bg-brand/[0.04] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 bottom-12 size-96 rounded-full bg-primary/[0.04] blur-3xl"
      />

      <div className="container-page flex flex-col justify-between h-full max-h-full gap-4 sm:gap-6">
        {/* Header section */}
        <div className="flex shrink-0 items-end justify-between gap-6 border-b border-ink/[0.06] pb-4 sm:pb-6">
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <h2 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
              {title}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px] line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="text-xs font-mono font-medium text-muted-foreground mr-1.5 tabular-nums hidden sm:inline-block">
              <span className="text-foreground font-bold">{currentSlide + 1}</span> / {items.length}
            </span>

            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="size-9 sm:size-10 rounded-full border-ink/15 bg-white text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowLeft className="size-4" />
              <span className="sr-only">Précédent</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="size-9 sm:size-10 rounded-full border-ink/15 bg-white text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowRight className="size-4" />
              <span className="sr-only">Suivant</span>
            </Button>
          </div>
        </div>

        {/* Carousel Viewport Area */}
        <div className="w-full flex-1 flex flex-col justify-center min-h-0">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: false,
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 sm:-ml-4 lg:-ml-5">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-3 sm:pl-4 lg:pl-5 basis-[78%] sm:basis-[45%] md:basis-[36%] lg:basis-[28%] xl:basis-[22%]"
                >
                  <div
                    onClick={() => onItemClick?.(item)}
                    className="group block select-none cursor-pointer rounded-2xl sm:rounded-[22px] overflow-hidden"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:rounded-[22px] border border-ink/[0.08] bg-neutral-900 shadow-md transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:border-brand/40">
                      {/* Image cover */}
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Theme-aligned gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#201a15]/95 via-[#201a15]/55 to-transparent transition-opacity duration-300 group-hover:from-[#b84300]/95 group-hover:via-[#201a15]/65" />

                      {/* Badges on Top */}
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 z-10">
                        {item.type ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/15">
                            {item.type === "Video"
                              ? "Vidéo"
                              : item.type === "Sidecar"
                              ? "Album"
                              : "Actualité"}
                          </span>
                        ) : (
                          <span />
                        )}

                        {item.date ? (
                          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur-md shadow-sm">
                            {item.date}
                          </span>
                        ) : null}
                      </div>

                      {/* Content Bottom Area */}
                      <div className="relative z-10 flex flex-col items-start p-5 sm:p-6 text-white">
                        <div
                          dir={item.isArabic ? "rtl" : "ltr"}
                          className={cn(
                            "mb-2 font-display text-lg sm:text-xl font-semibold tracking-tight leading-snug line-clamp-2 transition-colors group-hover:text-amber-200",
                            item.isArabic ? "text-right w-full font-sans" : ""
                          )}
                        >
                          {item.title}
                        </div>

                        <div
                          dir={item.isArabic ? "rtl" : "ltr"}
                          className={cn(
                            "mb-4 text-xs sm:text-[13px] leading-relaxed text-white/80 line-clamp-2",
                            item.isArabic ? "text-right w-full" : ""
                          )}
                        >
                          {item.description}
                        </div>

                        <div className="flex items-center text-xs sm:text-sm font-semibold text-white/95 group-hover:text-white">
                          <span>Lire l'article</span>
                          <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Indicator dots at the bottom */}
        <div className="flex shrink-0 items-center justify-center gap-1.5 pt-2 pb-1">
          {items.slice(0, Math.min(items.length, 12)).map((_, index) => (
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
          {items.length > 12 ? (
            <span className="text-[11px] font-mono text-muted-foreground ml-2">
              +{items.length - 12} plus
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
};

function Gallery4Demo() {
  return <Gallery4 items={defaultData} />;
}

export { Gallery4, Gallery4Demo };
export default Gallery4;
