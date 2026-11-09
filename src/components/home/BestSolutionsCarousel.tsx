"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { useCart } from "@/context/CartContext";
import { RatingStars } from "@/components/ui/RatingStars";

export function BestSolutionsCarousel() {
  const { addToCart, setIsCartOpen } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 8 Best solution products for desktop 4x2 grid and mobile swipe, starting with Testo Booster Tablets
  const bestProducts = [
    MOCK_PRODUCTS.find((p) => p.id === "prod-testo-booster")!,
    MOCK_PRODUCTS.find((p) => p.id === "prod-digest-zen")!,
    MOCK_PRODUCTS.find((p) => p.id === "prod-immuno-plus")!,
    MOCK_PRODUCTS.find((p) => p.id === "prod-kesh-oil")!,
    MOCK_PRODUCTS.find((p) => p.id === "prod-hair-vital-tabs")!,
    MOCK_PRODUCTS.find((p) => p.id === "prod-weight-gain-lehyam")!,
    MOCK_PRODUCTS.find((p) => p.id === "prod-joint-ease")!,
    MOCK_PRODUCTS.find((p) => p.id === "prod-shilajit-resin")!,
  ].filter(Boolean);

  const handleAddToCart = (e: React.MouseEvent, product: (typeof bestProducts)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent, product: (typeof bestProducts)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <section id="best-solutions" className="py-9 sm:py-14 bg-white w-full">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Heading Centered on the middle of its width (No arrows on larger screen per user request) */}
        <div className="relative text-center mb-6 sm:mb-9">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#111827] tracking-tight">
            I&apos;m looking for the Best Solution
          </h2>
        </div>

        {/* Horizontal Carousel on Mobile / Tablet, Responsive 4-Column Word Wrap Grid on Larger Screens */}
        <div
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7 lg:gap-8 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory pb-4 pt-1 lg:pb-0"
        >
          {bestProducts.map((product) => (
            <div
              key={product.id}
              className="w-[315px] sm:w-[350px] md:w-[380px] lg:w-full shrink-0 lg:shrink snap-start bg-transparent border-0 shadow-none flex flex-col justify-between"
            >
              {/* Product Image: 1:1 Aspect Ratio with more width and height, seamless white background */}
              <div className="relative aspect-square w-full bg-white overflow-hidden rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 315px, 380px"
                  className="object-contain"
                />

                {/* Optional corner campaign pill badge */}
                {product.badge && (
                  <span className="absolute bottom-3 right-3 text-xs font-bold bg-[#C93B3B] text-white px-3 py-0.5 rounded-full shadow-2xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info: Increased typography font sizes */}
              <div className="pt-3.5 flex flex-col flex-1 justify-between">
                <div>
                  {/* Product Title: Increased font size */}
                  <h3 className="font-medium text-base sm:text-lg md:text-xl text-[#222222] line-clamp-1 leading-snug">
                    {product.name} {product.subtitle ? `- ${product.subtitle}` : ""}
                  </h3>

                  {/* Rating: Deep green stars with score & reviews */}
                  <div className="mt-2 mb-2">
                    <RatingStars
                      rating={product.rating ?? 4.8}
                      reviewCount={product.reviewCount ?? 278}
                      size="sm"
                      color="green"
                      showScore={true}
                    />
                  </div>

                  {/* Price Row: Increased font sizes */}
                  <div className="flex items-center gap-2.5 flex-wrap my-2">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111827]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.compareAtPrice > product.price && (
                      <span className="text-sm sm:text-base text-slate-500 line-through font-normal">
                        Rs. {product.compareAtPrice.toLocaleString("en-IN")}.00
                      </span>
                    )}
                  </div>
                </div>

                {/* Dual Action Buttons: Increased height and with border-radius (rounded-lg) */}
                <div className="flex items-center gap-2.5 mt-3.5 w-full">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                    aria-label="Add to cart"
                    className="h-11 sm:h-12 w-12 sm:w-13 bg-[#222222] hover:bg-black text-white flex items-center justify-center shrink-0 rounded-lg transition-colors active:scale-95 shadow-2xs cursor-pointer"
                  >
                    <ShoppingCart className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white stroke-[2]" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleBuyNow(e, product)}
                    aria-label="Buy now"
                    className="flex-1 h-11 sm:h-12 bg-[#355E2B] hover:bg-[#2C4E24] text-white font-bold text-sm sm:text-base tracking-wider uppercase flex items-center justify-center rounded-lg transition-colors active:scale-98 shadow-2xs cursor-pointer"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
