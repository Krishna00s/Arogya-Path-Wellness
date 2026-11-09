import React from "react";
import { Truck, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

const MESSAGES = [
  { text: "Cash on Delivery Available", icon: Truck },
  { text: "Ayurvedic Wellness", icon: Sparkles },
  { text: "Quality-Focused Products", icon: ShieldCheck },
  { text: "Shop With Confidence", icon: CheckCircle2 },
];

export function MovingTicker() {
  return (
    <div
      aria-label="Brand promises marquee"
      className="w-full bg-[#425848] text-white py-3.5 sm:py-4 overflow-hidden border-y border-[#536d5b] select-none"
    >
      <div className="flex w-full overflow-hidden">
        {/* Animated Track (duplicated for seamless infinite loop) */}
        <div className="animate-marquee flex items-center gap-10 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white">
          {[...MESSAGES, ...MESSAGES, ...MESSAGES, ...MESSAGES].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2.5 shrink-0">
                <Icon className="w-4.5 h-4.5 text-amber-300 shrink-0" />
                <span>{item.text}</span>
                <span className="text-amber-400 ml-8 text-base">✦</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
