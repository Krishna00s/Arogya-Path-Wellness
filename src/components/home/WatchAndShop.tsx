"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SINGLE_PRODUCT_REELS, WATCH_AND_SHOP_REELS } from "@/data/mock-categories";
import { getAvailableProducts } from "@/data/mock-products";
import { storefrontConfig } from "@/config/storefront";
import { WatchAndShopModal } from "./WatchAndShopModal";

export function WatchAndShop() {
  const availableProducts = getAvailableProducts();
  const baseReels =
    storefrontConfig.launchMode === "single-product"
      ? SINGLE_PRODUCT_REELS
      : WATCH_AND_SHOP_REELS.filter((reel) =>
          availableProducts.some(
            (p) =>
              (reel.productId && p.id === reel.productId) ||
              p.name.toLowerCase() === reel.productName.trim().toLowerCase()
          )
        );

  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const dragCleanupRef = useRef<(() => void) | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragFlagTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasDraggedRef = useRef(false);

  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const isModalOpen = activeModalIndex !== null;

  useEffect(() => {
    return () => {
      dragCleanupRef.current?.();
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      if (dragFlagTimerRef.current) clearTimeout(dragFlagTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const videos = videoRefs.current.filter(
      (v): v is HTMLVideoElement => v !== null
    );
    if (videos.length === 0) return;

    if (isModalOpen) {
      for (const video of videos) {
        if (!video.paused) {
          video.pause();
        }
      }
      return;
    }

    const ensureMutedAndPlay = (video: HTMLVideoElement) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      if (video.paused) {
        void video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            ensureMutedAndPlay(video);
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        }
      },
      { threshold: [0, 0.35, 0.75] }
    );

    for (const video of videos) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      observer.observe(video);
    }

    return () => observer.disconnect();
  }, [baseReels.length, isModalOpen]);

  const handleTrackMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth + 2) return;

    dragCleanupRef.current?.();
    if (snapTimerRef.current) {
      clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }

    const startX = e.clientX;
    const startScrollLeft = track.scrollLeft;
    let movedBeyondThreshold = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      if (!movedBeyondThreshold && Math.abs(dx) >= 6) {
        movedBeyondThreshold = true;
        track.style.scrollSnapType = "none";
      }
      if (movedBeyondThreshold) {
        track.scrollLeft = startScrollLeft - dx;
      }
    };

    let cleanup = () => {};

    const endDrag = (endClientX?: number) => {
      cleanup();

      if (!movedBeyondThreshold) {
        return;
      }

      wasDraggedRef.current = true;
      if (dragFlagTimerRef.current) clearTimeout(dragFlagTimerRef.current);
      dragFlagTimerRef.current = setTimeout(() => {
        wasDraggedRef.current = false;
        dragFlagTimerRef.current = null;
      }, 80);

      const items = Array.from(track.children) as HTMLElement[];
      const maxIdx = Math.max(0, items.length - 2);
      const offsets = items
        .slice(0, maxIdx + 1)
        .map((el) => el.offsetLeft - track.offsetLeft);

      if (offsets.length > 0) {
        const currentScroll = track.scrollLeft;
        const dx = endClientX !== undefined ? endClientX - startX : startScrollLeft - currentScroll;

        let nearestIdx = 0;
        let minDist = Infinity;
        offsets.forEach((off, i) => {
          const d = Math.abs(off - currentScroll);
          if (d < minDist) {
            minDist = d;
            nearestIdx = i;
          }
        });

        let targetIdx = nearestIdx;
        const stepApprox = offsets.length > 1 ? offsets[1] - offsets[0] : 0;

        if (offsets.length > 1 && Math.abs(dx) <= stepApprox * 0.6) {
          if (dx < -30) {
            const nextIdx = offsets.findIndex((off) => off > startScrollLeft + 20);
            targetIdx = nextIdx === -1 ? maxIdx : Math.min(maxIdx, nextIdx);
          } else if (dx > 30) {
            let prevIdx = 0;
            for (let i = offsets.length - 1; i >= 0; i--) {
              if (offsets[i] < startScrollLeft - 20) {
                prevIdx = i;
                break;
              }
            }
            targetIdx = prevIdx;
          }
        }

        track.scrollTo({ left: offsets[targetIdx] ?? 0, behavior: "smooth" });
      }

      snapTimerRef.current = setTimeout(() => {
        track.style.scrollSnapType = "";
        snapTimerRef.current = null;
      }, 360);
    };

    const handleMouseUp = (upEvent: MouseEvent) => endDrag(upEvent.clientX);
    const handleWindowBlur = () => endDrag();

    cleanup = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("blur", handleWindowBlur);
      if (dragCleanupRef.current === cleanup) {
        dragCleanupRef.current = null;
      }
    };

    dragCleanupRef.current = cleanup;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("blur", handleWindowBlur);
  };

  const handleTileClick = (idx: number) => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return;
    }
    setActiveModalIndex(idx);
  };

  if (baseReels.length === 0) {
    return null;
  }

  return (
    <section id="watch-and-shop" className="pt-7 pb-6 sm:py-12 bg-white w-full">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-4 sm:mb-7">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#111827] tracking-tight">
            Watch &amp; Shop
          </h2>
        </div>

        {/* Exact 2-up 9:16 horizontal slider (touch + mouse drag) on mobile/tablet; 6-column row on desktop */}
        <div
          ref={trackRef}
          onMouseDown={handleTrackMouseDown}
          onDragStart={(e) => e.preventDefault()}
          className="flex lg:grid lg:grid-cols-6 gap-2.5 sm:gap-3.5 lg:gap-4 overflow-x-auto lg:overflow-visible no-scrollbar overscroll-x-contain snap-x snap-mandatory select-none cursor-pointer"
        >
          {baseReels.map((reel, idx) => (
            <button
              key={reel.id}
              type="button"
              onClick={() => handleTileClick(idx)}
              aria-label={`Play video: ${reel.title}`}
              className="p-0 border-0 bg-transparent block text-left shrink-0 lg:shrink snap-start w-[calc((100%-10px)/2)] sm:w-[calc((100%-14px)/2)] lg:w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B]"
            >
              <div className="relative w-full aspect-[9/16] bg-slate-100 overflow-hidden select-none">
                {reel.videoUrl ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                      if (el) {
                        el.muted = true;
                        el.defaultMuted = true;
                      }
                    }}
                    src={reel.videoUrl}
                    aria-label={reel.title}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    draggable={false}
                    className="w-full h-full object-cover object-top block pointer-events-none"
                  />
                ) : reel.posterImage ? (
                  <Image
                    src={reel.posterImage}
                    alt={reel.title}
                    fill
                    sizes="(max-width: 1023px) 50vw, 16vw"
                    draggable={false}
                    className="object-cover object-top pointer-events-none"
                  />
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeModalIndex !== null && (
        <WatchAndShopModal
          reels={baseReels}
          initialIndex={activeModalIndex}
          products={availableProducts}
          onClose={() => setActiveModalIndex(null)}
        />
      )}
    </section>
  );
}
