"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FlaskConical,
  HelpCircle,
  Images,
  Leaf,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Zap,
} from "lucide-react";
import { Product, ProductVariant } from "@/types/storefront";
import { ProductDetailContent } from "@/data/product-detail-content";
import { useCart } from "@/context/CartContext";
import { formatRupees } from "@/lib/utils";
import {
  buildTestoBoosterVariants,
  calculatePackPricing,
  PAISE_PER_RUPEE,
} from "@/lib/pricing";
import { ProductGallery } from "./ProductGallery";
import { ProductMediaVideos } from "./ProductMediaVideos";
import {
  ProductReviewsSection,
  VerifiedRatingSummaryBadge,
} from "./ProductReviewsSection";
import { ProductActivityIndicator } from "./ProductActivityIndicator";

interface ProductDetailViewProps {
  product: Product;
  content: ProductDetailContent;
}

const FALLBACK_VARIANTS: ProductVariant[] = buildTestoBoosterVariants();

function renderPillarIcon(icon: "truck" | "shield" | "package" | "leaf") {
  switch (icon) {
    case "truck":
      return <Truck className="w-4.5 h-4.5 text-[#355E2B]" />;
    case "shield":
      return <ShieldCheck className="w-4.5 h-4.5 text-[#355E2B]" />;
    case "package":
      return <Package className="w-4.5 h-4.5 text-[#355E2B]" />;
    case "leaf":
      return <Leaf className="w-4.5 h-4.5 text-[#355E2B]" />;
  }
}

function renderHighlightIcon(
  icon: "package" | "leaf" | "shield" | "truck" | "zap" | "flask"
) {
  switch (icon) {
    case "package":
      return <Package className="w-4 h-4 text-[#355E2B]" />;
    case "leaf":
      return <Leaf className="w-4 h-4 text-[#355E2B]" />;
    case "shield":
      return <ShieldCheck className="w-4 h-4 text-[#355E2B]" />;
    case "truck":
      return <Truck className="w-4 h-4 text-[#355E2B]" />;
    case "zap":
      return <Zap className="w-4 h-4 text-[#355E2B]" />;
    case "flask":
      return <FlaskConical className="w-4 h-4 text-[#355E2B]" />;
  }
}

