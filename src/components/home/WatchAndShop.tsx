"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, X, ShoppingBag, ArrowRight } from "lucide-react";
import { WATCH_AND_SHOP_REELS } from "@/data/mock-categories";
import { ReelItem } from "@/types/storefront";
import { formatRupees } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { MOCK_PRODUCTS } from "@/data/mock-products";

export function WatchAndShop() {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const { addToCart, setIsCartOpen } = useCart();
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = () => {
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  };

  const handleOpenReel = (reel: ReelItem) => {
    if (isScrollingRef.current) return;
    setActiveReel(reel);
  };

  const handleBuyProduct = (reel: ReelItem) => {
    const product = MOCK_PRODUCTS.find((p) => p.name.includes(reel.productName.split(" ")[0])) || MOCK_PRODUCTS[0];
    addToCart(product, 1);
    setActiveReel(null);
    setIsCartOpen(true);
  };

  return (
    <section id="watch-and-shop" className="py-8 sm:py-12 bg-white w-full">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="text-center mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-extrabold uppercase tracking-wider mb-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            Watch & Shop
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#063D2C] font-serif tracking-tight">
            Ayurvedic Routines in Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real botanical formulations explained in short wellness videos
          </p>
        </div>
      </div>

      {/* 2 Portrait Cards Side by Side on Mobile, 6 Reels in a Row on Larger Screens: full width edge-to-edge */}
      <div className="w-full lg:max-w-[1720px] lg:mx-auto">
        <div
          onScroll={handleScroll}
          className="flex lg:grid lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-4 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory touch-scroll-x px-0 lg:px-12 pb-3 lg:pb-0"
        >
          {WATCH_AND_SHOP_REELS.map((reel, idx) => (
            <div
              key={reel.id}
              onClick={() => handleOpenReel(reel)}
              className={`relative w-[195px] sm:w-[240px] md:w-[270px] lg:w-full aspect-[9/16] shrink-0 lg:shrink snap-start rounded-2xl overflow-hidden border border-slate-200/90 shadow-md cursor-pointer group bg-slate-900 box-content lg:box-border touch-manipulation select-none ${
                idx === 0 ? "pl-4 sm:pl-6 md:pl-8 lg:pl-0" : ""
              } ${
                idx === WATCH_AND_SHOP_REELS.length - 1 ? "pr-4 sm:pr-6 md:pr-8 lg:pr-0" : ""
              }`}
            >
              {/* Poster Image */}
              <Image
                src={reel.posterImage}
                alt={reel.title}
                fill
                sizes="(max-width: 640px) 195px, 270px"
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 pointer-events-none"
              />

              {/* Gradient Vignette for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

              {/* Duration Chip (Top-right) */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 pointer-events-none">
                {reel.videoDuration || "0:45"}
              </div>

              {/* Center Play Icon Circle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#063D2C] shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-[#063D2C] ml-0.5" />
                </div>
              </div>

              {/* Bottom Shoppable Card */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <h3 className="text-white text-xs sm:text-sm font-bold line-clamp-2 leading-tight drop-shadow-sm mb-2 pointer-events-none">
                  {reel.title}
                </h3>

                <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-xl flex items-center justify-between shadow-md">
                  <div className="min-w-0 pr-1.5 pointer-events-none">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {reel.productName}
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-[#0B4B39]">
                      {formatRupees(reel.productPrice)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isScrollingRef.current) return;
                      handleBuyProduct(reel);
                    }}
                    aria-label={`Buy ${reel.productName}`}
                    className="h-8.5 px-3 rounded-lg bg-[#0B4B39] text-white text-xs font-bold hover:bg-[#063D2C] active:scale-95 transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-xs touch-manipulation"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Demo Overlay */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm aspect-[9/16] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-4 border border-white/20">
            {/* Background Poster */}
            <Image
              src={activeReel.posterImage}
              alt={activeReel.title}
              fill
              className="object-cover opacity-60"
            />

            {/* Top Close Bar */}
            <div className="relative z-10 flex items-center justify-between text-white">
              <span className="text-xs font-bold px-2.5 py-1 bg-black/60 rounded-full border border-white/20">
                Arogya Path Reel
              </span>
              <button
                type="button"
                onClick={() => setActiveReel(null)}
                aria-label="Close video player"
                className="w-9 h-9 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/90 active:scale-90 transition-transform touch-target-44 cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Simulated Video Play Center Note */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 bg-black/40 backdrop-blur-xs rounded-2xl border border-white/10 mx-2">
              <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center mb-3 shadow-lg">
                <Play className="w-7 h-7 fill-white ml-0.5" />
              </div>
              <p className="text-white font-bold text-sm leading-snug">
                {activeReel.title}
              </p>
              <p className="text-slate-300 text-xs mt-1">
                [DEMO REEL: Video streaming will connect to cloud CDN in production]
              </p>
            </div>

            {/* Bottom Floating Buy Product Banner */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl flex items-center justify-between shadow-2xl border border-white/40">
              <div className="min-w-0 pr-2">
                <p className="text-xs font-medium text-slate-500">Featured in Reel</p>
                <p className="text-sm font-extrabold text-slate-900 truncate">
                  {activeReel.productName}
                </p>
                <p className="text-sm font-black text-[#0B4B39]">
                  {formatRupees(activeReel.productPrice)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleBuyProduct(activeReel)}
                className="h-10 px-4 rounded-xl bg-[#0B4B39] text-white text-xs font-extrabold hover:bg-[#063D2C] active:scale-95 transition-all flex items-center gap-1.5 shrink-0 shadow-md touch-target-44 cursor-pointer"
              >
                <span>Add &amp; Buy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
