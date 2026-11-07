import React from "react";
import { Leaf, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function TrustStrip() {
  const trustItems = [
    {
      icon: Leaf,
      title: "100% Ayurvedic",
      description: "Authentic herbal ingredients",
    },
    {
      icon: ShieldCheck,
      title: "GMP Certified",
      description: "Strict quality-controlled batches",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Pan-India express dispatch",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns*",
      description: "Hassle-free 7-day verified returns",
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-3.5 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-1 rounded-xl sm:p-0"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-[#0B4B39] flex items-center justify-center shrink-0 border border-emerald-100">
                  <Icon className="w-4.5 h-4.5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-snug hidden sm:block">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
