"use client";

import React from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { MOCK_PRODUCTS } from "@/data/mock-products";

export function DealsSection() {
  // Top Discounted products matching reference
  const discountedProducts = MOCK_PRODUCTS.slice(8, 12);

  return (
    <section id="deals" className="py-8 sm:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with subtle ornament */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="h-[1px] w-8 bg-[#0B4B39]/30" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#063D2C] font-serif tracking-tight">
              Top Discounted Products
            </h2>
            <span className="h-[1px] w-8 bg-[#0B4B39]/30" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Great Ayurvedic Picks at Special Promotional Prices
          </p>
        </div>

        {/* 4 Cards Grid: 2-col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
