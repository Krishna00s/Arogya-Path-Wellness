"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getAvailableProducts } from "@/data/mock-products";
import { useCart } from "@/context/CartContext";
import { RatingStars } from "@/components/ui/RatingStars";
import { ProductImagePreview } from "@/components/ui/ProductImagePreview";

export function BestSolutionsCarousel() {
  const { addToCart } = useCart();

  // Active storefront catalog filtered via centralized storefrontConfig & product status
  const bestProducts = getAvailableProducts();

  if (bestProducts.length === 0) {
    return null;
  }

  const handleAddToCart = (e: React.MouseEvent, product: (typeof bestProducts)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Single-product balanced presentation when only one active product is configured
  if (bestProducts.length === 1) {
    const product = bestProducts[0];
    const savings = Math.max(0, product.compareAtPrice - product.price);
    const computedDiscount =
      product.compareAtPrice > product.price
        ? Math.round((savings / product.compareAtPrice) * 100)
        : 0;

    return (
      <section id="best-solutions" className="py-9 sm:py-14 bg-white w-full">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="relative text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#111827] tracking-tight">
              I&apos;m looking for the Best Solution
            </h2>
          </div>

          <div className="max-w-md md:max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-10 lg:gap-12 items-center bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-300/80 shadow-xs">
              {/* Product Image: navigates to PDP on click; preserves image-only hover/touch preview */}
              <Link
                href={`/products/${product.slug}`}
                aria-label={`View ${product.name}`}
                className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B]"
              >
                <ProductImagePreview
                  src={product.image}
                  hoverSrc={product.hoverImage}
                  alt={product.brand ? `${product.brand} ${product.name} - ${product.packSize}` : product.name}
                  hoverAlt={`${product.name} alternate view`}
                  sizes="(max-width: 768px) 92vw, 420px"
                  badge={product.badge}
                  containerClassName="rounded-xl border border-slate-100"
                />
              </Link>

              {/* Product Details & CTAs */}
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.brand && (
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#355E2B]">
                        {product.brand}
                      </span>
                    )}
                    {product.brand && product.packSize && (
                      <span className="text-slate-300" aria-hidden="true">
                        •
                      </span>
                    )}
                    {product.packSize && (
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 bg-[#F1F5F4] px-2.5 py-0.5 rounded-full border border-slate-200">
                        {product.packSize}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B] rounded-md"
                  >
                    <h3 className="font-semibold text-2xl sm:text-3xl text-[#111827] group-hover:text-[#355E2B] transition-colors leading-tight">
                      {product.name}
                    </h3>
                  </Link>

                  {product.rating !== undefined && (
                    <div className="pt-0.5">
                      <RatingStars
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        size="sm"
                        color="green"
                        showScore={true}
                      />
                    </div>
                  )}

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Price & Discount */}
                <div className="pt-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.compareAtPrice > product.price && (
                      <span className="text-sm sm:text-base text-slate-500 line-through font-normal">
                        Rs. {product.compareAtPrice.toLocaleString("en-IN")}.00
                      </span>
                    )}
                    {computedDiscount > 0 && (
                      <span className="text-xs sm:text-sm font-bold text-[#355E2B] bg-[#EBF3ED] px-2.5 py-0.5 rounded-full">
                        Save ₹{savings.toLocaleString("en-IN")} ({computedDiscount}% off)
                      </span>
                    )}
                  </div>
                </div>

                {/* Dual Action Buttons */}
                <div className="flex items-center gap-2.5 pt-2 w-full">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                    aria-label="Add to cart"
                    className="h-11 sm:h-12 w-12 sm:w-14 bg-[#222222] hover:bg-[#3d3d3d] hover:brightness-110 text-white flex items-center justify-center shrink-0 rounded-lg transition-colors active:scale-95 shadow-2xs cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] focus-visible:ring-offset-1"
                  >
                    <ShoppingCart className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white stroke-[2]" />
                  </button>

                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`Buy ${product.name}`}
                    className="flex-1 h-11 sm:h-12 bg-[#355E2B] hover:bg-[#437837] hover:brightness-110 text-white font-bold text-sm sm:text-base tracking-wider uppercase flex items-center justify-center rounded-lg transition-colors active:scale-98 shadow-2xs cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B] focus-visible:ring-offset-1"
                  >
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="best-solutions" className="py-9 sm:py-14 bg-white w-full">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Heading Centered on the middle of its width (No arrows on larger screen per user request) */}
        <div className="relative text-center mb-6 sm:mb-9">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#111827] tracking-tight">
            I&apos;m looking for the Best Solution
          </h2>
        </div>
      </div>

      {/* Horizontal Carousel on Mobile / Tablet, Responsive 4-Column Word Wrap Grid on Larger Screens: full width edge-to-edge */}
      <div className="w-full lg:max-w-[1720px] lg:mx-auto">
        <div
          className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7 lg:gap-8 overflow-x-auto lg:overflow-visible no-scrollbar overscroll-x-contain snap-x snap-mandatory px-0 lg:px-12 pb-4 pt-1 lg:pb-0"
        >
          {bestProducts.map((product, idx) => (
            <div
              key={product.id}
              className={`w-[285px] sm:w-[325px] md:w-[360px] lg:w-full shrink-0 lg:shrink snap-start box-content lg:box-border ${
                idx === 0 ? "pl-4 sm:pl-6 md:pl-8 lg:pl-0" : ""
              } ${
                idx === bestProducts.length - 1 ? "pr-4 sm:pr-6 md:pr-8 lg:pr-0" : ""
              }`}
            >
              <div className="h-full bg-white p-3 sm:p-4 rounded-2xl border border-slate-300/80 shadow-2xs flex flex-col justify-between">
                {/* Product Image: 1:1 Aspect Ratio with image-scoped hover/touch swap (no scaling) */}
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B]"
                >
                  <ProductImagePreview
                    src={product.image}
                    hoverSrc={product.hoverImage}
                    alt={product.name}
                    hoverAlt={`${product.name} alternate view`}
                    sizes="(max-width: 640px) 315px, 380px"
                    badge={product.badge}
                    containerClassName="rounded-xl"
                  />
                </Link>

                {/* Product Info: Increased typography font sizes */}
                <div className="pt-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Product Title: Increased font size */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B] rounded-md"
                    >
                      <h3 className="font-medium text-base sm:text-lg md:text-xl text-[#222222] group-hover:text-[#355E2B] transition-colors line-clamp-1 leading-snug">
                        {product.name} {product.subtitle ? `- ${product.subtitle}` : ""}
                      </h3>
                    </Link>

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
                      className="h-11 sm:h-12 w-12 sm:w-13 bg-[#222222] hover:bg-[#3d3d3d] hover:brightness-110 text-white flex items-center justify-center shrink-0 rounded-lg transition-colors active:scale-95 shadow-2xs cursor-pointer touch-manipulation"
                    >
                      <ShoppingCart className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white stroke-[2]" />
                    </button>

                    <Link
                      href={`/products/${product.slug}`}
                      aria-label={`Buy ${product.name}`}
                      className="flex-1 h-11 sm:h-12 bg-[#355E2B] hover:bg-[#437837] hover:brightness-110 text-white font-bold text-sm sm:text-base tracking-wider uppercase flex items-center justify-center rounded-lg transition-colors active:scale-98 shadow-2xs cursor-pointer touch-manipulation"
                    >
                      BUY NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
