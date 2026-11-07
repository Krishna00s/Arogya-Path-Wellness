"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  Leaf,
  ChevronDown,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupees } from "@/lib/utils";

export function Header() {
  const {
    totalItems,
    subtotal,
    setIsCartOpen,
    setIsMobileNavOpen,
    isSearchOpen,
    setIsSearchOpen,
  } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`[DEMO SEARCH] Searching for "${searchQuery}". Catalog filtering will be connected in Milestone 2.`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 transition-all">
      {/* Mobile Header Bar (61px high matching verified AR Ayurveda DOM) */}
      <div className="lg:hidden flex items-center justify-between h-[61px] px-4">
        {/* Left: Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(true)}
          aria-label="Open mobile navigation menu"
          className="w-10 h-10 -ml-1 flex items-center justify-center rounded-lg text-slate-800 hover:text-[#0B4B39] active:scale-95 transition-all"
        >
          <Menu className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Center: Brand Logo centered */}
        <div className="flex-1 flex justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-1.5 focus:outline-none text-center"
          >
            <div className="w-8 h-8 rounded-full bg-[#0B4B39] flex items-center justify-center text-white shrink-0 shadow-2xs">
              <Leaf className="w-4.5 h-4.5 text-emerald-300" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[17px] font-extrabold tracking-tight text-[#063D2C] leading-none font-serif">
                Arogya<span className="text-[#0B4B39]">Path</span>
              </span>
              <span className="text-[7.5px] font-bold tracking-[0.2em] text-[#0B4B39] uppercase mt-0.5">
                THE AYURVEDA PEOPLE
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Search & Cart bag with red notification dot */}
        <div className="flex items-center gap-1 -mr-1">
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search bar"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-800 hover:text-[#0B4B39] active:scale-95 transition-all"
          >
            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5 stroke-[2.2]" />}
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`View cart, ${totalItems} items`}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg text-slate-800 hover:text-[#0B4B39] active:scale-95 transition-all"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-[#DC2626] text-white text-[9px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Header Container (98px total: 64px top + 34px bottom nav) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Desktop Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#0B4B39] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 text-emerald-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#063D2C] font-serif leading-none">
                Arogya<span className="text-[#0B4B39]">Path</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#0B4B39] uppercase mt-1">
                THE AYURVEDA PEOPLE
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search authentic herbs, churna, tablets..."
                className="w-full pl-11 pr-24 py-2 bg-[#F1F5F4] border border-slate-200 rounded-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B4B39] focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#0B4B39] hover:bg-[#063D2C] text-white text-[11px] font-bold px-3.5 py-1 rounded-full transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Account Icon */}
            <button
              type="button"
              onClick={() =>
                alert(
                  "[DEMO ACTION] Customer Account & Phone OTP login will be integrated in Milestone 3."
                )
              }
              aria-label="Account login"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-[#0B4B39] hover:bg-[#F1F5F4] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <User className="w-4 h-4" />
              </div>
              <span>Account</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`View cart, ${totalItems} items`}
              className="relative flex items-center gap-2.5 px-4 py-2 bg-[#0B4B39] hover:bg-[#063D2C] text-white rounded-full transition-all shadow-xs active:scale-95"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-4.5 h-4.5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#DC2626] text-white text-[9px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border-2 border-[#0B4B39]">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold">
                {totalItems === 0 ? "Cart" : formatRupees(subtotal)}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Second Navigation Row */}
        <nav
          aria-label="Desktop primary navigation"
          className="flex items-center justify-between border-t border-slate-100 py-2.5 text-xs font-semibold text-slate-700"
        >
          <div className="flex items-center gap-7">
            <Link
              href="/"
              className="text-[#0B4B39] font-bold hover:text-[#063D2C] transition-colors"
            >
              Home
            </Link>
            <a
              href="#categories"
              className="flex items-center gap-1 hover:text-[#0B4B39] transition-colors"
            >
              <span>Top Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="#concern"
              className="flex items-center gap-1 hover:text-[#0B4B39] transition-colors"
            >
              <span>Shop by Concern</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="#bestsellers"
              className="hover:text-[#0B4B39] transition-colors"
            >
              Our Products
            </a>
            <a
              href="#deals"
              className="text-[#EA580C] font-bold flex items-center gap-1 hover:text-[#C2410C]"
            >
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
              <span>Special Offers</span>
            </a>
          </div>

          <div className="flex items-center gap-5 text-slate-500 font-medium">
            <a
              href="#about"
              className="hover:text-[#0B4B39] transition-colors"
            >
              About Us
            </a>
            <a
              href="#faq"
              className="hover:text-[#0B4B39] transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="hover:text-[#0B4B39] transition-colors"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>

      {/* Expandable Mobile Search Bar */}
      {isSearchOpen && (
        <div className="py-2.5 px-4 lg:hidden border-t border-slate-100 bg-[#F8F7F2] animate-in fade-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search churna, tablets, oils..."
              className="w-full pl-10 pr-20 py-2 bg-white border border-slate-300 rounded-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B4B39]"
              autoFocus
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#0B4B39] text-white text-xs font-bold px-3 py-1 rounded-full"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
