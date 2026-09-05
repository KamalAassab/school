import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { MessageSquareIcon } from "@/components/ui/message-square";

import dynamic from "next/dynamic";

import { Reveal } from "@/components/site/reveal";

// Below the fold and only interactive once the user presses play, so its
// JS is split out of the shared bundle. Still server-rendered.
const VideoPlayer = dynamic(() =>
  import("@/components/video-player/video-player").then((mod) => mod.VideoPlayer)
);
import { Button } from "@/components/ui/button";
import { presentationSections } from "@/lib/content";

export function Director() {
  // Mot du directeur d'établissement
  return (
    <section className="py-11 sm:py-14">
      <div className="container-page flex flex-col gap-10 px-3 sm:px-8 lg:px-10">
        <Reveal className="mx-auto w-full max-w-4xl">
          <VideoPlayer
            src="/media/mot-du-directeur.mp4"
            poster="/images/directeur.webp"
            className="aspect-video w-full rounded-[28px]"
          />
        </Reveal>

        <Reveal className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-1 sm:px-0 text-center">
          <MessageSquareIcon size={32} className="text-brand" />
          <p className="font-display text-lg font-medium leading-relaxed tracking-tight text-balance sm:text-xl lg:text-2xl">
            {presentationSections.fondateurs.text}
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="h-px w-10 bg-primary" />
            <p className="text-[13px] font-medium text-muted-foreground">
              Mot du directeur d&rsquo;établissement
            </p>
          </div>
          <Button asChild variant="outline" className="mt-1 w-fit">
            <Link href="/presentation">
              Lire notre présentation
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
