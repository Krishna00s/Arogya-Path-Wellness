"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function PromoSplitBanners() {
  const handlePromoClick = (rangeName: string) => {
    alert(`[DEMO PROMOTION] Exploring "${rangeName}". Filtered catalog will be available in Milestone 2.`);
  };

  return (
    <section className="py-6 sm:py-10 bg-[#F8F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
          {/* Banner 1: Immunity */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#063D2C] to-[#0B4B39] text-white p-5 sm:p-7 flex flex-col justify-between shadow-xs min-h-[200px]">
            <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-30 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80"
                alt="Herbal ingredients"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="relative z-10 max-w-xs">
              <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-300 mb-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Daily Natural Defense</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold font-serif leading-tight text-white mb-2">
                Stronger Immunity Naturally
              </h3>
              <p className="text-xs text-emerald-100/80 mb-4 leading-relaxed">
                Authentic Giloy, Tulsi, and Chyawanprash support for you and your family.
              </p>
            </div>
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handlePromoClick("Immunity Range")}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#063D2C] font-extrabold text-xs hover:bg-emerald-50 transition-colors shadow-xs active:scale-95"
              >
                <span>Explore Immunity Range</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Banner 2: Digestion */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#78350F] to-[#92400E] text-white p-5 sm:p-7 flex flex-col justify-between shadow-xs min-h-[200px]">
            <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-30 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80"
                alt="Ayurvedic herbs for gut"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="relative z-10 max-w-xs">
              <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-200 mb-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Gentle Gut Detox</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold font-serif leading-tight text-white mb-2">
                Healthy Digestion, Happier You
              </h3>
              <p className="text-xs text-amber-100/80 mb-4 leading-relaxed">
                Classical Triphala and Haritaki formulations for gentle, regular digestive wellness.
              </p>
            </div>
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handlePromoClick("Digestive Care Range")}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#78350F] font-extrabold text-xs hover:bg-amber-50 transition-colors shadow-xs active:scale-95"
              >
                <span>Shop Digestive Care</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
