"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { POPULAR_CATEGORIES } from "@/data/mock-categories";

export function PopularCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (slug?: string) => {
    void slug;
    const el = document.getElementById("ayurvedic-solutions");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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

        {/* Category Cards Carousel on Mobile, 5-Column Grid Row on Desktop */}
        <div
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory pb-3 pt-1 px-1 lg:pb-0"
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

          {POPULAR_CATEGORIES.slice(0, 4).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.slug)}
              className="group w-[185px] sm:w-[220px] md:w-[250px] lg:w-full shrink-0 lg:shrink snap-start bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0B4B39]/50 transition-all text-left focus:outline-none cursor-pointer"
            >
              {/* Image-First Card Tile (1:1 Aspect Ratio) */}
              <div className="relative aspect-square w-full bg-[#FAFAFA] overflow-hidden p-3">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 185px, 250px"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Label & Description Container */}
              <div className="p-3 sm:p-3.5 bg-[#F1F5F4] border-t border-slate-100 flex flex-col justify-center text-center">
                <span className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#0B4B39] transition-colors truncate">
                  {cat.name}
                </span>
                <span className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {cat.description}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Small Previous/Next Navigation Arrows (Visible only on mobile/tablet) */}
        <div className="flex lg:hidden items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous categories"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:bg-[#0B4B39] hover:text-white transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next categories"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:bg-[#0B4B39] hover:text-white transition-colors shadow-2xs"
          >
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
