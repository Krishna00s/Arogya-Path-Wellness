"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Zap,
  Tag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupees } from "@/lib/utils";

export function DemoCartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isCartOpen) return null;

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
    alert(
      `[DEMO MODE NOTICE]\nYou selected: ${methodName}\n\nMilestone 1 implements the responsive storefront shell, visual design, and demonstration interactions.\nLive Phone OTP verification, address capture, COD confirmation, and Razorpay UPI will be integrated in Milestones 3 & 4.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0B4B39]" />
            <h2 className="font-bold text-base text-slate-900">Your Cart</h2>
            <span className="text-xs bg-emerald-50 text-[#0B4B39] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-4 py-3 bg-emerald-50/70 border-b border-emerald-100 text-xs">
          {freeShippingMet ? (
            <div className="flex items-center gap-2 text-[#0B4B39] font-semibold">
              <Truck className="w-4 h-4 text-[#0B4B39] shrink-0" />
              <span>Congratulations! You qualify for Free Delivery.</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-slate-700 font-medium mb-1.5">
                <span>Add {formatRupees(freeShippingThreshold - subtotal)} more for Free Shipping</span>
                <span className="text-[11px] font-bold text-[#0B4B39]">{progressPercent}%</span>
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

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-base text-slate-800 mb-1">
                Your cart is empty
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Explore our authentic Ayurvedic wellness range and add items to your cart.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-emerald-800 text-white rounded-full text-xs font-semibold hover:bg-emerald-900 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 rounded-2xl border border-slate-200/80 bg-white shadow-xs"
              >
                <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">{item.product.packSize}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                    <span className="font-bold text-xs text-slate-900">
                      {formatRupees(item.product.price * item.quantity)}
                    </span>

                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Coupon Code Input */}
          {cartItems.length > 0 && (
            <div className="pt-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Have a coupon code?"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 uppercase placeholder:normal-case focus:outline-none focus:border-emerald-700"
                  />
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>
              {couponApplied && (
                <p className="mt-1.5 text-[11px] text-emerald-700 font-medium">
                  ✓ Demo coupon applied (₹50 discount preview)
                </p>
              )}
            </div>
          )}

          {/* Milestone 1 Demo Notice Banner */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
            <span className="font-bold">⚠️ DEMONSTRATION CONTENT:</span> Live payment processing, phone OTP login, and order database writes are disabled in Milestone 1 per project blueprint.
          </div>
        </div>

        {/* Footer Order Summary & Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">{formatRupees(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-emerald-800">
                  {freeShippingMet ? "Free" : "₹49"}
                </span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-700">
                  <span>Demo Discount</span>
                  <span>-₹50</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Estimated Total</span>
                <span>{formatRupees(couponApplied ? Math.max(0, subtotal - 50) : subtotal)}</span>
              </div>
            </div>

            {/* Primary Proceed CTA */}
            <button
              type="button"
              onClick={() => handleCheckoutClick("Proceed to Checkout")}
              className="w-full py-3 bg-[#0B4B39] hover:bg-[#063D2C] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] min-h-[44px]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Payment Options */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleCheckoutClick("Cash on Delivery (COD)")}
                className="py-2.5 px-2 bg-white border border-slate-300 hover:border-emerald-700 rounded-xl text-[11px] font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Truck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Cash on Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => handleCheckoutClick("UPI / Instant Online")}
                className="py-2.5 px-2 bg-white border border-slate-300 hover:border-emerald-700 rounded-xl text-[11px] font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Pay via UPI</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
