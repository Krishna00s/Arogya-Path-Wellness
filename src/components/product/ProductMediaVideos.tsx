"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, VideoOff } from "lucide-react";
import type { ProductVideoItem } from "@/data/product-detail-content";

interface ProductMediaVideosProps {
  title: string;
  subtitle?: string;
  videos: ProductVideoItem[];
}

export function ProductMediaVideos({
  title,
  subtitle,
  videos,
}: ProductMediaVideosProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [shouldHydrateSrc, setShouldHydrateSrc] = useState(false);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const [mutedMap, setMutedMap] = useState<Record<number, boolean>>({});
  const [erroredMap, setErroredMap] = useState<Record<number, boolean>>({});

  // Lazy-load video sources only when section approaches viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldHydrateSrc(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldHydrateSrc(true);
          observer.disconnect();
        }
      },
      { rootMargin: "220px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!videos || videos.length === 0) {
    return null;
  }

  const togglePlayPause = (idx: number) => {
    const target = videoRefs.current[idx];
    if (!target || erroredMap[idx]) return;

    if (target.paused) {
      videoRefs.current.forEach((v, i) => {
        if (i !== idx && v && !v.paused) {
          v.pause();
        }
      });
      target.muted = mutedMap[idx] ?? true;
      void target
        .play()
        .then(() => setPlayingIdx(idx))
        .catch(() => {
          target.muted = true;
          void target.play().then(() => setPlayingIdx(idx)).catch(() => {});
        });
    } else {
      target.pause();
      setPlayingIdx((prev) => (prev === idx ? null : prev));
    }
  };

  const toggleMute = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    const target = videoRefs.current[idx];
    const currentMuted = mutedMap[idx] ?? true;
    const nextMuted = !currentMuted;
    if (target) {
      target.muted = nextMuted;
    }
    setMutedMap((prev) => ({ ...prev, [idx]: nextMuted }));
  };

  return (
    <section
      ref={sectionRef}
      aria-label={title}
      className="py-8 sm:py-11 bg-white border-b border-slate-100"
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-7">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto">
          {videos.map((item, idx) => {
            const isPlaying = playingIdx === idx;
            const isMuted = mutedMap[idx] ?? true;
            const hasError = Boolean(erroredMap[idx]);

            return (
              <div
                key={item.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden shadow-2xs"
              >
                <div
                  onClick={() => togglePlayPause(idx)}
                  className="relative aspect-[9/16] w-full bg-slate-900 overflow-hidden cursor-pointer select-none"
                >
                  {!hasError ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                        if (el) el.muted = isMuted;
                      }}
                      src={shouldHydrateSrc ? item.videoUrl : undefined}
                      aria-label={item.title}
                      loop
                      playsInline
                      muted={isMuted}
                      preload={shouldHydrateSrc ? "metadata" : "none"}
                      onPause={() =>
                        setPlayingIdx((prev) => (prev === idx ? null : prev))
                      }
                      onPlay={() => setPlayingIdx(idx)}
                      onError={() =>
                        setErroredMap((prev) => ({ ...prev, [idx]: true }))
                      }
                      className="w-full h-full object-cover object-top block"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-300">
                      <VideoOff className="w-7 h-7 mb-2 text-slate-400" />
                      <p className="text-xs font-medium">{item.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Video unavailable
                      </p>
                    </div>
                  )}

                  {/* Honest Category Label Badge */}
                  {item.label && (
                    <span className="absolute top-2.5 left-2.5 z-10 text-[11px] font-bold bg-black/75 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs pointer-events-none">
                      {item.label}
                    </span>
                  )}

                  {/* Center Play Overlay when paused */}
                  {!isPlaying && !hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                      <span className="w-12 h-12 rounded-full bg-black/65 text-white flex items-center justify-center border border-white/25 shadow-md">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </span>
                    </div>
                  )}

                  {/* Accessible Bottom Media Controls */}
                  {!hasError && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-2.5 inset-x-2.5 z-10 flex items-center justify-between gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => togglePlayPause(idx)}
                        aria-label={
                          isPlaying
                            ? `Pause ${item.title}`
                            : `Play ${item.title}`
                        }
                        className="w-10 h-10 rounded-full bg-black/70 hover:bg-black/85 text-white flex items-center justify-center border border-white/15 cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => toggleMute(e, idx)}
                        aria-label={
                          isMuted ? `Unmute ${item.title}` : `Mute ${item.title}`
                        }
                        className="w-10 h-10 rounded-full bg-black/70 hover:bg-black/85 text-white flex items-center justify-center border border-white/15 cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white px-3 py-2.5 border-t border-slate-100">
                  <p className="text-xs sm:text-sm font-bold text-[#111827] leading-snug line-clamp-2">
                    {item.title}
                  </p>
                  {item.caption && (
                    <p className="text-[11px] sm:text-xs font-medium text-slate-700 mt-1 leading-snug">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
