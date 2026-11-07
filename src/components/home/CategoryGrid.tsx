"use client";

import React from "react";
import Image from "next/image";
import { MOCK_CATEGORIES } from "@/data/mock-categories";

export function CategoryGrid() {
  const handleCategoryClick = (catName: string) => {
    alert(`[DEMO CATEGORY] Viewing "${catName}". Category product filtering will be connected in Milestone 2.`);
  };

  return (
    <section id="categories" className="py-8 sm:py-12 bg-[#F8F7F2] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with subtle botanical ornament */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="h-[1px] w-8 bg-[#0B4B39]/30" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#063D2C] font-serif tracking-tight">
              Top Categories
            </h2>
            <span className="h-[1px] w-8 bg-[#0B4B39]/30" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Discover classical remedies curated across essential holistic wellness needs
          </p>
        </div>

        {/* 10 Categories Grid: 2-col on mobile (175x175px 1:1 square tiles), 5-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-5">
          {MOCK_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryClick(category.name)}
              className="group relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#0B4B39]/40 transition-all text-left active:scale-[0.98] focus:outline-none"
            >
              {/* Edge-to-edge 1:1 Photographic Tile */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 25vw, 18vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />

              {/* Bottom Vignette for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Overlaid Green Caption Pill Band (#0B4B39, 155x30px, r=15px) */}
              <div className="absolute bottom-2.5 left-2 right-2 flex justify-center z-10 pointer-events-none">
                <div className="w-full max-w-[160px] h-[30px] bg-[#0B4B39]/95 backdrop-blur-2xs rounded-full flex items-center justify-center px-2 shadow-sm border border-emerald-800/40 group-hover:bg-[#063D2C] transition-colors">
                  <span className="text-[11px] sm:text-xs font-bold text-white text-center truncate tracking-tight">
                    {category.name}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
