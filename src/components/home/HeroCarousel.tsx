"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { navigateToConcern } from "@/lib/utils";

interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  link: string;
  bgClass?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/products/testo-booster-capsules/couple-wellness-poster-2.png",
    alt: "Arogya Path Testo Booster Capsules — Men's Natural Support for Strength, Stamina & Overall Wellness",
    link: "#best-solutions",
    bgClass: "bg-[#F6F1EA]",
  },
  {
    id: "slide-2",
    image: "/images/products/testo-booster-capsules/ingredients-infographic.png",
    alt: "Testo Booster Capsules Powerful Ayurvedic Blend — Ashwagandha, Gokhuru, Shilajit, Safed Musli & Saffron",
    link: "#best-solutions",
    bgClass: "bg-[#FAF6F0]",
  },
  {
    id: "slide-3",
    image: "/images/products/testo-booster-capsules/natural-support-poster-3.png",
    alt: "Testo Booster Capsules — More Energy, Better Stamina & Overall Wellness",
    link: "#best-solutions",
    bgClass: "bg-[#F6EFE6]",
  },
  {
    id: "slide-4",
    image: "/images/products/testo-booster-capsules/ayurvedic-elevates-ad.png",
    alt: "Arogya Path Testo Booster — Elevates Beyond Limits with Ayurvedic Herbs",
    link: "#best-solutions",
    bgClass: "bg-[#0B0707]",
  },
  {
    id: "slide-5",
    image: "/images/products/testo-booster-capsules/trusted-mens-wellness-promo.png",
    alt: "Trusted by Lakhs of Indian Men — Arogya Path Testo Booster Capsules For Men Wellness",
    link: "#best-solutions",
    bgClass: "bg-[#F6F1EA]",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const programmaticTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScroll = useRef(false);
  const total = HERO_SLIDES.length;

  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleScrollEnd = () => {
      isProgrammaticScroll.current = false;
      if (programmaticTimeoutRef.current) {
        clearTimeout(programmaticTimeoutRef.current);
        programmaticTimeoutRef.current = null;
      }
    };

    container?.addEventListener("scrollend", handleScrollEnd);
    return () => {
      container?.removeEventListener("scrollend", handleScrollEnd);
      if (programmaticTimeoutRef.current) {
        clearTimeout(programmaticTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSlide = useCallback(
    (index: number) => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const targetIndex = (index + total) % total;
      const slideWidth = container.clientWidth;

      if (programmaticTimeoutRef.current) {
        clearTimeout(programmaticTimeoutRef.current);
      }
      isProgrammaticScroll.current = true;
      container.scrollTo({
        left: targetIndex * slideWidth,
        behavior: "smooth",
      });
      setCurrent(targetIndex);

      programmaticTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
        programmaticTimeoutRef.current = null;
      }, 650);
    },
    [total]
  );

  const nextSlide = useCallback(() => {
    scrollToSlide(current + 1);
  }, [current, scrollToSlide]);

  const prevSlide = useCallback(() => {
    scrollToSlide(current - 1);
  }, [current, scrollToSlide]);

  // Synchronize active dot with user's native swipe gestures
  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;

    const container = scrollContainerRef.current;
    if (!container) return;
    const slideWidth = container.clientWidth;
    if (slideWidth > 0) {
      const newIndex = Math.round(container.scrollLeft / slideWidth);
      if (newIndex >= 0 && newIndex < total && newIndex !== current) {
        setCurrent(newIndex);
      }
    }
  };

  // Automatic slide rotation every 5 seconds, respect pause
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleSlideClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Intentional tap switches to Men's Wellness and scrolls to featured products
    if (navigateToConcern("mens-wellness", "best-solutions")) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Promotional campaign hero carousel"
      className="relative w-full overflow-hidden select-none bg-white"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setIsPaused(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setIsPaused(false);
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      {/* Promotional slide track wrapper */}
      <div className="relative w-full aspect-[3/4] sm:aspect-square md:aspect-[1254/900] md:max-h-[620px] lg:max-h-[660px] mx-auto bg-[#FAF7F2]">
        {/* Hardware-accelerated horizontal scroll-snap track */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full h-full flex overflow-x-auto overflow-y-hidden no-scrollbar overscroll-x-contain snap-x snap-mandatory"
        >
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="w-full h-full shrink-0 snap-start snap-always relative select-none"
            >
              <a
                href={slide.link}
                onClick={handleSlideClick}
                draggable={false}
                className={`relative block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B4B39] select-none ${
                  slide.bgClass || "bg-[#FAF7F2]"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  loading="eager"
                  priority={idx === 0}
                  draggable={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1440px"
                  className="object-contain pointer-events-none select-none"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Pagination Indicators (44px vertical touch targets, 8px/24px visual pills) */}
      <div className="flex items-center justify-center bg-white">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === current ? "true" : undefined}
            className="h-11 min-w-[28px] px-1.5 flex items-center justify-center cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39] rounded-full"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-6 h-2 bg-[#0B4B39]"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
            <span className="sr-only">Slide {idx + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
