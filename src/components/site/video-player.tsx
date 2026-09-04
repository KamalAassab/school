"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoPlayer({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const shellRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const seekRef = React.useRef<HTMLDivElement>(null);
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [started, setStarted] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [muted, setMuted] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [uiVisible, setUiVisible] = React.useState(true);

  const scheduleHide = React.useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setUiVisible(false), 2200);
  }, []);

  const wake = React.useCallback(() => {
    setUiVisible(true);
    if (!videoRef.current?.paused) scheduleHide();
  }, [scheduleHide]);

  React.useEffect(() => {
    if (playing) {
      scheduleHide();
    } else {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setUiVisible(true);
    }
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [playing, scheduleHide]);

  React.useEffect(() => {
    const onFsChange = () => setFullscreen(document.fullscreenElement === shellRef.current);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setStarted(true);
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      shellRef.current?.requestFullscreen?.();
    }
  };

  const seekToClientX = (clientX: number) => {
    const el = seekRef.current;
    const v = videoRef.current;
    if (!el || !v || !duration) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    setCurrent(ratio * duration);
  };

  const onSeekPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    seekToClientX(e.clientX);
  };

  const onSeekPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    seekToClientX(e.clientX);
  };

  const onSeekKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    if (e.key === "ArrowRight") {
      v.currentTime = Math.min(duration, v.currentTime + 5);
      setCurrent(v.currentTime);
    } else if (e.key === "ArrowLeft") {
      v.currentTime = Math.max(0, v.currentTime - 5);
      setCurrent(v.currentTime);
    }
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div
      ref={shellRef}
      onMouseMove={wake}
      onTouchStart={wake}
      className={cn(
        "group relative overflow-hidden bg-ink outline outline-1 -outline-offset-1 outline-black/10",
        className
      )}
    >
      <video
        ref={videoRef}
        poster={poster}
        preload="metadata"
        playsInline
        className="absolute inset-0 size-full object-cover"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {!playing ? (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={started ? "Lire la vidéo" : "Lire la vidéo"}
          className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors hover:bg-ink/30"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_20px_45px_-15px_rgba(184,67,0,0.65)] transition-transform duration-300 group-hover:scale-105 sm:size-20">
            <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" className="translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      ) : null}

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col gap-2.5 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300",
          uiVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          ref={seekRef}
          role="slider"
          tabIndex={0}
          aria-label="Progression de la vidéo"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={current}
          onPointerDown={onSeekPointerDown}
          onPointerMove={onSeekPointerMove}
          onKeyDown={onSeekKeyDown}
          className="group/seek relative h-3 w-full cursor-pointer touch-none"
        >
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div
            className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-transform group-hover/seek:scale-125"
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3.5 text-background">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Mettre en pause" : "Lire"}
            className="shrink-0 opacity-90 transition-opacity hover:opacity-100"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <span className="text-[12px] tabular-nums text-background/80">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          <span className="flex-1" />

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Activer le son" : "Couper le son"}
            className="shrink-0 opacity-90 transition-opacity hover:opacity-100"
          >
            {muted ? (
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Quitter le plein écran" : "Plein écran"}
            className="shrink-0 opacity-90 transition-opacity hover:opacity-100"
          >
            {fullscreen ? (
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
