"use client";

import React, { useRef } from "react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductCard } from "@/components/ui/ProductCard";

export function HairCareCollection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Authentic Hair Care formulations matching AR Ayurveda reference sequence
  const collectionProducts = [
    MOCK_PRODUCTS.find((p) => p.id === "prod-shikakai-powder")!,
    MOCK_PRODUCTS.find((p) => p.id === "prod-amla-powder")!,
    MOCK_PRODUCTS.find((p) => p.id === "prod-aritha-powder")!,
    MOCK_PRODUCTS.find((p) => p.id === "prod-onion-shampoo")!,
  ].filter(Boolean);

  return (
    <section id="hair-care" className="py-8 sm:py-12 bg-white w-full">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Centered Heading on Desktop, Left-aligned on Mobile (No arrows on larger screens) */}
        <div className="flex flex-col text-center lg:text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#111827] tracking-tight">
            Hair Care
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Formulated with Bhringraj, Amla & cold-pressed botanical oils
          </p>
        </div>

        {/* Horizontal Carousel on Mobile, 4-Column Grid on Larger Screens */}
        <div
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto lg:overflow-visible no-scrollbar scroll-smooth snap-x snap-mandatory pb-3 lg:pb-0"
        >
          {collectionProducts.map((product) => (
            <div
              key={product.id}
              className="w-[285px] sm:w-[310px] md:w-[330px] lg:w-full shrink-0 lg:shrink snap-start"
            >
              <ProductCard product={product} showRating={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
