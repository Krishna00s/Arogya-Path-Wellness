"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  ChevronDown,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupees } from "@/lib/utils";
import { storefrontConfig } from "@/config/storefront";
import { getAvailableProducts } from "@/data/mock-products";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    totalItems,
    subtotal,
    isMobileNavOpen,
    setIsMobileNavOpen,
    isSearchOpen,
    setIsSearchOpen,
  } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastPathname, setLastPathname] = useState(pathname);
  const lastScrollY = useRef(0);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (!isVisible) {
      setIsVisible(true);
    }
  }

  useEffect(() => {
    lastScrollY.current = window.scrollY;
  }, [pathname]);
  const isSearchOpenRef = useRef(isSearchOpen);

  useEffect(() => {
    isSearchOpenRef.current = isSearchOpen;
  }, [isSearchOpen]);

  const headerVisible = isVisible || isSearchOpen || isMobileNavOpen;

  // Smart hide on scroll down, show on scroll up with smooth animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the very top
      if (currentScrollY <= 40) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Keep visible if search input is currently open
      if (isSearchOpenRef.current) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scroll Down -> Hide with smooth transition
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      }
      // Scroll Up -> Show
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { sections, launchMode } = storefrontConfig;
  const searchPlaceholder =
    launchMode === "single-product"
      ? "Search Testo Booster Capsules..."
      : "Search churna, tablets, oils, capsules...";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const availableProducts = getAvailableProducts();
    const matches = availableProducts.filter((p) =>
      [p.name, p.brand, p.packSize, p.subtitle, p.shortDescription]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(query))
    );

    if (matches.length > 0) {
      setIsSearchOpen(false);
      const el = document.getElementById("best-solutions");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/products/${matches[0].slug}`);
      }
      return;
    }

    const activeSummary = availableProducts
      .map((p) => `${p.name} (${p.packSize})`)
      .join(", ");
    alert(
      `[SEARCH] No available products matched "${searchQuery.trim()}".\nCurrently available: ${
        activeSummary || "None"
      }`
    );
  };

  return (
    <header
      id="store-main-header"
      className={`sticky top-0 z-40 bg-white border-b border-slate-100 transition-transform duration-300 ease-in-out ${
        headerVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Mobile Header Bar (Height increased ~10% to 75px for balanced proportions) */}
      <div className="lg:hidden flex items-center justify-between h-[75px] sm:h-[84px] px-4">
        {/* Left: Hamburger Button (toggles below-header menu cleanly without moving header) */}
        <button
          type="button"
          data-mobile-nav-trigger="true"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={
            isMobileNavOpen ? "Close navigation menu" : "Open mobile navigation menu"
          }
          className="w-11 h-11 -ml-1 flex items-center justify-center rounded-xl text-slate-800 hover:text-[#0B4B39] active:scale-95 transition-all cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39]"
        >
          {isMobileNavOpen ? (
            <X className="w-6 h-6 stroke-[2.2]" />
          ) : (
            <Menu className="w-6 h-6 stroke-[2.2]" />
          )}
        </button>

        {/* Center: Official Brand Logo centered */}
        <div className="flex-1 flex justify-center items-center">
          <Link
            href="/"
            className="flex items-center justify-center focus:outline-none py-1"
          >
            <Image
              src="/logo.png"
              alt="Arogya Path - The Path to Wellness"
              width={140}
              height={70}
              priority
              className="h-[52px] sm:h-[60px] w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right: Search & Cart bag with red notification dot */}
        <div className="flex items-center gap-0.5 -mr-1">
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search bar"
            aria-expanded={isSearchOpen}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-800 hover:text-[#0B4B39] active:scale-95 transition-all cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39]"
          >
            {isSearchOpen ? <X className="w-5.5 h-5.5" /> : <Search className="w-6 h-6 stroke-[2.2]" />}
          </button>

          <Link
            href="/cart"
            onClick={() => {
              setIsSearchOpen(false);
              setIsMobileNavOpen(false);
            }}
            aria-label={`View cart, ${totalItems} items`}
            className="relative w-11 h-11 flex items-center justify-center rounded-xl text-slate-800 hover:text-[#0B4B39] active:scale-95 transition-all cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39]"
          >
            <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-[#DC2626] text-white text-[10px] font-extrabold rounded-full h-4.5 min-w-[18px] px-1 flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Desktop Header Container (Height increased ~10% to 88px) */}
      <div className="hidden lg:block w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[88px] sm:h-[96px] gap-8">
          {/* Desktop Brand Logo */}
          <Link
            href="/"
            className="flex items-center focus:outline-none shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Arogya Path - The Path to Wellness"
              width={160}
              height={80}
              priority
              className="h-[68px] sm:h-[76px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-12 pr-28 py-2.5 sm:py-3 bg-[#F1F5F4] border border-slate-200 rounded-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B4B39] focus:bg-white transition-all shadow-2xs"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0B4B39] hover:bg-[#063D2C] text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors shadow-2xs"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            {/* Account Icon */}
            <button
              type="button"
              onClick={() =>
                alert(
                  "[ACCOUNT] Customer Account & Phone OTP login will be integrated in Milestone 3."
                )
              }
              aria-label="Account login"
              className="flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-bold text-slate-700 hover:text-[#0B4B39] hover:bg-[#F1F5F4] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <User className="w-4.5 h-4.5" />
              </div>
              <span>Account</span>
            </button>

            {/* Cart Link */}
            <Link
              href="/cart"
              onClick={() => {
                setIsSearchOpen(false);
                setIsMobileNavOpen(false);
              }}
              aria-label={`View cart, ${totalItems} items`}
              className="relative flex items-center gap-3 px-5 py-2.5 bg-[#0B4B39] hover:bg-[#063D2C] text-white rounded-full transition-all shadow-sm active:scale-95"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#DC2626] text-white text-[10px] font-bold rounded-full h-4.5 min-w-[18px] px-1 flex items-center justify-center border-2 border-[#0B4B39]">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-sm font-extrabold">
                {totalItems === 0 ? "Cart" : formatRupees(subtotal)}
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop Second Navigation Row */}
        <nav
          aria-label="Desktop primary navigation"
          className="flex items-center justify-between border-t border-slate-100 py-3 text-sm font-bold text-slate-700"
        >
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-[#0B4B39] font-black hover:text-[#063D2C] transition-colors"
            >
              Home
            </Link>
            {sections.selectConcern && (
              <a
                href="#concern"
                className="flex items-center gap-1.5 hover:text-[#0B4B39] transition-colors"
              >
                <span>Shop by Concern</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </a>
            )}
            {sections.bestSolutions && (
              <Link
                href="/#best-solutions"
                className="hover:text-[#0B4B39] transition-colors"
              >
                {launchMode === "single-product" ? "Featured Product" : "Best Solutions"}
              </Link>
            )}
            {sections.popularCategories && (
              <a
                href="#popular-categories"
                className="flex items-center gap-1.5 hover:text-[#0B4B39] transition-colors"
              >
                <span>Popular Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </a>
            )}
            {sections.ayurvedicSolutions && (
              <a
                href="#ayurvedic-solutions"
                className="hover:text-[#0B4B39] transition-colors"
              >
                Ayurvedic Solutions
              </a>
            )}
            {sections.hairCareCollection && (
              <a
                href="#hair-care"
                className="hover:text-[#0B4B39] transition-colors"
              >
                Hair Care
              </a>
            )}
          </div>

          <div className="flex items-center gap-6 text-slate-600 font-semibold text-xs sm:text-sm">
            {sections.reviews && (
              <button
                type="button"
                onClick={() =>
                  alert(
                    "[REVIEWS] Verified customer reviews & feedback will be connected in Milestone 2."
                  )
                }
                className="hover:text-[#0B4B39] transition-colors cursor-pointer"
              >
                Customer Reviews
              </button>
            )}
            <a
              href="#footer"
              className="hover:text-[#0B4B39] transition-colors"
            >
              About & Contact
            </a>
          </div>
        </nav>
      </div>

      {/* Expandable Mobile Search Bar */}
      {isSearchOpen && (
        <div
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsSearchOpen(false);
          }}
          className="py-3 px-4 lg:hidden border-t border-slate-100 bg-[#F8F7F2]"
        >
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-11 pr-22 py-2.5 bg-white border border-slate-300 rounded-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B4B39]"
              autoFocus
            />
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0B4B39] text-white text-xs font-bold px-4 py-1.5 rounded-full"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
