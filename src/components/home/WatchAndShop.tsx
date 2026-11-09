"use client";

import React, { useState } from "react";
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

  const handleOpenReel = (reel: ReelItem) => {
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

        {/* 2 Portrait Cards Side by Side on Mobile, 6 Reels in a Row on Larger Screens */}
        <div className="flex lg:grid lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-4 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory pb-3 lg:pb-0">
          {WATCH_AND_SHOP_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => handleOpenReel(reel)}
              className="relative w-[195px] sm:w-[240px] md:w-[270px] lg:w-full aspect-[9/16] shrink-0 lg:shrink snap-start rounded-2xl overflow-hidden border border-slate-200/90 shadow-md cursor-pointer group bg-slate-900"
            >
              {/* Poster Image */}
              <Image
                src={reel.posterImage}
                alt={reel.title}
                fill
                sizes="(max-width: 640px) 195px, 270px"
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />

              {/* Gradient Vignette for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

              {/* Duration Chip (Top-right) */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
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
                <h3 className="text-white text-xs sm:text-sm font-bold line-clamp-2 leading-tight drop-shadow-sm mb-2">
                  {reel.title}
                </h3>

                <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-xl flex items-center justify-between shadow-md">
                  <div className="min-w-0 pr-1.5">
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
                      handleBuyProduct(reel);
                    }}
                    className="w-8 h-8 rounded-xl bg-[#0B4B39] text-white flex items-center justify-center shrink-0 hover:bg-[#063D2C] transition-colors shadow-2xs"
                    aria-label="Quick buy product from reel"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tap Video Modal (No autoplay fake video; clean interactive preview) */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
            {/* Header */}
            <div className="p-3 flex items-center justify-between border-b border-white/10 text-white">
              <span className="text-xs font-bold truncate pr-2">{activeReel.title}</span>
              <button
                type="button"
                onClick={() => setActiveReel(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Player View */}
            <div className="relative aspect-[9/16] w-full bg-slate-900 flex items-center justify-center">
              <Image
                src={activeReel.posterImage}
                alt={activeReel.title}
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40">
                <div className="w-16 h-16 rounded-full bg-[#0B4B39] text-white flex items-center justify-center shadow-lg mb-3">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <p className="text-white text-xs font-semibold">
                  Interactive Video Demonstration
                </p>
                <p className="text-slate-300 text-[10px] mt-1 max-w-xs">
                  Production reel video stream will be linked in Milestone 2.
                </p>
              </div>
            </div>

            {/* Bottom Shoppable Bar */}
            <div className="p-3 bg-white flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900">{activeReel.productName}</p>
                <p className="text-xs font-extrabold text-[#0B4B39]">{formatRupees(activeReel.productPrice)}</p>
              </div>
              <button
                type="button"
                onClick={() => handleBuyProduct(activeReel)}
                className="px-4 py-2 bg-[#0B4B39] hover:bg-[#063D2C] text-white text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition-colors uppercase tracking-wider"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
