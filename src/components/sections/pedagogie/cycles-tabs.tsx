"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cycles } from "@/lib/content";

const slugs = cycles.map((c) => c.slug) as string[];

export function CyclesTabs() {
  const [value, setValue] = React.useState<string>(cycles[0].slug);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (slugs.includes(hash)) {
      setValue(hash);
      requestAnimationFrame(() => {
        rootRef.current?.scrollIntoView({ block: "start" });
      });
    }
  }, []);

  return (
    <div ref={rootRef} className="scroll-mt-24">
      <Tabs value={value} onValueChange={setValue} className="items-start">
        <TabsList>
          {cycles.map((cycle) => (
            <TabsTrigger key={cycle.slug} value={cycle.slug}>
              {cycle.short}
            </TabsTrigger>
          ))}
        </TabsList>

        {cycles.map((cycle) => (
          <TabsContent
            key={cycle.slug}
            value={cycle.slug}
            id={cycle.slug}
            className="scroll-mt-24"
          >
            <div className="grid grid-cols-1 gap-10 rounded-[28px] bg-muted p-8 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div className="flex flex-col gap-5">
                <span className="w-fit rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-primary">
                  {cycle.age}
                </span>
                <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
                  {cycle.label}
                </h3>
                <p className="max-w-[48ch] text-[16px] leading-relaxed text-muted-foreground">
                  {cycle.description}
                </p>
                <Button asChild variant="outline" className="mt-1 w-fit bg-white">
                  <Link href="/recrutement">
                    Recrutement — {cycle.short}
                    <ArrowRight weight="bold" className="size-4" />
                  </Link>
                </Button>
              </div>
              <ul className="flex flex-col gap-4">
                {cycle.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <CheckCircle
                      weight="fill"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span className="text-[15px] leading-relaxed text-foreground/85">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
