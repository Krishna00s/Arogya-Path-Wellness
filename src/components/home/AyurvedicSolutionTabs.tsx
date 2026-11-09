"use client";

import React, { useState } from "react";
import { AYURVEDIC_SOLUTION_TABS, SolutionTab } from "@/data/mock-categories";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductCard } from "@/components/ui/ProductCard";

export function AyurvedicSolutionTabs() {
  const [activeTab, setActiveTab] = useState<SolutionTab>(AYURVEDIC_SOLUTION_TABS[0]);

  // Filter products by active concern tab
  const filteredProducts = MOCK_PRODUCTS.filter(
    (product) => product.concern === activeTab.concernKey
  );

  // If a tab has fewer than 2 products, fallback to showing additional relevant products
  const displayProducts =
    filteredProducts.length > 0
      ? filteredProducts
      : MOCK_PRODUCTS.slice(0, 4);

  return (
    <section
      id="ayurvedic-solutions"
      className="py-9 sm:py-14 bg-white w-full"
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#111827] tracking-tight">
            Ayurvedic Solution
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
            Find Solutions Tailored to Unique Needs
          </p>
        </div>

        {/* Text Tabs with Active Underline */}
        <div className="border-b border-slate-200 mb-6 sm:mb-8">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-6 sm:gap-10 px-1">
            {AYURVEDIC_SOLUTION_TABS.map((tab) => {
              const isActive = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 sm:pb-4 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors touch-target-44 ${
                    isActive
                      ? "text-[#355E2B] font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#355E2B] transition-all duration-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Mobile Product Grid (2 cols mobile, 3 tablet, 4 desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
