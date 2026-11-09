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
    image: "/hero-banner-1.jpg",
    alt: "Arogya Path Pure Shilajit Gold - Natural Stamina Ka Dose",
    link: "#best-solutions",
  },
  {
    id: "slide-2",
    image: "/hero-banner-2.jpg",
    alt: "Arogya Path Digest Zen Herbal Churna - Healthy Gut, Active Life",
    link: "#ayurvedic-solutions",
  },
  {
    id: "slide-3",
    image: "/hero-banner-3.jpg",
    alt: "Arogya Path Immuno Plus Tablets - Stronger Immunity Daily",
    link: "#ayurvedic-solutions",
  },
  {
    id: "slide-4",
    image: "/hero-banner-4.jpg",
    alt: "Arogya Path Kesh Sanjeevani - Root Strengthening Hair Care",
    link: "#hair-care",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 45;

  const total = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic slide rotation approximately every 5 seconds, respect pause
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setIsPaused(false);
  };

  return (
    <section
      aria-label="Promotional campaign hero carousel"
      className="relative w-full overflow-hidden select-none bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-bleed promotional slide: authoritative 390:527 mobile proportion, 534px desktop */}
      <div className="relative w-full aspect-[390/527] md:aspect-[1425/534] md:max-h-[534px] overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <a href={slide.link} className="relative block w-full h-full focus:outline-none">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-top"
                />
              </a>
            </div>
          );
        })}
      </div>

      {/* Accessible Pagination Indicators */}
      <div className="flex items-center justify-center gap-2 py-2.5 bg-white">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
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
