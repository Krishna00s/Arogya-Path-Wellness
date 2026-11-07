"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types/storefront";
import { formatRupees } from "@/lib/utils";
import { RatingStars } from "./RatingStars";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCartOnly = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0B4B39]/40 transition-all duration-200 ${
        className || ""
      }`}
    >
      {/* 1. Top Half: 1:1 Aspect-Square Photographic Container */}
      <div className="relative aspect-square w-full bg-white flex items-center justify-center overflow-hidden">
        {/* Top Badges & Wishlist Overlay */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
          <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-950 px-1.5 py-0.5 rounded shadow-2xs pointer-events-auto">
            DEMO
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted)}
            }
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-2xs flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-white shadow-2xs transition-colors pointer-events-auto"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-all ${
                isWishlisted ? "fill-rose-500 text-rose-500 scale-110" : ""
              }`}
            />
          </button>
        </div>

        {/* Product Photo */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 22vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Optional Category / Formula Pill */}
        {product.badge && (
          <span className="absolute bottom-2 left-2 text-[9px] font-bold bg-[#063D2C]/90 text-white px-2 py-0.5 rounded shadow-2xs">
            {product.badge}
          </span>
        )}
      </div>

      {/* 2. Lower Half: Cool Grey Container (#F1F5F4) */}
      <div className="bg-[#F1F5F4] p-2.5 sm:p-3 flex flex-col flex-1 justify-between gap-1.5 border-t border-slate-100">
        <div>
          {/* Title (2 lines clamp, 12px bold #111827) */}
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-tight group-hover:text-[#0B4B39] transition-colors">
            {product.name}
          </h3>

          {/* Pack Size / Subtitle */}
          <p className="text-[10.5px] font-medium text-slate-500 mt-0.5 mb-1 truncate">
            {product.packSize}
          </p>

          {/* Star Rating (5 Judge.me green stars in #0B4B39) */}
          <div className="mb-1">
            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="xs"
              color="green"
            />
          </div>

          {/* Price & Discount Row */}
          <div className="flex items-center gap-1.5 flex-wrap my-1">
            <span className="text-xs sm:text-sm font-extrabold text-slate-900">
              {formatRupees(product.price)}
            </span>
            {product.compareAtPrice > product.price && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatRupees(product.compareAtPrice)}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="text-[9px] sm:text-[10px] font-extrabold bg-[#EA580C] text-white px-1.5 py-0.5 rounded-full shadow-2xs">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* 3. Dual Action Buttons: Cart Bag Square + BUY NOW */}
        <div className="flex items-center gap-1.5 pt-1 mt-auto">
          {/* Quick Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCartOnly}
            aria-label="Add item to cart"
            className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg border border-[#0B4B39] bg-white text-[#0B4B39] hover:bg-[#0B4B39] hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-2xs"
          >
            {justAdded ? (
              <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
            ) : (
              <ShoppingBag className="w-4 h-4 stroke-[2]" />
            )}
          </button>

          {/* Buy Now Button */}
          <button
            type="button"
            onClick={handleBuyNow}
            aria-label="Buy product now"
            className="flex-1 h-8 sm:h-9 rounded-lg bg-[#0B4B39] hover:bg-[#063D2C] text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center shadow-2xs active:scale-95 transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
