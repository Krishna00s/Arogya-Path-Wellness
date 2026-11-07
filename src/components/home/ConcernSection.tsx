"use client";

import React, { useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { CONCERN_OPTIONS } from "@/data/mock-categories";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { Product } from "@/types/storefront";

export function ConcernSection() {
  const [activeConcern, setActiveConcern] = useState<Product["concern"]>("all");

  const filteredProducts =
    activeConcern === "all"
      ? MOCK_PRODUCTS.slice(0, 8)
      : MOCK_PRODUCTS.filter((p) => p.concern === activeConcern);

  return (
    <section id="concern" className="py-8 sm:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with subtle leaf ornament */}
        <div className="text-center mb-5 sm:mb-7">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="h-[1px] w-8 bg-[#0B4B39]/30" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#063D2C] font-serif tracking-tight">
              Shop By Concern
            </h2>
            <span className="h-[1px] w-8 bg-[#0B4B39]/30" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Targeted Ayurvedic Care for Your Specific Health Goals
          </p>
        </div>

        {/* Concern Filter Tabs: Clean text tabs with active green underline matching AR Ayurveda */}
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar border-b border-slate-200/80 mb-6 sm:mb-8 px-2">
          {CONCERN_OPTIONS.map((tab) => {
            const isActive = activeConcern === tab.concernKey;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveConcern(tab.concernKey)}
                className={`pb-2.5 text-xs sm:text-sm whitespace-nowrap transition-all select-none border-b-2 font-bold ${
                  isActive
                    ? "border-[#0B4B39] text-[#0B4B39]"
                    : "border-transparent text-slate-500 hover:text-[#0B4B39] hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid: 2-col on mobile (172x380px cards), 3-col on md, 4-col on lg */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
