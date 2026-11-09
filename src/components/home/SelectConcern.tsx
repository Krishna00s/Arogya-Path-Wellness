"use client";

import React from "react";
import Image from "next/image";
import { CONCERN_CATEGORIES } from "@/data/mock-categories";

export function SelectConcern() {
  const handleSelectConcern = (slug?: string) => {
    void slug;
    const el = document.getElementById("ayurvedic-solutions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="concern" className="py-12 sm:py-16 md:py-20 bg-white w-full">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Centered Section Heading (Enlarged and with generous spacing) */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium text-[#111827] tracking-tight">
            Select Your Concern
          </h2>
        </div>

        {/* Horizontally scrollable row on mobile with enlarged portraits; 5-column word-wrap grid on larger screens with generous spacing */}
        <div className="flex lg:grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-x-10 lg:gap-y-14 xl:gap-x-12 xl:gap-y-16 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory pb-6 pt-1 lg:pb-0 max-w-[1560px] mx-auto">
          {CONCERN_CATEGORIES.map((concern) => (
            <button
              key={concern.id}
              type="button"
              onClick={() => handleSelectConcern(concern.slug)}
              className="w-[270px] sm:w-[290px] md:w-[310px] lg:w-full shrink-0 lg:shrink snap-start flex flex-col items-center group focus:outline-none cursor-pointer"
            >
              {/* Clean Large Circular Photographic Portrait Crop (Enlarged across mobile and desktop) */}
              <div className="w-[270px] h-[270px] sm:w-[290px] sm:h-[290px] md:w-[310px] md:h-[310px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px] 2xl:w-[220px] 2xl:h-[220px] rounded-full overflow-hidden relative shadow-none border-0 bg-slate-100 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={concern.image}
                  alt={concern.label}
                  fill
                  sizes="(max-width: 640px) 290px, (max-width: 1024px) 310px, 220px"
                  className="object-cover"
                />
              </div>

              {/* Centered Typography Label (Enlarged font size and spacing) */}
              <span className="text-lg sm:text-xl lg:text-base xl:text-lg font-medium text-[#222222] text-center max-w-[250px] lg:max-w-[180px] leading-snug mt-4 sm:mt-5 group-hover:text-[#355E2B] transition-colors">
                {concern.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
