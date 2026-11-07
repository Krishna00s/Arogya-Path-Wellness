"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";

export function PhilosophyBanner() {
  const handleExplore = () => {
    const el = document.getElementById("concern");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-6 sm:py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#063D2C] via-[#0B4B39] to-[#063D2C] text-white p-6 sm:p-10 lg:p-14 text-center shadow-xs">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&auto=format&fit=crop&q=80"
              alt="Ayurvedic herbs pattern"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 text-[11px] font-bold mb-3 uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ancient Principles • Modern Standard</span>
            </div>

            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-serif leading-tight text-white mb-3">
              Rooted in Ayurveda, Designed for Modern Wellness
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/80 mb-6 leading-relaxed max-w-xl mx-auto">
              We bridge time-tested botanical remedies with everyday convenience, delivering honest ingredients you can trust for whole-body vitality.
            </p>

            <button
              type="button"
              onClick={handleExplore}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95 uppercase tracking-wide"
            >
              <span>Explore the Range</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
