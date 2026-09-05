"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  autoPlay = false,
  loop = false,
  muted: initialMuted = false,
  className,
  ...props
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const seekTrackRef = React.useRef<HTMLDivElement>(null);
  const hideControlsTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isDraggingSeekRef = React.useRef(false);

  // Mount state for SSR hydration safety & instant initial paint
  const [isMounted, setIsMounted] = React.useState(false);

  // Core playback states
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [bufferedEnd, setBufferedEnd] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(initialMuted);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [showControls, setShowControls] = React.useState(true);
  const [isHoveringSeek, setIsHoveringSeek] = React.useState(false);
  const [hoverTime, setHoverTime] = React.useState(0);
  const [hoverPositionPercent, setHoverPositionPercent] = React.useState(0);
  const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-hide controls during playback
  const scheduleControlsHide = React.useCallback(() => {
    if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = setTimeout(() => {
      if (!videoRef.current?.paused && !isDraggingSeekRef.current) {
        setShowControls(false);
        setShowSpeedMenu(false);
      }
    }, 2800);
  }, []);

  const showControlsTemporarily = React.useCallback(() => {
    setShowControls(true);
    scheduleControlsHide();
  }, [scheduleControlsHide]);

  // Sync fullscreen state
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Update duration & buffering
  const handleDurationChange = () => {
    const v = videoRef.current;
    if (v && Number.isFinite(v.duration) && v.duration > 0) {
      setDuration(v.duration);
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!isDraggingSeekRef.current) {
      setCurrentTime(v.currentTime);
    }
    if (v.buffered.length > 0 && Number.isFinite(v.duration) && v.duration > 0) {
      setBufferedEnd(v.buffered.end(v.buffered.length - 1));
    }
    if (!duration && Number.isFinite(v.duration) && v.duration > 0) {
      setDuration(v.duration);
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
    showControlsTemporarily();
  };

  // Skip ±seconds
  const skip = (seconds: number) => {
    const v = videoRef.current;
    if (!v) return;
    const maxDuration = duration || v.duration || 0;
    const target = Math.max(0, Math.min(maxDuration, v.currentTime + seconds));
    v.currentTime = target;
    setCurrentTime(target);
    showControlsTemporarily();
  };

  // Volume & Mute
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
    showControlsTemporarily();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isMuted) {
      v.muted = false;
      setIsMuted(false);
      if (volume === 0) {
        setVolume(0.5);
        v.volume = 0.5;
      }
    } else {
      v.muted = true;
      setIsMuted(true);
    }
    showControlsTemporarily();
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      container.requestFullscreen().catch(() => {});
    }
    showControlsTemporarily();
  };

  // Picture in Picture
  const togglePiP = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (v !== document.pictureInPictureElement && document.pictureInPictureEnabled) {
        await v.requestPictureInPicture();
      }
    } catch {}
    showControlsTemporarily();
  };

  // Playback rate
  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowSpeedMenu(false);
    showControlsTemporarily();
  };

  // Seeking logic
  const calculateSeekRatio = (clientX: number) => {
    const el = seekTrackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return 0;
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  };

  const onSeekPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    isDraggingSeekRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const ratio = calculateSeekRatio(e.clientX);
    const maxDuration = duration || videoRef.current?.duration || 0;
    const newTime = ratio * maxDuration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const onSeekPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ratio = calculateSeekRatio(e.clientX);
    const maxDuration = duration || videoRef.current?.duration || 0;
    setHoverPositionPercent(ratio * 100);
    setHoverTime(ratio * maxDuration);

    if (isDraggingSeekRef.current && videoRef.current) {
      const newTime = ratio * maxDuration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const onSeekPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingSeekRef.current) {
      isDraggingSeekRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      showControlsTemporarily();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLInputElement) return;

    switch (e.key.toLowerCase()) {
      case " ":
      case "k":
        e.preventDefault();
        togglePlay();
        break;
      case "f":
        e.preventDefault();
        toggleFullscreen();
        break;
      case "m":
        e.preventDefault();
        toggleMute();
        break;
      case "arrowleft":
      case "j":
        e.preventDefault();
        skip(-5);
        break;
      case "arrowright":
      case "l":
        e.preventDefault();
        skip(5);
        break;
      case "arrowup":
        e.preventDefault();
        setVolume((prev) => {
          const next = Math.min(1, prev + 0.1);
          if (videoRef.current) {
            videoRef.current.volume = next;
            videoRef.current.muted = false;
            setIsMuted(false);
          }
          return next;
        });
        showControlsTemporarily();
        break;
      case "arrowdown":
        e.preventDefault();
        setVolume((prev) => {
          const next = Math.max(0, prev - 0.1);
          if (videoRef.current) {
            videoRef.current.volume = next;
            if (next === 0) {
              videoRef.current.muted = true;
              setIsMuted(true);
            }
          }
          return next;
        });
        showControlsTemporarily();
        break;
    }
  };

  const maxDuration = duration || videoRef.current?.duration || 0;
  const progressPercent = maxDuration > 0 ? Math.min(100, Math.max(0, (currentTime / maxDuration) * 100)) : 0;
  const bufferPercent = maxDuration > 0 ? Math.min(100, Math.max(0, (bufferedEnd / maxDuration) * 100)) : 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      suppressHydrationWarning
      onKeyDown={handleKeyDown}
      onMouseMove={showControlsTemporarily}
      onTouchStart={showControlsTemporarily}
      onMouseLeave={() => {
        if (isPlaying && !isDraggingSeekRef.current) {
          setShowControls(false);
          setShowSpeedMenu(false);
        }
      }}
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-950 font-sans select-none outline-none ring-1 ring-black/10 focus-visible:ring-2 focus-visible:ring-primary shadow-2xl",
        isFullscreen ? "h-screen w-screen rounded-none" : "",
        className
      )}
      {...props}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        // No `poster` attribute on purpose: the overlay <img> below covers the
        // video until playback starts and can be lazy-loaded, whereas a poster
        // attribute is always fetched eagerly. Both players sit below the fold.
        preload="none"
        playsInline
        autoPlay={autoPlay}
        loop={loop}
        muted={initialMuted}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setShowControls(true);
        }}
        onTimeUpdate={handleTimeUpdate}
        onProgress={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        onLoadedMetadata={handleDurationChange}
        onCanPlay={handleDurationChange}
        className="size-full object-cover cursor-pointer"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Poster Thumbnail Display before playback */}
      {poster && !isPlaying && currentTime === 0 ? (
        <img
          src={poster}
          alt={title || "Miniature vidéo"}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full object-cover select-none"
        />
      ) : null}

      {/* Prominent Center Play Button when Paused */}
      {!isPlaying ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 transition-all">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label="Lire la vidéo"
            className="pointer-events-auto flex size-10 sm:size-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-all duration-200 hover:scale-110 hover:bg-red-700 active:scale-95 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="size-5 sm:size-7 fill-current">
              <path d="M8.5 5.5v13a1 1 0 0 0 1.52.85l9.5-6.5a1 1 0 0 0 0-1.7l-9.5-6.5A1 1 0 0 0 8.5 5.5z" />
            </svg>
          </button>
        </div>
      ) : null}

      {/* Interactive Controls Overlay - Hydrated smoothly on client */}
      {isMounted ? (
        <>
          {/* Top Bar (Title) */}
          {title ? (
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/30 to-transparent p-4 transition-opacity duration-300",
                showControls ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="text-sm font-semibold tracking-wide text-white drop-shadow">
                {title}
              </span>
            </div>
          ) : null}

          {/* Bottom Floating Control Bar */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex flex-col gap-1 sm:gap-2 p-2 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300",
              showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            )}
          >
            {/* Scrubber Progress Bar */}
            <div
              ref={seekTrackRef}
              role="slider"
              tabIndex={0}
              aria-label="Progression de la vidéo"
              aria-valuemin={0}
              aria-valuemax={maxDuration}
              aria-valuenow={currentTime}
              onPointerDown={onSeekPointerDown}
              onPointerMove={onSeekPointerMove}
              onPointerUp={onSeekPointerUp}
              onPointerCancel={onSeekPointerUp}
              onMouseEnter={() => setIsHoveringSeek(true)}
              onMouseLeave={() => setIsHoveringSeek(false)}
              className="group/seek relative flex h-4 sm:h-5 w-full cursor-pointer touch-none items-center"
            >
              {/* Track Bar */}
              <div className="relative h-1 sm:h-1.5 w-full overflow-hidden rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 group-hover/seek:h-2 sm:group-hover/seek:h-2.5">
                {/* Buffered */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-white/35 transition-[width] duration-150"
                  style={{ width: `${bufferPercent}%` }}
                />
                {/* Current Progress */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#b84300] to-[#e85e10]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Scrubber Thumb */}
              <div
                className="pointer-events-none absolute top-1/2 size-2.5 sm:size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md ring-1.5 sm:ring-2 ring-[#e85e10] transition-transform duration-150 group-hover/seek:scale-125"
                style={{ left: `${progressPercent}%` }}
              />

              {/* Hover Time Tooltip */}
              {isHoveringSeek && maxDuration > 0 ? (
                <div
                  className="pointer-events-none absolute -top-8 -translate-x-1/2 rounded-md bg-neutral-900/90 px-2 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur-sm border border-white/10"
                  style={{ left: `${hoverPositionPercent}%` }}
                >
                  {formatTime(hoverTime)}
                </div>
              ) : null}
            </div>

            {/* Control Buttons Bar */}
            <div className="flex items-center justify-between gap-1 sm:gap-2 text-white">
              {/* Left Controls: Play, Skip 10s, Volume, Time */}
              <div className="flex items-center gap-1 sm:gap-3">
                {/* Play/Pause */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Lecture"}
                  className="flex size-8 sm:size-10 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/15 hover:text-white cursor-pointer"
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" className="size-4 sm:size-5 fill-current">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="size-4 sm:size-5 fill-current">
                      <path d="M8.5 5.5v13a1 1 0 0 0 1.52.85l9.5-6.5a1 1 0 0 0 0-1.7l-9.5-6.5A1 1 0 0 0 8.5 5.5z" />
                    </svg>
                  )}
                </button>

                {/* Skip Back 10s */}
                <button
                  type="button"
                  onClick={() => skip(-10)}
                  aria-label="Reculer de 10 secondes"
                  className="hidden sm:flex size-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <text x="12" y="15" textAnchor="middle" fill="currentColor" stroke="none" fontSize="7" fontWeight="bold" fontFamily="sans-serif">10</text>
                  </svg>
                </button>

                {/* Skip Forward 10s */}
                <button
                  type="button"
                  onClick={() => skip(10)}
                  aria-label="Avancer de 10 secondes"
                  className="hidden sm:flex size-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <text x="12" y="15" textAnchor="middle" fill="currentColor" stroke="none" fontSize="7" fontWeight="bold" fontFamily="sans-serif">10</text>
                  </svg>
                </button>

                {/* Volume Control with Hover Slider */}
                <div className="group/vol flex items-center">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Activer le son" : "Couper le son"}
                    className="flex size-8 sm:size-10 items-center justify-center rounded-lg text-white/85 transition-colors hover:bg-white/15 hover:text-white cursor-pointer"
                  >
                    {isMuted || volume === 0 ? (
                      <svg viewBox="0 0 24 24" className="size-4 sm:size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : volume < 0.5 ? (
                      <svg viewBox="0 0 24 24" className="size-4 sm:size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="size-4 sm:size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    )}
                  </button>

                  <div className="w-0 overflow-hidden transition-all duration-200 group-hover/vol:w-16 sm:group-hover/vol:w-20 group-focus-within/vol:w-20 flex items-center pr-1">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      aria-label="Volume"
                      className="h-1 w-full cursor-pointer accent-[#e85e10] bg-white/30 rounded-lg appearance-none"
                    />
                  </div>
                </div>

                {/* Time Stamp */}
                <span className="text-[11px] sm:text-[12px] font-mono font-medium tracking-tight text-white/80 tabular-nums">
                  {formatTime(currentTime)} <span className="text-white/40">/</span> {formatTime(maxDuration)}
                </span>
              </div>

              {/* Right Controls: Speed, PiP, Fullscreen */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Speed Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSpeedMenu((prev) => !prev)}
                    aria-label="Vitesse de lecture"
                    className="flex h-7 sm:h-8 items-center justify-center rounded-md px-1.5 sm:px-2 text-[11px] sm:text-xs font-semibold text-white/85 transition-colors hover:bg-white/15 hover:text-white cursor-pointer"
                  >
                    {playbackRate}x
                  </button>

                  {showSpeedMenu ? (
                    <div className="absolute bottom-full right-0 mb-2 flex flex-col rounded-lg bg-neutral-900/95 p-1 text-xs text-white shadow-xl backdrop-blur-md border border-white/10 z-30">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => changePlaybackRate(rate)}
                          className={cn(
                            "rounded px-3 py-1.5 text-left font-medium transition-colors hover:bg-white/20 cursor-pointer",
                            playbackRate === rate ? "bg-[#b84300] text-white font-bold" : "text-white/80"
                          )}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* Picture-in-Picture */}
                <button
                  type="button"
                  onClick={togglePiP}
                  aria-label="Incrustation vidéo (Picture in picture)"
                  className="hidden sm:flex size-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <rect x="12" y="10" width="8" height="6" rx="1" fill="currentColor" stroke="none" />
                  </svg>
                </button>

                {/* Fullscreen */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
                  className="flex size-8 sm:size-10 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/15 hover:text-white cursor-pointer"
                >
                  {isFullscreen ? (
                    <svg viewBox="0 0 24 24" className="size-4 sm:size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="size-4 sm:size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        </>
      ) : null}
    </div>
  );
};

export default VideoPlayer;
