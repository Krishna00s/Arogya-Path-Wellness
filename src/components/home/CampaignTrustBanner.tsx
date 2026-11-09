"use client";

import React from "react";
import { ShieldCheck, Sparkles, Leaf, Award, ArrowRight } from "lucide-react";

export function CampaignTrustBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#063D2C] via-[#0B4B39] to-[#042A1E] text-white py-14 sm:py-20 my-4 sm:my-6">
      {/* Subtle background decorative shapes */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-300/10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto">
          {/* Brand Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/70 border border-emerald-600/50 text-xs sm:text-sm font-extrabold text-emerald-300 uppercase tracking-widest mb-4 shadow-sm">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>The Path Of Wellness</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight leading-tight text-white">
            Wellness Rooted in Ayurveda,{" "}
            <span className="text-emerald-300">Crafted for You</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
            Every Arogya Path formulation is prepared using authentic classical herbs, rigorous purity standards, and traditional decoction methods for holistic, everyday well-being.
          </p>

          {/* Trust Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mt-8 sm:mt-10 pt-8 border-t border-emerald-800/60">
            <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 shadow-xs">
              <ShieldCheck className="w-7 h-7 text-amber-300 mb-2" />
              <span className="text-base sm:text-lg md:text-xl font-black text-white">GMP Assured</span>
              <span className="text-xs sm:text-sm text-emerald-200/80 mt-0.5">Certified Facility</span>
            </div>

            <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 shadow-xs">
              <Leaf className="w-7 h-7 text-emerald-300 mb-2" />
              <span className="text-base sm:text-lg md:text-xl font-black text-white">100% Herbal</span>
              <span className="text-xs sm:text-sm text-emerald-200/80 mt-0.5">Pure Active Herbs</span>
            </div>

            <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 shadow-xs">
              <Sparkles className="w-7 h-7 text-emerald-400 mb-2" />
              <span className="text-base sm:text-lg md:text-xl font-black text-white">Zero Fillers</span>
              <span className="text-xs sm:text-sm text-emerald-200/80 mt-0.5">No Artificial Flavors</span>
            </div>

            <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 shadow-xs">
              <Award className="w-7 h-7 text-amber-400 mb-2" />
              <span className="text-base sm:text-lg md:text-xl font-black text-white">Ayush Standard</span>
              <span className="text-xs sm:text-sm text-emerald-200/80 mt-0.5">Compliant Process</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#ayurvedic-solutions"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-black px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transition-all active:scale-95 touch-target-44"
            >
              <span>Explore All Formulations</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Demo Note */}
          <p className="text-xs text-emerald-300/70 mt-5 italic">
            [DEMO NOTICE: All product descriptions and metrics are for storefront demonstration only.]
          </p>
        </div>
      </div>
    </section>
  );
}