export function ProductDetailView({
  product,
  content,
}: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const variants =
    product.variants && product.variants.length > 0
      ? product.variants
      : FALLBACK_VARIANTS;

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants[0].id
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    content.faqs[0]?.id ?? null
  );
  const [cartFeedback, setCartFeedback] = useState<string | null>(null);

  const selectedVariant =
    variants.find((v) => v.id === selectedVariantId) ?? variants[0];

  const totalSelectedBottles = Math.max(1, selectedVariant.bottles * quantity);
  const totalSelectedCapsules = totalSelectedBottles * 30;
  const activeTierPricing = calculatePackPricing(
    totalSelectedBottles,
    undefined,
    product.price * PAISE_PER_RUPEE,
    product.compareAtPrice > product.price
      ? product.compareAtPrice * PAISE_PER_RUPEE
      : undefined
  );

  const displayedPrice = activeTierPricing.finalPriceRupees;
  const displayedMrpTotal = activeTierPricing.mrpTotalRupees;
  const displayedBaseTotal = activeTierPricing.baseTotalRupees;
  const displayedOverallDiscountPercent =
    activeTierPricing.overallDiscountPercent;
  const displayedExtraDiscountPercent =
    activeTierPricing.extraBundleDiscountPercent;
  const displayedTotalSavings = activeTierPricing.savingsRupees;
  const displayedBundleSavings = activeTierPricing.bundleSavingsRupees;
  const displayedPerBottle = activeTierPricing.perBottleRupees;

  const handleAddVariantToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setCartFeedback(
      `Added ${quantity} × ${selectedVariant.label} (${totalSelectedBottles} ${
        totalSelectedBottles === 1 ? "bottle" : "bottles"
      } • ${formatRupees(displayedPrice)}) to cart.`
    );
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    router.push("/cart");
  };

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const squareVisuals = content.visualShowcases.filter(
    (v) => v.aspect === "square"
  );
  const portraitVisuals = content.visualShowcases.filter(
    (v) => v.aspect === "portrait"
  );

  return (
    <div className="flex flex-col w-full bg-white overflow-x-clip pb-24 lg:pb-10">
      {/* Main Product Section: Gallery + Tight Flipkart-Inspired Merchandising Column */}
      <section className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 pt-3 sm:pt-6 pb-5 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductGallery
              slides={content.gallerySlides}
              productName={product.name}
              badge={product.badge}
            />
          </div>

          {/* Purchase & Merchandising Column */}
          <div className="lg:col-span-6 space-y-4">
            {/* 1. Product Identity */}
            <div className="space-y-1.5">
              {/* Time-Aware Activity Indicator (matching reference layout above product heading) */}
              <ProductActivityIndicator
                productId={product.id}
                className="pb-0.5"
              />

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#355E2B] bg-[#EBF3ED] px-2.5 py-0.5 rounded-md">
                  {content.categoryLabel}
                </span>
                {product.brand && (
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-3xl font-bold text-[#111827] tracking-tight leading-snug">
                {product.name}
              </h1>

              <p className="text-[13px] sm:text-base font-medium text-slate-700 leading-snug">
                {content.shortTagline} ({totalSelectedBottles}{" "}
                {totalSelectedBottles === 1 ? "Bottle" : "Bottles"} •{" "}
                {totalSelectedCapsules} Veg Capsules)
              </p>

              {/* 2. Conditional Ratings Bar (hidden cleanly until genuine review data exists) */}
              <VerifiedRatingSummaryBadge reviewsData={content.verifiedReviews} />
            </div>

            {/* 3. Price Hierarchy & Verified Savings Breakdown */}
            <div
              data-testid="pdp-price-box"
              className="py-2.5 px-3.5 sm:px-4 rounded-2xl bg-[#F6FAF7] border border-[#D5E8DB] space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span
                    data-testid="pdp-selling-price"
                    className="text-3xl sm:text-4xl font-black text-[#0E4B38] tracking-tight leading-none"
                  >
                    {formatRupees(displayedPrice)}
                  </span>

                  {displayedMrpTotal > displayedPrice && (
                    <span
                      data-testid="pdp-mrp-strikethrough"
                      className="text-sm sm:text-base text-slate-400 line-through font-bold"
                    >
                      MRP {formatRupees(displayedMrpTotal)}
                      {totalSelectedBottles > 1 ? ` (${totalSelectedBottles} × ₹1,499)` : ""}
                    </span>
                  )}

                  {displayedOverallDiscountPercent > 0 && (
                    <span
                      data-testid="pdp-discount-badge"
                      className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wide bg-[#E9F4EE] text-[#0E4B38] border border-[#C6E2D0] px-2.5 py-0.5 rounded-md"
                    >
                      {displayedOverallDiscountPercent}% OFF
                    </span>
                  )}
                </div>

                <span
                  data-testid="pdp-savings-text"
                  className="text-xs sm:text-sm font-black text-[#0E4B38]"
                >
                  Save {formatRupees(displayedTotalSavings)} vs MRP
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs text-slate-600 font-medium">
                <span data-testid="pdp-per-bottle" className="font-bold text-slate-800">
                  {formatRupees(displayedPerBottle)} / bottle
                </span>
                <span data-testid="pdp-tax-note" className="text-[11px] text-slate-500">
                  MRP &amp; selling price inclusive of all applicable taxes
                </span>
              </div>

              {displayedExtraDiscountPercent > 0 && (
                <p
                  data-testid="pdp-extra-bundle-note"
                  className="text-xs sm:text-[13px] font-bold text-[#8B1A1A] pt-0.5"
                >
                  Extra {displayedExtraDiscountPercent}% bundle discount applied
                  {" "}(saves extra {formatRupees(displayedBundleSavings)} on{" "}
                  {formatRupees(displayedBaseTotal)} base price)
                </p>
              )}
            </div>

            {/* Online Payment / Best Price Banner (exact match to reference image) */}
            <div className="rounded-2xl bg-[#E9F4EE] border border-[#CDE5D6] p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0E4B38] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-black text-[#0E4B38] leading-tight">
                    Just for Online Payments!
                  </p>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#185340] mt-0.5">
                    Pay Online and Get it for just
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-dashed border-[#0E4B38] rounded-2xl px-3 sm:px-4 py-1.5 text-center shrink-0 shadow-2xs">
                <span className="block text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#0E4B38]">
                  BEST PRICE
                </span>
                <span className="block text-base sm:text-xl font-black text-[#0E4B38] leading-tight mt-0.5">
                  {formatRupees(activeTierPricing.onlinePriceRupees)}
                </span>
              </div>
            </div>

            {/* 4. Choose Your Pack (Two Rows Matching Reference Image) */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
                  Choose Your Pack
                </span>
                <span
                  data-testid="pdp-selected-pack"
                  className="text-xs font-bold text-[#0E4B38]"
                >
                  {quantity > 1 ? `${quantity} × ` : ""}
                  {selectedVariant.label} • {totalSelectedCapsules} Caps
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label="Pack variant options"
                className="space-y-3.5"
              >
                {/* Row 1: Pack of 1 & Pack of 2 (2 Columns Side by Side) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                  {variants.slice(0, 2).map((variant) => {
                    const isSelected = variant.id === selectedVariant.id;
                    const vPrice = variant.price ?? product.price;
                    const vMrp =
                      variant.compareAtPrice ??
                      product.compareAtPrice * Math.max(1, variant.bottles);
                    const vSavings = Math.max(0, vMrp - vPrice);
                    const vOnlinePrice =
                      variant.onlinePriceRupees ??
                      Math.max(0, vPrice - Math.round((vPrice * 5) / 100));
                    const isPackTwo = variant.bottles === 2;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        data-variant-id={variant.id}
                        onClick={() => {
                          setSelectedVariantId(variant.id);
                          setCartFeedback(null);
                        }}
                        className={`relative flex flex-col justify-between rounded-3xl p-3.5 sm:p-4 text-center transition-all cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4B38] ${
                          isSelected
                            ? "bg-[#0E4B38] text-white border-2 border-[#0E4B38] shadow-md ring-2 ring-[#0E4B38]/20"
                            : "bg-white text-slate-900 border border-slate-300 hover:border-[#0E4B38] shadow-2xs"
                        }`}
                      >
                        {/* Top Badge: MOST POPULAR on Pack of 2 */}
                        {isPackTwo && (
                          <span
                            className={`absolute -top-3 left-1/2 -translate-x-1/2 font-black text-[10px] sm:text-xs uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs whitespace-nowrap z-10 ${
                              isSelected
                                ? "bg-[#A2D5AB] text-[#0E4B38]"
                                : "bg-[#A2D5AB] text-[#0E4B38]"
                            }`}
                          >
                            MOST POPULAR
                          </span>
                        )}

                        {/* Top Right Radio Indicator */}
                        <div
                          className={`w-5 h-5 rounded-full absolute top-3 right-3 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-white shadow-2xs"
                              : "border-2 border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#0E4B38]" />
                          )}
                        </div>

                        {/* Card Main Info */}
                        <div className="pt-1.5 pb-1">
                          <p
                            className={`text-sm sm:text-base font-extrabold leading-tight ${
                              isSelected ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {variant.bottles === 1
                              ? "30 Veg Capsules"
                              : "60 Veg Capsules"}
                          </p>

                          <div className="mt-1 leading-none">
                            <span
                              className={`text-2xl sm:text-3xl font-black tracking-tight ${
                                isSelected ? "text-white" : "text-slate-900"
                              }`}
                            >
                              {formatRupees(vPrice)}
                            </span>
                          </div>

                          {vMrp > vPrice && (
                            <div className="mt-1 leading-none">
                              <span
                                className={`text-xs sm:text-sm font-semibold line-through ${
                                  isSelected
                                    ? "text-[#A2D5AB]"
                                    : "text-slate-400"
                                }`}
                              >
                                {formatRupees(vMrp)}
                              </span>
                            </div>
                          )}

                          <p
                            className={`text-[10px] sm:text-xs font-medium mt-1 leading-tight ${
                              isSelected ? "text-white/90" : "text-slate-500"
                            }`}
                          >
                            MRP incl. of all taxes
                          </p>
                        </div>

                        {/* Bottom Pill: Save ₹... */}
                        <div className="pt-2">
                          <span
                            className={`w-full py-1.5 px-3 rounded-full font-black text-xs sm:text-sm text-center block transition-transform hover:scale-[1.02] ${
                              isSelected
                                ? "bg-[#E9F4EE] text-[#0E4B38] shadow-2xs"
                                : "bg-[#E9F4EE] border border-dashed border-[#0E4B38] text-[#0E4B38]"
                            }`}
                          >
                            Save {formatRupees(vSavings)}
                          </span>

                          <span
                            className={`block text-[9.5px] sm:text-[10px] font-bold mt-1 text-center ${
                              isSelected ? "text-[#A2D5AB]" : "text-[#0E4B38]"
                            }`}
                          >
                            Pay {formatRupees(vOnlinePrice)} Online (Extra 5% OFF)
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Row 2: Pack of 3 (Full Width Featured Bundle Card) */}
                {variants.slice(2, 3).map((variant) => {
                  const isSelected = variant.id === selectedVariant.id;
                  const vPrice = variant.price ?? product.price;
                  const vMrp =
                    variant.compareAtPrice ??
                    product.compareAtPrice * Math.max(1, variant.bottles);
                  const vSavings = Math.max(0, vMrp - vPrice);
                  const vOnlinePrice =
                    variant.onlinePriceRupees ??
                    Math.max(0, vPrice - Math.round((vPrice * 5) / 100));

                  return (
                    <div key={variant.id} className="pt-1">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        data-variant-id={variant.id}
                        onClick={() => {
                          setSelectedVariantId(variant.id);
                          setCartFeedback(null);
                        }}
                        className={`relative w-full rounded-3xl p-3.5 sm:p-4 text-center transition-all cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4B38] ${
                          isSelected
                            ? "bg-[#0E4B38] text-white border-2 border-[#0E4B38] shadow-md ring-2 ring-[#0E4B38]/20"
                            : "bg-white text-slate-900 border border-slate-300 hover:border-[#0E4B38] shadow-2xs"
                        }`}
                      >
                        {/* Top Badge: RECOMMENDED */}
                        <span
                          className={`absolute -top-3 left-1/2 -translate-x-1/2 font-black text-[10px] sm:text-xs uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs whitespace-nowrap z-10 ${
                            isSelected
                              ? "bg-[#A2D5AB] text-[#0E4B38]"
                              : "bg-[#0E4B38] text-white"
                          }`}
                        >
                          RECOMMENDED
                        </span>

                        {/* Top Right Radio Indicator */}
                        <div
                          className={`w-5 h-5 rounded-full absolute top-3 right-3 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-white shadow-2xs"
                              : "border-2 border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#0E4B38]" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1.5 pb-1">
                          <div className="text-center sm:text-left sm:pl-2">
                            <p
                              className={`text-sm sm:text-base font-extrabold leading-tight ${
                                isSelected ? "text-white" : "text-slate-900"
                              }`}
                            >
                              90 Veg Capsules (Pack of 3 • 3 Bottles)
                            </p>
                            <p
                              className={`text-xs font-semibold mt-0.5 ${
                                isSelected ? "text-emerald-100" : "text-slate-600"
                              }`}
                            >
                              Complete 90-Day Vitality Course • Highest Savings
                            </p>
                          </div>

                          <div className="flex flex-col items-center sm:items-end sm:pr-2">
                            <div className="flex items-baseline gap-2">
                              <span
                                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                                  isSelected ? "text-white" : "text-slate-900"
                                }`}
                              >
                                {formatRupees(vPrice)}
                              </span>
                              {vMrp > vPrice && (
                                <span
                                  className={`text-xs sm:text-sm font-semibold line-through ${
                                    isSelected
                                      ? "text-[#A2D5AB]"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {formatRupees(vMrp)}
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-[10px] sm:text-xs font-medium leading-tight ${
                                isSelected ? "text-white/90" : "text-slate-500"
                              }`}
                            >
                              MRP incl. of all taxes
                            </p>
                          </div>
                        </div>

                        {/* Bottom Pill & Online Offer */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-1.5">
                          <span
                            className={`w-full sm:w-auto flex-1 py-1.5 px-4 rounded-full font-black text-xs sm:text-sm text-center block transition-transform hover:scale-[1.02] ${
                              isSelected
                                ? "bg-[#E9F4EE] text-[#0E4B38] shadow-2xs"
                                : "bg-[#E9F4EE] border border-dashed border-[#0E4B38] text-[#0E4B38]"
                            }`}
                          >
                            Save {formatRupees(vSavings)}
                          </span>

                          <span
                            className={`text-[10px] sm:text-xs font-bold text-center sm:text-right ${
                              isSelected ? "text-[#A2D5AB]" : "text-[#0E4B38]"
                            }`}
                          >
                            Pay {formatRupees(vOnlinePrice)} with Online Payment (Extra 5% OFF)
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Purchase Action Bar (Qty Stepper + Light Mint Cart + Forest Green BUY NOW) */}
            <div className="space-y-2.5 pt-1">
              {/* Compact Quantity Stepper */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                    Quantity:
                  </span>
                  <div className="inline-flex items-center h-9 sm:h-10 border border-slate-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 sm:w-9 h-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer touch-manipulation"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span
                      data-testid="pdp-quantity"
                      className="w-7 sm:w-8 text-center text-xs sm:text-sm font-black text-[#111827]"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="w-8 sm:w-9 h-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer touch-manipulation"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {quantity > 1 && (
                  <span className="text-xs font-bold text-[#0E4B38]">
                    Subtotal: {formatRupees(displayedPrice)} (Pay {formatRupees(activeTierPricing.onlinePriceRupees)} Online)
                  </span>
                )}
              </div>

              {/* Action Buttons Row Matching Reference Image */}
              <div className="flex items-center gap-2.5 sm:gap-3 w-full">
                {/* Light Mint Rounded Square Cart Button */}
                <button
                  type="button"
                  data-testid="pdp-add-to-cart"
                  aria-label="Add to Cart"
                  title="Add to Cart"
                  onClick={handleAddVariantToCart}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E9F4EE] border border-[#CDE5D6] hover:bg-[#D7ECE0] text-[#0E4B38] flex items-center justify-center shrink-0 shadow-2xs transition-all active:scale-95 cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4B38]"
                >
                  <ShoppingCart className="w-6 h-6 stroke-[#0E4B38] stroke-[2.2]" />
                </button>

                {/* Wide Forest Green Pill BUY NOW Button with Payment Logos & Chevron */}
                <button
                  type="button"
                  data-testid="pdp-buy-now"
                  onClick={handleBuyNow}
                  className="flex-1 h-12 sm:h-14 px-4 sm:px-6 rounded-full bg-[#0E4B38] hover:bg-[#124734] text-white font-black text-sm sm:text-base tracking-wide flex items-center justify-between shadow-md transition-all active:scale-[0.99] cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4B38] focus-visible:ring-offset-1"
                >
                  <span className="uppercase tracking-wider">BUY NOW</span>

                  {/* Payment Badges Cluster */}
                  <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 px-2 py-1 rounded-full shadow-xs">
                    {/* GPay badge */}
                    <span className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center shadow-2xs text-[10px] font-black text-slate-800">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.28 21.44 7.35 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.13z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.28 2.56 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"/>
                      </svg>
                    </span>
                    {/* PhonePe badge */}
                    <span className="w-4.5 h-4.5 rounded-full bg-[#5F259F] text-white flex items-center justify-center font-bold text-[9px] shadow-2xs">
                      पे
                    </span>
                    {/* Paytm badge */}
                    <span className="w-4.5 h-4.5 rounded-full bg-[#002970] text-[#00BAF2] flex items-center justify-center font-black text-[8px] shadow-2xs">
                      P
                    </span>
                    {/* UPI badge */}
                    <span className="text-[9px] font-black text-slate-800 tracking-tighter px-0.5">
                      UPI
                    </span>
                  </div>

                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] text-white shrink-0" />
                </button>
              </div>

              {/* Shiprocket Fulfillment Line */}
              <div className="flex items-center justify-end text-[10px] font-semibold text-slate-400 pr-1">
                <span>Powered By</span>
                <span className="font-bold text-slate-600 ml-1">📦 Shiprocket</span>
              </div>

              {cartFeedback && (
                <div
                  role="status"
                  className="text-xs text-[#26471f] bg-[#EBF3ED] border border-[#C6DBC9] rounded-xl px-3.5 py-2.5 font-medium flex items-center justify-between gap-2 flex-wrap"
                >
                  <span>{cartFeedback}</span>
                  <Link
                    href="/cart"
                    className="font-extrabold text-[#0B4B39] underline underline-offset-2 shrink-0 hover:text-[#063D2C]"
                  >
                    View Cart →
                  </Link>
                </div>
              )}
            </div>

            {/* 6. 3-Column Trust Pillars with Dividers (from reference image) */}
            <div className="pt-3 border-t border-slate-200">
              <div className="grid grid-cols-3 divide-x divide-slate-200 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                    Fast &amp; Reliable Delivery
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                    Secure Checkout
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                    Original Product Guaranteed
                  </span>
                </div>
              </div>
            </div>

            {/* 6. 4-Column Service & Formulation Pillars Row */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-3 pt-2.5 pb-1 border-t border-slate-200/70 text-center">
              {content.servicePillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="flex flex-col items-center justify-start px-0.5 py-1.5"
                >
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F4F8F4] border border-[#DCE8D8] flex items-center justify-center mb-1.5">
                    {renderPillarIcon(pillar.icon)}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#111827] leading-tight">
                    {pillar.line1}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-700 leading-tight mt-0.5">
                    {pillar.line2}
                  </span>
                </div>
              ))}
            </div>

            {/* 7. Product Highlights Card (Compact 2-Column Soft Surface Grid) */}
            <div className="space-y-2.5 pt-1">
              <h2 className="text-base sm:text-lg font-bold text-[#111827]">
                Product Highlights
              </h2>
              <div className="rounded-2xl bg-[#F5F6F4] border border-slate-200/80 p-3.5 sm:p-4 grid grid-cols-2 gap-x-3 gap-y-3.5">
                {content.iconHighlights.map((item) => (
                  <div key={item.id} className="flex items-start gap-2.5 min-w-0">
                    <span className="w-7.5 h-7.5 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                      {renderHighlightIcon(item.icon)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-[#111827] leading-snug">
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className="text-[11px] sm:text-xs font-medium text-slate-700 leading-snug mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Key Ingredients Card Showcase (matching clean white elevated cards with botanical photos) */}
      <section
        id="key-ingredients"
        className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-8"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] text-center tracking-tight mb-5 sm:mb-6">
            Key Ingredients
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {content.keyIngredients.map((ingredient) => (
              <article
                key={ingredient.id}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-[0_3px_14px_rgba(15,23,42,0.08)] px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 transition-shadow hover:shadow-[0_6px_18px_rgba(15,23,42,0.1)]"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#111827] leading-snug">
                      {ingredient.name}
                    </h3>
                    {ingredient.amountLabel && (
                      <span className="text-[11px] sm:text-xs font-extrabold text-[#264D1E] bg-[#EBF3ED] px-2 py-0.5 rounded-md">
                        {ingredient.amountLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] sm:text-[15px] font-medium text-slate-600 mt-1.5 leading-relaxed">
                    {ingredient.description}
                  </p>
                </div>

                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src={ingredient.imageSrc}
                    alt={ingredient.name}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              </article>
            ))}
          </div>

          <p className="text-xs font-medium text-slate-500 text-center mt-4">
            {content.ingredientsFootnote}
          </p>
        </div>
      </section>

      {/* 9. Compact Accordions Section (Visual Overview, Direction to Use [conditional], Questions & Answers) */}
      <section className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-8">
        <div className="rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden bg-white">
          {/* Accordion 1: Formulation & Packaging Visuals */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("visuals")}
              aria-expanded={openSection === "visuals"}
              className="w-full px-4 py-3.5 min-h-[52px] flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#111827]">
                <Images className="w-4.5 h-4.5 text-[#355E2B]" />
                <span>Product &amp; Ingredient Visuals</span>
              </span>
              <ChevronDown
                className={`w-4.5 h-4.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                  openSection === "visuals" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSection === "visuals" && (
              <div className="px-4 pb-4 pt-3 space-y-4 border-t border-slate-100 bg-[#FAFBF9]">
                {squareVisuals.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-4xl mx-auto">
                    {squareVisuals.map((item) => (
                      <figure
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                      >
                        <div className="relative aspect-square w-full bg-white">
                          <Image
                            src={item.imageSrc}
                            alt={item.alt}
                            fill
                            loading="lazy"
                            sizes="(max-width: 640px) 92vw, 420px"
                            className="object-contain"
                          />
                        </div>
                        <figcaption className="px-3.5 py-2.5 border-t border-slate-100">
                          <p className="text-xs sm:text-sm font-bold text-[#111827]">
                            {item.title}
                          </p>
                          <p className="text-xs font-medium text-slate-700 mt-0.5 leading-relaxed">
                            {item.caption}
                          </p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {portraitVisuals.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-4xl mx-auto">
                    {portraitVisuals.map((item) => (
                      <figure
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                      >
                        <div className="relative aspect-[3/4] w-full bg-[#FAF7F2]">
                          <Image
                            src={item.imageSrc}
                            alt={item.alt}
                            fill
                            loading="lazy"
                            sizes="(max-width: 640px) 92vw, 420px"
                            className="object-contain"
                          />
                        </div>
                        <figcaption className="px-3.5 py-2.5 border-t border-slate-100">
                          <p className="text-xs sm:text-sm font-bold text-[#111827]">
                            {item.title}
                          </p>
                          <p className="text-xs font-medium text-slate-700 mt-0.5 leading-relaxed">
                            {item.caption}
                          </p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Accordion 3: Conditional Direction to Use */}
          {content.directionSteps.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => toggleSection("directions")}
                aria-expanded={openSection === "directions"}
                className="w-full px-4 py-3.5 min-h-[52px] flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#111827]">
                  <Package className="w-4.5 h-4.5 text-[#355E2B]" />
                  <span>Direction to Use</span>
                </span>
                <ChevronDown
                  className={`w-4.5 h-4.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                    openSection === "directions" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSection === "directions" && (
                <div className="px-4 pb-4 pt-2 space-y-2 border-t border-slate-100 bg-[#FAFBF9]">
                  {content.directionSteps.map((step) => (
                    <div
                      key={step.id}
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <p className="text-[13px] sm:text-sm font-bold text-[#111827]">
                        {step.stepNumber}. {step.title}
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5 leading-relaxed">
                        {step.caption}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Accordion 4: Questions & Answers (FAQs) */}
          {content.faqs.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => toggleSection("faqs")}
                aria-expanded={openSection === "faqs"}
                className="w-full px-4 py-3.5 min-h-[52px] flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#111827]">
                  <HelpCircle className="w-4.5 h-4.5 text-[#355E2B]" />
                  <span>Questions &amp; Answers ({content.faqs.length})</span>
                </span>
                <ChevronDown
                  className={`w-4.5 h-4.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                    openSection === "faqs" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSection === "faqs" && (
                <div className="px-4 pb-4 pt-2 space-y-2 border-t border-slate-100 bg-[#FAFBF9]">
                  {content.faqs.map((faq) => {
                    const faqOpen = openFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqId(faqOpen ? null : faq.id)}
                          aria-expanded={faqOpen}
                          className="w-full px-3.5 py-2.5 min-h-[44px] flex items-center justify-between gap-2 text-left text-[13px] sm:text-sm font-bold text-[#111827] hover:bg-slate-50 cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#355E2B] shrink-0 transition-transform ${
                              faqOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {faqOpen && (
                          <div className="px-3.5 pb-3.5 pt-1.5 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed border-t border-slate-100">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 9. Promotional Product & Wellness Videos (Honest Brand Spotlight) */}
      <ProductMediaVideos
        title="Product & Wellness Spotlights"
        subtitle="Promotional wellness overview clips (genuine customer testimonial videos will be published after launch orders)."
        videos={content.promotionalVideos}
      />

      {/* 10. Conditional Customer Reviews (hidden cleanly while verifiedReviews === null) */}
      <ProductReviewsSection reviewsData={content.verifiedReviews} />

      {/* 11. Bottom Pure Botanical Trust Card matching Reference Footer Lead-In */}
      <section className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-12 py-5 sm:py-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#EBF2E8] via-[#F6F8F4] to-[#EBF2E8] border border-[#D4E2D0] p-4 sm:p-6 flex items-center gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-white border border-[#DCE8D8] shrink-0 overflow-hidden">
            <Image
              src={content.bottomBanner.imageSrc}
              alt={content.bottomBanner.imageAlt}
              fill
              loading="lazy"
              sizes="128px"
              className="object-contain"
            />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[#264D1E] font-bold text-base sm:text-lg">
              <Leaf className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" />
              <h2>{content.bottomBanner.heading}</h2>
            </div>
            <p className="text-[13px] sm:text-base font-medium text-slate-800 leading-relaxed">
              {content.bottomBanner.description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
