"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { POPULAR_CATEGORIES } from "@/data/mock-categories";
import { navigateToConcern } from "@/lib/utils";

export function PopularCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const displayCategories = POPULAR_CATEGORIES.slice(0, 4);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const items = Array.from(container.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el.offsetWidth > 0
    );
    if (!items.length) return;

    const currentScroll = container.scrollLeft;

    if (direction === "right") {
      const target = items.find((item) => item.offsetLeft > currentScroll + 20);
      if (target) {
        container.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
      } else {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      }
    } else {
      const prevItems = items.filter((item) => item.offsetLeft < currentScroll - 20);
      if (prevItems.length > 0) {
        const target = prevItems[prevItems.length - 1];
        container.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
      } else {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="popular-categories" className="py-8 sm:py-12 bg-white w-full">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Centered Heading on Mobile (Hidden on Desktop where it is in the first column) */}
        <div className="text-center mb-6 sm:mb-8 lg:hidden">
          <h2 className="text-2xl sm:text-3xl font-medium text-[#111827] tracking-tight">
            Our Most Popular Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Arogya Path provides Ayurvedic solutions
          </p>
        </div>
      </div>

      {/* Category Cards Carousel on Mobile, 5-Column Grid Row on Desktop: full width edge-to-edge */}
      <div className="w-full lg:max-w-[1720px] lg:mx-auto">
        <div
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible no-scrollbar overscroll-x-contain snap-x snap-mandatory px-0 lg:px-12 pb-3 pt-1 lg:pb-0"
        >
          {/* Desktop Left Info Tile */}
          <div className="hidden lg:flex flex-col justify-center p-6 bg-[#F8F7F2] rounded-2xl border border-slate-200 text-left">
            <h2 className="text-2xl font-medium text-[#111827] tracking-tight leading-snug">
              Our Most Popular Categories
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Arogya Path provides classical Ayurvedic solutions tailored to modern lifestyle needs.
            </p>
          </div>

          {displayCategories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`shrink-0 lg:shrink snap-start flex ${
                idx === 0 ? "pl-4 sm:pl-6 md:pl-8 lg:pl-0" : ""
              } ${
                idx === displayCategories.length - 1 ? "pr-4 sm:pr-6 md:pr-8 lg:pr-0" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => navigateToConcern(cat.slug)}
                className="group w-[185px] sm:w-[220px] md:w-[250px] lg:w-full h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0B4B39]/50 transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39] cursor-pointer touch-manipulation select-none"
              >
                {/* Image-First Card Tile (1:1 Aspect Ratio) */}
                <div className="relative aspect-square w-full bg-[#FAFAFA] overflow-hidden p-3 pointer-events-none">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 185px, 250px"
                    className="object-contain p-2"
                  />
                </div>

                {/* Label & Description Container */}
                <div className="p-3 sm:p-3.5 bg-[#F1F5F4] border-t border-slate-100 flex flex-col justify-center text-center pointer-events-none flex-1 w-full">
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#0B4B39] transition-colors truncate">
                    {cat.name}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {cat.description}
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows on Mobile/Tablet */}
        <div className="flex items-center justify-center gap-4 mt-5 lg:hidden">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-11 h-11 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39] shadow-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-11 h-11 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39] shadow-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
