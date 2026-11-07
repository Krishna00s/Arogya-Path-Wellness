import React from "react";
import { Sparkles, ShieldCheck, RefreshCw } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#063D2C] text-white text-xs h-9 md:h-[38px] flex items-center border-b border-emerald-950/60 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 w-full flex items-center justify-between">
        {/* Mobile View: High impact ticker matching AR Ayurveda reference */}
        <div className="flex md:hidden w-full items-center justify-center gap-1.5 text-[11px] font-semibold tracking-wider text-center uppercase">
          <span className="text-amber-400">◉</span>
          <span>FLAT 10% OFF ON ALL PREPAID ORDERS</span>
          <span className="text-amber-400">◉</span>
          <span>FREE DELIVERY</span>
        </div>

        {/* Desktop View: Full assurance strip with verified density */}
        <div className="hidden md:flex items-center justify-between w-full text-xs font-semibold">
          <div className="flex items-center gap-2 text-white uppercase tracking-wider text-[11px]">
            <span className="text-amber-400">◉</span>
            <span>FLAT 10% OFF ON ALL PREPAID ORDERS</span>
            <span className="text-amber-400">◉</span>
            <span>FREE DELIVERY ON ALL ORDERS</span>
          </div>

          <div className="flex items-center gap-5 text-emerald-200/90 text-[11px]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Authentic Ayurvedic Formulations</span>
            </div>
            <span className="text-emerald-800">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>GMP Certified</span>
            </div>
            <span className="text-emerald-800">•</span>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
              <span>Cash on Delivery</span>
            </div>
          </div>

          <div className="text-[10px] uppercase font-bold tracking-wider bg-emerald-900/80 text-amber-300 px-2.5 py-0.5 rounded-full border border-emerald-800">
            DEMO PREVIEW
          </div>
        </div>
      </div>
    </div>
  );
}
