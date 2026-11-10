"use client";

import React from "react";
import Image from "next/image";
import { CONCERN_CATEGORIES } from "@/data/mock-categories";
import { navigateToConcern } from "@/lib/utils";

export function SelectConcern() {
  return (
    <section id="concern" className="py-12 sm:py-16 md:py-20 bg-white w-full">
      {/* Centered Section Heading (Enlarged and with generous spacing) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center mb-10 sm:mb-14 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium text-[#111827] tracking-tight">
          Select Your Concern
        </h2>
      </div>

      {/* Horizontally scrollable row on mobile with enlarged portraits: full width edge-to-edge */}
      <div className="w-full lg:max-w-[1720px] lg:mx-auto">
        <div
          className="flex lg:grid lg:grid-cols-5 gap-5 sm:gap-7 lg:gap-x-10 lg:gap-y-14 xl:gap-x-12 xl:gap-y-16 overflow-x-auto lg:overflow-visible no-scrollbar overscroll-x-contain snap-x snap-mandatory px-0 lg:px-12 pb-6 pt-1 lg:pb-0"
        >
          {CONCERN_CATEGORIES.map((concern) => (
            <button
              key={concern.id}
              type="button"
              onClick={() => navigateToConcern(concern.slug)}
              className="w-[215px] sm:w-[245px] md:w-[275px] lg:w-full shrink-0 lg:shrink snap-start flex flex-col items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39] focus-visible:ring-offset-2 rounded-2xl cursor-pointer box-content first:pl-4 sm:first:pl-6 md:first:pl-8 lg:first:pl-0 last:pr-4 sm:last:pr-6 md:last:pr-8 lg:last:pr-0 lg:box-border touch-manipulation select-none"
            >
              {/* Clean Large Circular Photographic Portrait Crop */}
              <div className="w-[215px] h-[215px] sm:w-[245px] sm:h-[245px] md:w-[275px] md:h-[275px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px] 2xl:w-[220px] 2xl:h-[220px] rounded-full overflow-hidden relative shadow-none border-0 bg-slate-100 transition-transform duration-300 group-hover:scale-105 pointer-events-none">
                <Image
                  src={concern.image}
                  alt={concern.label}
                  fill
                  sizes="(max-width: 640px) 245px, (max-width: 1024px) 275px, 220px"
                  className="object-cover"
                />
              </div>

              {/* Centered Typography Label */}
              <span className="text-base sm:text-lg lg:text-base xl:text-lg font-medium text-[#222222] text-center w-full max-w-[215px] lg:max-w-[180px] leading-snug mt-3.5 sm:mt-4 group-hover:text-[#355E2B] transition-colors pointer-events-none">
                {concern.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
