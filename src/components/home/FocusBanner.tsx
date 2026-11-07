"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Flame, Shield, Activity, Zap } from "lucide-react";

export function FocusBanner() {
  const handleBannerClick = () => {
    alert("[DEMO PROMOTION] Exploring Men's Wellness Collection. Category pages will be added in Milestone 2.");
  };

  return (
    <section className="py-6 sm:py-10 bg-[#F8F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#063D2C] via-[#0B4B39] to-[#063D2C] text-white p-5 sm:p-8 lg:p-10 shadow-sm">
          {/* Subtle Ambient Image Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 opacity-25 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
              alt="Active wellness"
              fill
              className="object-cover object-right"
            />
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold mb-2 uppercase tracking-wide">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Specialty Formulations</span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-serif leading-tight text-white mb-2">
              Men&apos;s Wellness <span className="text-amber-300">for an Active Life</span>
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/80 mb-5 leading-relaxed">
              Classical formulations infused with Grade-A Himalayan Shilajit, Safed Musli, and Ashwagandha for stamina, muscle recovery, and daily vigor.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Peak Energy</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Endurance</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Recovery</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Safe Herbs</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBannerClick}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95 uppercase tracking-wide"
            >
              <span>Shop Men&apos;s Range</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
