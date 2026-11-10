"use client";

import React, { useState, useEffect } from "react";
import { AYURVEDIC_SOLUTION_TABS, SolutionTab } from "@/data/mock-categories";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductCard } from "@/components/ui/ProductCard";

const SLUG_TO_CONCERN_KEY: Record<string, SolutionTab["concernKey"]> = {
  "mens-wellness": "mens-wellness",
  "weight-gain": "weight-gain",
  "weight-management": "weight-gain",
  immunity: "immunity",
  "immunity-booster": "immunity",
  "hair-care": "hair-care",
  hair: "hair-care",
  "digestive-wellness": "digestion",
  digestion: "digestion",
};

export function AyurvedicSolutionTabs() {
  const [activeTab, setActiveTab] = useState<SolutionTab>(AYURVEDIC_SOLUTION_TABS[0]);

  // Listen for tab switch events from SelectConcern, PopularCategories, or navigation controls
  useEffect(() => {
    const handleCustomTab = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug?: string }>;
      const slug = customEvent.detail?.slug;
      if (!slug) return;

      const key = SLUG_TO_CONCERN_KEY[slug] ?? slug;
      const matched = AYURVEDIC_SOLUTION_TABS.find((t) => t.concernKey === key);
      if (matched) {
        setActiveTab(matched);
      }
    };

    window.addEventListener("switch-concern-tab", handleCustomTab);
    return () => {
      window.removeEventListener("switch-concern-tab", handleCustomTab);
    };
  }, []);

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
          <div
            role="tablist"
            aria-label="Health concerns"
            className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar overscroll-x-contain gap-6 sm:gap-10 px-1"
          >
            {AYURVEDIC_SOLUTION_TABS.map((tab) => {
              const isActive = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`relative min-h-[44px] inline-flex items-center pb-3 sm:pb-4 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors cursor-pointer focus:outline-none focus-visible:text-[#355E2B] ${
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

        {/* Product Grid Centered: Cards on middle of their width */}
        <div className="flex flex-wrap items-stretch justify-center gap-4 sm:gap-6 max-w-[1440px] mx-auto">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="w-[calc(50%-8px)] sm:w-[calc(50%-12px)] md:w-[270px] lg:w-[290px] shrink-0 flex flex-col justify-between"
            >
              <ProductCard product={product} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
