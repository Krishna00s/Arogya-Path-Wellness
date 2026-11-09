import React from "react";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#063D2C] text-white h-10 sm:h-11 md:h-12 flex items-center select-none overflow-hidden transition-all">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Mobile View: High impact bold ticker */}
        <div className="flex md:hidden w-full items-center justify-center gap-2.5 text-xs sm:text-[13px] font-bold tracking-wider text-center uppercase">
          <Truck className="w-4 h-4 text-amber-300 shrink-0" />
          <span>CASH ON DELIVERY AVAILABLE</span>
          <span className="text-amber-400 font-black">•</span>
          <span>FREE DELIVERY ABOVE ₹499</span>
        </div>

        {/* Desktop View: Full assurance strip */}
        <div className="hidden md:flex items-center justify-between w-full text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-2.5 text-white uppercase tracking-wider text-xs sm:text-[13px]">
            <Truck className="w-4 h-4 text-amber-300" />
            <span>CASH ON DELIVERY AVAILABLE</span>
            <span className="text-amber-400">◉</span>
            <span>FREE DELIVERY ON ORDERS ABOVE ₹499</span>
          </div>

          <div className="flex items-center gap-6 text-emerald-200/90 text-xs sm:text-[13px]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Authentic Ayurvedic Formulations</span>
            </div>
            <span className="text-emerald-800">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>GMP Quality Assured</span>
            </div>
          </div>

          <div className="text-[11px] uppercase font-extrabold tracking-wider bg-emerald-900/90 text-amber-300 px-3 py-1 rounded-full border border-emerald-800 shadow-2xs">
            Arogya Path
          </div>
        </div>
      </div>
    </div>
  );
}
