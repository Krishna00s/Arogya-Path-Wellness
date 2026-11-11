"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { ProductGallerySlide } from "@/data/product-detail-content";

interface ProductGalleryProps {
  slides: ProductGallerySlide[];
  productName: string;
  badge?: string;
}

export function ProductGallery({
  slides,
  productName,
  badge,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [arrowsVisible, setArrowsVisible] = useState(true);
  const [failedSrcs, setFailedSrcs] = useState<Record<string, true>>({});
  const stageRef = useRef<HTMLDivElement | null>(null);
  const swipeStartX = useRef<number | null>(null);

  // Scroll-aware arrow visibility via IntersectionObserver (zero scroll event re-render churn)
  useEffect(() => {
    const el = stageRef.current;
    if (!el || slides.length <= 1 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const shouldShow = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        setArrowsVisible((prev) => (prev === shouldShow ? prev : shouldShow));
      },
      {
        rootMargin: "-64px 0px 40px 0px",
        threshold: [0, 0.25, 0.5],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const safeIndex = Math.min(activeIndex, slides.length - 1);
  const currentSlide = slides[safeIndex];
  const currentSrc = currentSlide.imageSrc || currentSlide.tempImageSrc;
  const hasError = !currentSrc || Boolean(failedSrcs[currentSrc]);

  const handlePrev = () => {
    setActiveIndex((idx) => (idx - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((idx) => (idx + 1) % slides.length);
  };

  const handleStageKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="w-full" aria-label={`${productName} image gallery`}>
      {/* Main 1:1 Aspect Gallery Frame (Preserves aspect ratios & bottle legibility with object-contain) */}
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={handleStageKeyDown}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            swipeStartX.current = e.touches[0].clientX;
          }
        }}
        onTouchEnd={(e) => {
          if (swipeStartX.current === null || e.changedTouches.length === 0) return;
          const dx = e.changedTouches[0].clientX - swipeStartX.current;
          swipeStartX.current = null;
          if (dx < -40) handleNext();
          else if (dx > 40) handlePrev();
        }}
        className="relative aspect-square w-full bg-white rounded-2xl border border-slate-200 overflow-hidden select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B]"
      >
        {!hasError && currentSrc ? (
          <Image
            src={currentSrc}
            alt={currentSlide.alt}
            fill
            priority={safeIndex === 0}
            loading={safeIndex === 0 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 94vw, 560px"
            onError={() =>
              setFailedSrcs((prev) => ({ ...prev, [currentSrc]: true }))
            }
            className="object-contain pointer-events-none"
          />
        ) : (
          <div className="w-full h-full bg-[#F6F8F5] flex flex-col items-center justify-center p-6 text-center">
            <ImageOff className="w-8 h-8 text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">
              {currentSlide.title}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Product visual unavailable right now.
            </p>
          </div>
        )}

        {/* Product Badge */}
        {badge && (
          <span className="absolute bottom-3 right-3 z-10 text-xs font-bold bg-[#C93B3B] text-white px-3 py-0.5 rounded-full shadow-2xs pointer-events-none">
            {badge}
          </span>
        )}

        {/* Gallery Slide Counter */}
        <span className="absolute bottom-3 left-3 z-10 text-xs font-bold bg-black/70 text-white px-2.5 py-0.5 rounded-full pointer-events-none">
          {safeIndex + 1} / {slides.length}
        </span>

        {/* Scroll-Aware Previous / Next Navigation Arrows (contained inside stage) */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              tabIndex={arrowsVisible ? 0 : -1}
              aria-hidden={!arrowsVisible}
              aria-label="Previous product image"
              className={`absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#355E2B]/95 hover:bg-[#2a4c22] text-white flex items-center justify-center shadow-md cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-200 ease-out motion-reduce:transition-none ${
                arrowsVisible
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 -translate-x-2 pointer-events-none"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              tabIndex={arrowsVisible ? 0 : -1}
              aria-hidden={!arrowsVisible}
              aria-label="Next product image"
              className={`absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#355E2B]/95 hover:bg-[#2a4c22] text-white flex items-center justify-center shadow-md cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-200 ease-out motion-reduce:transition-none ${
                arrowsVisible
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 translate-x-2 pointer-events-none"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Horizontal Thumbnail Strip */}
      {slides.length > 1 && (
        <div
          role="tablist"
          aria-label="Product gallery thumbnails"
          className="flex items-center gap-2 sm:gap-2.5 mt-3 overflow-x-auto no-scrollbar pb-1"
        >
          {slides.map((slide, idx) => {
            const isActive = idx === safeIndex;
            const thumbSrc = slide.imageSrc || slide.tempImageSrc;
            const thumbFailed = !thumbSrc || Boolean(failedSrcs[thumbSrc]);

            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`View image ${idx + 1}: ${slide.title}`}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-15 h-15 sm:w-19 sm:h-19 rounded-xl shrink-0 overflow-hidden bg-white border-2 transition-colors cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B] ${
                  isActive
                    ? "border-[#355E2B]"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {!thumbFailed && thumbSrc ? (
                  <Image
                    src={thumbSrc}
                    alt={slide.title}
                    fill
                    loading="lazy"
                    sizes="76px"
                    onError={() =>
                      setFailedSrcs((prev) => ({ ...prev, [thumbSrc]: true }))
                    }
                    className="object-contain pointer-events-none"
                  />
                ) : (
                  <div className="w-full h-full bg-[#F6F8F5] flex items-center justify-center">
                    <ImageOff className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
