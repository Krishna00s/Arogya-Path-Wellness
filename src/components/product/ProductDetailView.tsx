"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
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
    product.price * PAISE_PER_RUPEE
  );

  const displayedPrice = activeTierPricing.finalPriceRupees;
  const displayedBaseTotal = activeTierPricing.baseTotalRupees;
  const displayedDiscountPercent = activeTierPricing.discountPercent;
  const displayedSavings = activeTierPricing.savingsRupees;
  const displayedPerBottle = activeTierPricing.perBottleRupees;
  const displayedVerifiedMrp = selectedVariant.verifiedMrp
    ? selectedVariant.verifiedMrp * quantity
    : null;

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
            <div className="space-y-1">
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

            {/* 3. Compact Flipkart-Style Price Block (updates dynamically with pack AND bottle quantity) */}
            <div data-testid="pdp-price-box" className="pt-0.5 space-y-1.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span
                    data-testid="pdp-selling-price"
                    className="text-2xl sm:text-3xl font-extrabold text-[#1F4218] tracking-tight"
                  >
                    {formatRupees(displayedPrice)}
                  </span>

                  {displayedBaseTotal > displayedPrice && (
                    <span
                      data-testid="pdp-base-strikethrough"
                      className="text-sm sm:text-base text-slate-600 line-through font-semibold"
                    >
                      {formatRupees(displayedBaseTotal)}
                    </span>
                  )}

                  {displayedVerifiedMrp &&
                    displayedVerifiedMrp > displayedPrice && (
                      <span className="text-xs sm:text-sm text-slate-600 line-through font-semibold">
                        MRP {formatRupees(displayedVerifiedMrp)}
                      </span>
                    )}

                  {displayedDiscountPercent > 0 && (
                    <span
                      data-testid="pdp-discount-badge"
                      className="text-xs font-extrabold uppercase tracking-wide bg-[#FBEAD2] text-[#8C4305] px-2.5 py-0.5 rounded-md"
                    >
                      {displayedDiscountPercent}% off
                    </span>
                  )}
                </div>

                {totalSelectedBottles >= 3 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#8B1A1A] text-white px-2.5 py-1 rounded-full shrink-0">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    Best Value
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm text-slate-700 font-medium">
                {displayedSavings > 0 && (
                  <span
                    data-testid="pdp-savings-text"
                    className="font-bold text-[#15803D]"
                  >
                    You save {formatRupees(displayedSavings)} on{" "}
                    {quantity === 1
                      ? selectedVariant.label
                      : `${totalSelectedBottles} bottles`}
                  </span>
                )}
                {displayedSavings > 0 && <span aria-hidden="true">•</span>}
                <span data-testid="pdp-per-bottle" className="font-semibold text-slate-800">
                  {formatRupees(displayedPerBottle)} / bottle
                </span>
                {selectedVariant.isTaxInclusiveVerified && (
                  <>
                    <span aria-hidden="true">•</span>
                    <span className="font-medium text-slate-700">
                      Inclusive of applicable taxes
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* 4. Choose Your Pack (3 Pack Cards) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
                  Choose Your Pack
                </span>
                <span className="text-xs font-bold text-[#264D1E]">
                  {selectedVariant.shortLabel} • {selectedVariant.capsulesTotal} Caps
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label="Pack variant options"
                className="grid grid-cols-3 gap-1.5 sm:gap-2.5"
              >
                {variants.map((variant) => {
                  const isSelected = variant.id === selectedVariant.id;
                  const vPrice = variant.price ?? product.price;
                  const vBase = variant.basePrice ?? vPrice;
                  const vDiscount = variant.discountPercent ?? 0;
                  const vPerBottle =
                    variant.perBottleRupees ??
                    Math.round(vPrice / Math.max(1, variant.bottles));
                  const isPackThree = variant.bottles === 3;

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
                      className={`relative rounded-xl p-2 sm:p-3 text-left border-2 transition-all cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B] ${
                        isSelected
                          ? "border-[#355E2B] bg-[#F4F8F4] shadow-xs"
                          : isPackThree
                          ? "border-emerald-400/90 bg-white hover:border-[#355E2B]/80"
                          : "border-slate-300/80 bg-white hover:border-slate-400"
                      }`}
                    >
                      {isSelected && (
                        <span
                          aria-hidden="true"
                          className="absolute -top-2 -right-1.5 w-5 h-5 rounded-full bg-[#355E2B] text-white flex items-center justify-center shadow-xs"
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}

                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <span
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-[#355E2B]"
                              : "border-slate-400"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#355E2B]" />
                          )}
                        </span>
                        <span className="font-extrabold text-[12px] sm:text-sm text-[#111827] leading-tight whitespace-nowrap">
                          {variant.label}
                        </span>
                      </div>

                      <div className="mt-1.5 flex items-baseline gap-1 flex-wrap">
                        <span className="text-[15px] sm:text-lg font-extrabold text-[#111827]">
                          {formatRupees(vPrice)}
                        </span>
                        {vDiscount > 0 && (
                          <span className="text-[10px] sm:text-[11px] font-extrabold bg-[#FBEAD2] text-[#8C4305] px-1 sm:px-1.5 py-0.5 rounded leading-none">
                            {vDiscount}% OFF
                          </span>
                        )}
                      </div>

                      {vBase > vPrice && (
                        <p className="text-[11px] sm:text-xs text-slate-600 line-through font-semibold leading-tight mt-0.5">
                          {formatRupees(vBase)}
                        </p>
                      )}

                      <p className="text-[11px] sm:text-xs font-bold text-slate-700 mt-1 leading-tight">
                        ({formatRupees(vPerBottle)}/btl)
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Single-Row Purchase Bar (Qty + Add to Cart + Buy Now) */}
            <div className="space-y-2 pt-0.5">
              <div className="flex items-center gap-2 w-full">
                {/* Compact Qty Stepper */}
                <div className="inline-flex items-center h-11 border border-slate-300 rounded-xl bg-white shrink-0 overflow-hidden">
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
                    className="w-6 sm:w-8 text-center text-xs sm:text-sm font-bold text-[#111827]"
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

                {/* Add to Cart */}
                <button
                  type="button"
                  data-testid="pdp-add-to-cart"
                  onClick={handleAddVariantToCart}
                  className="flex-1 h-11 px-2.5 sm:px-4 rounded-xl border border-slate-300 bg-white hover:bg-[#F4F8F4] hover:border-[#355E2B] text-[#111827] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer touch-manipulation whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B]"
                >
                  <ShoppingCart className="w-4 h-4 shrink-0" />
                  <span>Add to Cart</span>
                </button>

                {/* Buy Now */}
                <button
                  type="button"
                  data-testid="pdp-buy-now"
                  onClick={handleBuyNow}
                  className="flex-1 h-11 px-2.5 sm:px-4 rounded-xl bg-[#355E2B] hover:bg-[#2a4c22] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer touch-manipulation whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B] focus-visible:ring-offset-1"
                >
                  <Zap className="w-4 h-4 fill-current shrink-0" />
                  <span>Buy Now</span>
                </button>
              </div>

              {quantity > 1 && (
                <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                  Order total ({totalSelectedBottles} bottles
                  {displayedDiscountPercent > 0
                    ? ` • ${displayedDiscountPercent}% bundle discount`
                    : ""}
                  ):{" "}
                  <strong className="text-[#111827]">
                    {formatRupees(displayedPrice)}
                  </strong>
                  {displayedSavings > 0 && (
                    <span className="text-[#15803D] font-bold ml-1.5">
                      (Save {formatRupees(displayedSavings)})
                    </span>
                  )}
                </p>
              )}

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
