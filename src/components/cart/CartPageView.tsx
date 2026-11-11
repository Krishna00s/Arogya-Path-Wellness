"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  Zap,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupees } from "@/lib/utils";

export function CartPageView() {
  const {
    cartItems,
    linePricingMap,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalSavings,
    totalItems,
    totalBottles,
    hasUnpricedItems,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  const freeShippingThreshold = 499;
  const freeShippingMet = subtotal >= freeShippingThreshold || subtotal === 0;
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  const handleCheckoutClick = (methodName: string) => {
    setCheckoutNotice(
      `Selected ${methodName}. Online checkout, address capture, and payment gateway integration will be enabled when store checkout goes live.`
    );
  };

  const tierNudgeMessage =
    totalBottles === 1
      ? "Add 1 more bottle to unlock 5% off (2 bottles at ₹1,632), or 2 more bottles for 10% off (₹2,319)."
      : totalBottles === 2
      ? "5% multi-bottle discount active! Add 1 more bottle to unlock 10% off across your entire cart."
      : "10% maximum multi-bottle discount is active across all bottles in your cart.";

  return (
    <section
      aria-label="Shopping cart"
      className="w-full bg-[#FAFBF9] min-h-[calc(100vh-190px)]"
    >
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-7 pb-24 lg:pb-12 space-y-5">
        {/* Breadcrumb + Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="space-y-1.5">
            <Link
              href="/products/testo-booster-capsules"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#355E2B] hover:text-[#26471f] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
            <div className="flex items-center gap-2.5 flex-wrap">
              <ShoppingBag className="w-6 h-6 text-[#0B4B39]" />
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
                Your Cart
              </h1>
              <span className="text-xs font-bold bg-[#EBF3ED] text-[#0B4B39] px-2.5 py-0.5 rounded-full border border-[#C6DBC9]">
                {totalItems} {totalItems === 1 ? "item" : "items"} (
                {totalBottles} {totalBottles === 1 ? "bottle" : "bottles"})
              </span>
            </div>
          </div>

          {cartItems.length > 0 && (
            <div className="rounded-xl bg-emerald-50/90 border border-emerald-200/80 px-3.5 py-2.5 text-xs sm:text-[13px]">
              {freeShippingMet ? (
                <div className="flex items-center gap-2 text-[#0B4B39] font-bold">
                  <Truck className="w-4 h-4 text-[#0B4B39] shrink-0" />
                  <span>Congratulations! You qualify for Free Delivery.</span>
                </div>
              ) : (
                <div className="space-y-1 min-w-[220px]">
                  <div className="flex items-center justify-between text-slate-800 font-semibold gap-3">
                    <span>
                      Add {formatRupees(freeShippingThreshold - subtotal)} more for
                      Free Shipping
                    </span>
                    <span className="font-bold text-[#0B4B39]">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0B4B39] rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xs py-16 px-6 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F4F8F4] border border-[#DCE8D8] flex items-center justify-center mx-auto mb-4 text-[#355E2B]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-bold text-lg sm:text-xl text-slate-900 mb-1.5">
              Your cart is empty
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Explore our authentic Ayurvedic wellness range and add Testo Booster
              Capsules to your cart.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/products/testo-booster-capsules"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#355E2B] hover:bg-[#2a4b22] text-white rounded-xl text-sm font-bold transition-colors"
              >
                Shop Testo Booster Capsules
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-5 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 rounded-xl text-sm font-semibold transition-colors"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            {/* Left Column: Cart Items + Multi-Bottle Tier Banner */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="rounded-xl bg-[#EBF3ED] border border-[#C6DBC9] px-4 py-2.5 text-xs sm:text-[13px] font-semibold text-[#1E3F19]">
                {tierNudgeMessage}
              </div>

              {cartItems.map((item) => {
                const pricing = linePricingMap[item.id];
                const lineFinal =
                  pricing?.lineFinalRupees ??
                  (item.unitPrice ?? item.product.price) * item.quantity;
                const lineBase =
                  pricing?.lineBaseRupees ??
                  (item.baseUnitPrice ?? item.product.price) * item.quantity;
                const lineSavings = Math.max(0, lineBase - lineFinal);
                const discPct = pricing?.effectiveDiscountPercent ?? 0;

                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-white shadow-xs"
                  >
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-200/80"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="96px"
                        className="object-contain p-1"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-bold text-sm sm:text-base text-slate-900 hover:text-[#355E2B] line-clamp-1 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs sm:text-[13px] font-medium text-slate-600 mt-0.5">
                            {item.variantLabel ??
                              item.packSize ??
                              item.product.packSize}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1.5 -mr-1 rounded-lg hover:bg-rose-50 cursor-pointer"
                          aria-label={`Remove ${item.product.name} ${
                            item.variantLabel ?? ""
                          }`.trim()}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-3 pt-2.5 border-t border-slate-100 flex-wrap">
                        {item.unitPrice === null ? (
                          <span className="font-semibold text-xs text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                            Price pending confirmation
                          </span>
                        ) : (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-base sm:text-lg text-slate-900">
                              {formatRupees(lineFinal)}
                            </span>
                            {lineBase > lineFinal && (
                              <>
                                <span className="text-xs sm:text-sm font-semibold text-slate-500 line-through">
                                  {formatRupees(lineBase)}
                                </span>
                                <span className="text-[11px] sm:text-xs font-bold text-[#264D1E] bg-[#EBF3ED] px-2 py-0.5 rounded">
                                  {discPct > 0 ? `${discPct}% off • ` : ""}
                                  Save {formatRupees(lineSavings)}
                                </span>
                              </>
                            )}
                          </div>
                        )}

                        <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center text-sm font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Coupon + Order Summary & Checkout Actions */}
            <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-4">
                <h2 className="text-base sm:text-lg font-extrabold text-[#111827]">
                  Order Summary
                </h2>

                {/* Coupon Form */}
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Have a coupon code?"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 uppercase placeholder:normal-case focus:outline-none focus:border-emerald-700"
                      />
                      <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {couponApplied && (
                    <p className="mt-1.5 text-xs text-emerald-700 font-medium">
                      Coupon code recorded ({couponCode.trim().toUpperCase()} —
                      discount rules apply at live checkout)
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-2 text-sm text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>
                      Subtotal ({totalBottles}{" "}
                      {totalBottles === 1 ? "bottle" : "bottles"})
                    </span>
                    <span className="font-semibold text-slate-900">
                      {formatRupees(subtotal + totalSavings)}
                    </span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-[#15803D] font-bold">
                      <span>Multi-Bottle Pack Discount</span>
                      <span>-{formatRupees(totalSavings)}</span>
                    </div>
                  )}

                  {hasUnpricedItems && (
                    <p className="text-xs text-amber-800 font-medium">
                      * Includes variant(s) with pricing pending confirmation.
                    </p>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-bold text-emerald-800">
                      {freeShippingMet ? "Free" : "₹49"}
                    </span>
                  </div>

                  <div className="flex justify-between text-base sm:text-lg font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                    <span>Order Total</span>
                    <span>{formatRupees(subtotal)}</span>
                  </div>
                </div>

                {checkoutNotice && (
                  <div
                    role="status"
                    className="p-3 bg-[#EBF3ED] rounded-xl border border-[#C6DBC9] text-xs text-[#26471f] leading-relaxed font-medium"
                  >
                    {checkoutNotice}
                  </div>
                )}

                {/* Checkout Buttons */}
                <button
                  type="button"
                  onClick={() => handleCheckoutClick("Proceed to Checkout")}
                  className="w-full py-3.5 bg-[#0B4B39] hover:bg-[#063D2C] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] min-h-[48px] cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleCheckoutClick("Cash on Delivery (COD)")
                    }
                    className="py-2.5 px-3 bg-white border border-slate-300 hover:border-emerald-700 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Cash on Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCheckoutClick("UPI / Instant Online")}
                    className="py-2.5 px-3 bg-white border border-slate-300 hover:border-emerald-700 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pay via UPI</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#355E2B]" />
                  <span>100% Authentic Arogya Path Botanicals</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
