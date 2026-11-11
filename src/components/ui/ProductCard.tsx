"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types/storefront";
import { RatingStars } from "./RatingStars";
import { ProductImagePreview } from "./ProductImagePreview";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
  showRating?: boolean;
}

export function ProductCard({ product, className, showRating = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAddToCartOnly = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setJustAdded(false);
      timeoutRef.current = null;
    }, 1200);
  };

  const productHref = `/products/${product.slug}`;

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white p-2.5 sm:p-3.5 rounded-2xl border border-slate-300/80 shadow-2xs overflow-hidden ${
        className || ""
      }`}
    >
      {/* 1. Product Image: 1:1 Aspect-Square, navigates to PDP on click */}
      <Link
        href={productHref}
        aria-label={`View ${product.name}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B]"
      >
        <ProductImagePreview
          src={product.image}
          hoverSrc={product.hoverImage}
          alt={product.name}
          hoverAlt={`${product.name} alternate view`}
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 22vw"
          badge={product.badge}
          badgeClassName="bottom-2 right-2 text-[10px] sm:text-[11px] px-2 py-0.5"
          loading="lazy"
        />
      </Link>

      {/* 2. Product Info: clean sans-serif typography */}
      <div className="pt-2.5 sm:pt-3 flex flex-col flex-1 justify-between">
        <div>
          {/* Title (sans-serif, medium, clean) */}
          <Link
            href={productHref}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B] rounded-sm"
          >
            <h3 className="font-normal sm:font-medium text-xs sm:text-sm md:text-base text-[#222222] line-clamp-1 leading-snug group-hover:text-[#355E2B] transition-colors">
              {product.name} {product.subtitle ? `- ${product.subtitle}` : ""}
            </h3>
          </Link>

          {/* Star Rating: Judge.me style green stars with score & reviews (conditional) */}
          {showRating && (
            <div className="mt-1 mb-1">
              <RatingStars
                rating={product.rating ?? 4.8}
                reviewCount={product.reviewCount ?? 278}
                size="xs"
                color="green"
                showScore={true}
              />
            </div>
          )}

          {/* Price & MRP Strikethrough (no percentage badge) */}
          <div className="flex items-center gap-2 flex-wrap my-1">
            <span className="text-sm sm:text-base md:text-lg font-bold text-[#111827]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.compareAtPrice > product.price && (
              <span className="text-[11px] sm:text-xs text-slate-500 line-through font-normal">
                Rs. {product.compareAtPrice.toLocaleString("en-IN")}.00
              </span>
            )}
          </div>
        </div>

        {/* 3. Action Buttons: Square Cart Icon Button + Wide Green BUY NOW Button (with rounded-lg border radius) */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2.5 w-full">
          <button
            type="button"
            onClick={handleAddToCartOnly}
            aria-label="Add item to cart"
            className="h-10 sm:h-11 w-10 sm:w-12 bg-[#222222] hover:bg-[#3d3d3d] hover:brightness-110 text-white flex items-center justify-center shrink-0 rounded-lg transition-colors active:scale-95 shadow-2xs cursor-pointer touch-manipulation"
          >
            {justAdded ? (
              <Check className="w-4.5 h-4.5 text-emerald-400 stroke-[2.5]" />
            ) : (
              <ShoppingCart className="w-4.5 h-4.5 text-white stroke-[2]" />
            )}
          </button>

          <Link
            href={productHref}
            aria-label={`Buy ${product.name}`}
            className="flex-1 h-10 sm:h-11 bg-[#355E2B] hover:bg-[#437837] hover:brightness-110 text-white font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center rounded-lg transition-colors active:scale-98 shadow-2xs cursor-pointer touch-manipulation"
          >
            BUY NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
