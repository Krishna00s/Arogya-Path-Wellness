"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight, Mail, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MOCK_CATEGORIES } from "@/data/mock-categories";
import { navigateToConcern } from "@/lib/utils";

export function MobileNavDrawer() {
  const { isMobileNavOpen, setIsMobileNavOpen } = useCart();

  useEffect(() => {
    if (!isMobileNavOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileNavOpen, setIsMobileNavOpen]);

  if (!isMobileNavOpen) return null;

  const handleCategoryNav = (slug: string) => {
    setIsMobileNavOpen(false);
    navigateToConcern(slug);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      className="fixed inset-0 z-50 lg:hidden flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMobileNavOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-white text-slate-900">
          <Link
            href="/"
            onClick={() => setIsMobileNavOpen(false)}
            className="flex items-center focus:outline-none"
          >
            <Image
              src="/logo.png"
              alt="Arogya Path - The Path to Wellness"
              width={120}
              height={55}
              className="h-[46px] w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Close menu"
            className="w-11 h-11 rounded-full flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-100 transition-colors cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Quick Jump */}
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Browse Store
            </h4>
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-bold text-[#0B4B39] bg-emerald-50"
              >
                <span>Store Homepage</span>
                <ChevronRight className="w-4 h-4 text-[#0B4B39]" />
              </Link>
              <a
                href="#concern"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span>Select Your Concern</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#best-solutions"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span>Best Solutions</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#popular-categories"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span>Popular Categories</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#ayurvedic-solutions"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span>Ayurvedic Solutions</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#hair-care"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span>Hair Care Collection</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Categories Grid */}
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Shop By Concern
            </h4>
            <div className="space-y-1">
              {MOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryNav(cat.slug)}
                  className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#0B4B39] transition-colors text-left cursor-pointer"
                >
                  <span className="font-semibold">{cat.name}</span>
                  <span className="text-[10px] text-slate-400">
                    {cat.itemCount} items
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Help & Policies */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Customer Support
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0B4B39]" />
                <a href="mailto:info@arogyapathwellness.com" className="hover:text-[#0B4B39]">
                  info@arogyapathwellness.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0B4B39] shrink-0 mt-0.5" />
                <span>Ward No. 16, Ashok Nagar, Barwa Toli, Lohardaga, Jharkhand - 835302</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-500 text-center font-medium">
          © 2026 Arogya Path Marketing • All Rights Reserved
        </div>
      </div>
    </div>
  );
}
