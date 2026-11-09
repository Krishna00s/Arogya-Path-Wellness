"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  link: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/couple-promoting-mens-natural-support.png",
    alt: "Couple Promoting Men’s Natural Support - Testo Natural Strength & Stamina",
    link: "#best-solutions",
  },
  {
    id: "slide-2",
    image: "/ayurvedic-stamina-blend-infographic.png",
    alt: "Ayurvedic Stamina Blend Infographic - Testo Natural Power+ Key Herbal Ingredients",
    link: "#best-solutions",
  },
  {
    id: "slide-3",
    image: "/testo-natural-supplement-advertisement.png",
    alt: "Testo Natural Supplement Advertisement - Daily Support for Men's Strength, Stamina & Overall Wellness",
    link: "#best-solutions",
  },
  {
    id: "slide-4",
    image: "/trusted-wellness-for-men.png",
    alt: "Trusted Wellness for Men - Arogya Path Testo Natural Power+ Trusted by Lakhs of Indian Men",
    link: "#best-solutions",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScroll = useRef(false);
  const total = HERO_SLIDES.length;

  const scrollToSlide = useCallback(
    (index: number) => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const targetIndex = (index + total) % total;
      const slideWidth = container.clientWidth;
      isProgrammaticScroll.current = true;
      container.scrollTo({
        left: targetIndex * slideWidth,
        behavior: "smooth",
      });
      setCurrent(targetIndex);

      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 400);
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
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);

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

  // Automatic slide rotation approximately every 5 seconds, respect pause
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleSlideClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If user was swiping, suppress accidental click navigation
    if (isScrollingRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Intentional tap switches to Men's Wellness and scrolls to products
    window.dispatchEvent(
      new CustomEvent("switch-concern-tab", { detail: { slug: "mens-wellness" } })
    );
    const el = document.getElementById("best-solutions");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Promotional campaign hero carousel"
      className="relative w-full overflow-hidden select-none bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Relative wrapper holding both scroll container and overlay arrow buttons */}
      <div className="relative w-full aspect-[1199/1312] sm:aspect-square md:aspect-[1254/900] md:max-h-[620px] lg:max-h-[660px] mx-auto bg-[#FAF7F2]">
        {/* Hardware-accelerated horizontal scroll-snap track */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full h-full flex overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory touch-scroll-x"
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
                className="relative block w-full h-full focus:outline-none select-none"
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  draggable={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1440px"
                  className="object-contain pointer-events-none select-none"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Previous Slide Arrow Button (Outside the scroll container for clean touch events) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.preventDefault();
            prevSlide();
          }}
          aria-label="Previous slide"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all duration-200 opacity-75 hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer touch-manipulation"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Slide Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.preventDefault();
            nextSlide();
          }}
          aria-label="Next slide"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all duration-200 opacity-75 hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer touch-manipulation"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Accessible Pagination Indicators */}
      <div className="flex items-center justify-center gap-2 py-3 bg-white">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300 touch-target-44 flex items-center justify-center ${
              idx === current
                ? "w-6 h-2 bg-[#0B4B39]"
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
            }`}
          >
            <span className="sr-only">Slide {idx + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
